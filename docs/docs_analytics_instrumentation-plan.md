# Analytics & Instrumentation Plan — MVP

Status: draft — for PR
Author: Gitartha / team
Date: 2026-08-27

## 1. Goals (MVP)
- Capture product usage for core flows (discover, save, AI uploads/generation, game sessions, vendor interactions, bulk requests, XP).
- Provide weekly hackathon monitoring dashboards: DAU, save conversion, AI conversion rate, vendor contacts per vendor, demo signups.
- Keep privacy by design: no precise GPS without explicit consent, minimize PII in event stream.
- Use free / self-hosted tooling where possible; enable quick demo via a local Docker or cloud free tier.

## 2. Recommended stacks (no-cost / self-hosted / demo)
- PostHog OSS (self-hosted via Docker Compose) + ClickHouse for scale; strong event analysis & feature flags. Good demo: PostHog Cloud free tier or local Docker.
- Matomo (self-hosted) — good for page/view analytics and privacy-focused setups; less flexible for custom event-rich apps.
- Plausible OSS (self-hosted) — lightweight web analytics (less granular).
- Minimal: server-side event collector (simple HTTP endpoint) -> Postgres (events table) + Metabase for dashboards (lightweight, fully self-hosted).
Recommendation for MVP/hackathon:
- Option A (recommended): PostHog OSS for event capture + builtin dashboards. Quick demo: run `docker-compose` locally or use PostHog cloud.
- Option B (simple, robust): Collect events server-side to Postgres (events JSONB), analyze with Metabase (SQL dashboards). Lower ops burden and full control over PII.

## 3. Data model & storage
Base event table (generic schema — works for Postgres/Metabase or PostHog-compatible ingestion):

- events
  - id (uuid)
  - event (string) — e.g., "discover_view"
  - user_id (uuid, nullable) — internal user id when authenticated
  - anon_id (string) — client-generated anonymous id (cookie/localStorage)
  - session_id (uuid/string) — session identifier
  - timestamp (timestamptz)
  - source (enum) — "web", "android", "ios", "api"
  - properties (jsonb) — event-specific properties
  - received_at (timestamptz)
  - tenant_id (nullable) — if multi-tenant vendor contexts exist

Notes:
- Keep PII out of properties. If an event needs email/phone, store a hashed identifier or keep in a separate identity store with strict access controls and reference only user_id.
- Store coarse geo (country/region) from IP if needed; avoid lat/lon precision without consent.

## 4. Common properties (recommended)
All events SHOULD include:
- distinct_id / anon_id (string)
- user_id (nullable)
- session_id
- timestamp
- source (web|android|ios|api)
- page (optional) — route or view name when applicable
- experiment / feature_flag (optional)
- referrer / campaign (utm_source / utm_medium / utm_campaign) — if present
- consent_tracking (boolean) — whether user gave analytics consent
- consent_location (boolean) — whether user consented to precise location
- device (optional) — e.g., "Android 14, Pixel 6"
- app_version / web_version
- tenant_id (nullable) — for vendor-scoped events

Schema for `properties` is JSON; prefer typed properties (string, number, boolean).

## 5. Event taxonomy (P0 + marketing/monetization signals)

Each event below: name, trigger, required properties, sample JSON.

1) discover_view
- When: user views the Discover / marketplace screen or list
- Properties:
  - view_type (string) — "discover_home", "discover_search", "category"
  - query (string, optional)
  - results_count (int)
  - position (int, optional) — item position if this event is for an item view
  - filters (json, optional)
- Use: measure impressions and discovery funnel

Sample:
{
  "event":"discover_view",
  "user_id":"…",
  "anon_id":"…",
  "timestamp":"…",
  "properties":{
    "view_type":"discover_home",
    "results_count":18
  }
}

2) item_impression / item_click
- When: an item (asset / project / vendor item) is shown (impression) or clicked (click).
- Properties:
  - item_id, item_type ("project","asset","vendor")
  - list_position (int)
  - source (string)
  - price (nullable, number)
  - vendor_id (nullable)
- Use: CTR per placement, vendor performance

3) save
- When: user saves/bookmarks an item or project to library
- Properties:
  - item_id, item_type
  - origin (string) — "discover", "project_view", "recommendation"
  - is_new_user (bool)
- Use: conversion metric (discover -> save)

4) ai_upload
- When: user uploads an asset for AI processing
- Properties:
  - upload_id
  - file_count
  - total_bytes
  - input_types (array) — ["image","audio"]
  - user_intent (optional) — e.g., "generate_project"
- Privacy: Do NOT store file contents. Only metadata. If uploads include location metadata in EXIF, strip server-side unless consent_location true.

5) ai_project_generated
- When: AI job completes and a project is generated (successful)
- Properties:
  - project_id
  - generation_mode ("auto","guided")
  - job_duration_ms
  - result_count
  - used_template_id (nullable)
  - ai_model_version
  - success (bool)
- Use: AI conversion funnel (uploads -> generation -> save/share)

6) game_session_created / game_session_joined
- When: user creates or joins a multiplayer game session
- Properties:
  - session_id
  - host_user_id
  - game_mode
  - player_count (on start)
  - invited (bool)
  - outcome (optional on end) — "completed","abandoned"
- Use: in-app engagement metrics, retention

7) vendor_contact
- When: user contacts or requests vendor (via contact button, request demo, bulk request)
- Properties:
  - vendor_id
  - contact_method ("message","email","phone","demo_request")
  - contact_result ("submitted","failed")
  - form_fields_present (array of keys) — e.g., ["name","email"]
  - demo_request (bool)
- Use: marketing/monetization pipeline; contacts per vendor

8) bulk_request_submitted
- When: user submits a bulk/vendor request
- Properties:
  - request_id
  - items_count
  - budget_range (nullable)
  - vendor_ids (array)
- Use: lead capture metrics

9) xp_earned / xp_spent
- When: user earns or spends XP
- Properties:
  - xp_delta (int)
  - xp_balance (int)
  - reason ("complete_project","upvote","referral","purchase")
- Use: gamification health metrics

10) demo_signup
- When: user signs up for a product demo / beta
- Properties:
  - signup_id
  - campaign (utm_campaign)
  - source
- Use: marketing funnel

11) auth_signup / auth_signin / auth_signout
- When: user signs up / signs in
- Properties:
  - method ("email","google","apple")
  - is_new_user (bool)
- Use: onboarding & conversion

12) billing_event (if applicable)
- When: user hits monetization step (pricing view, start checkout, purchase)
- Properties:
  - sku_id
  - amount (number) — avoid raw credit info
  - currency
  - billing_result ("started","completed","failed")

13) error / client_error
- When: significant client-side error occurs
- Properties:
  - error_type
  - stack_hash
  - message (truncate; do not send PII)
  - context (json)
- Use: SRE & quality

## 6. Event naming conventions
- Use snake_case event names.
- "noun_verb" order where possible (e.g., "ai_project_generated", "game_session_created").
- Keep properties stable (avoid renaming; add new fields instead).
- Version property or `schema_version` when event contract changes.

## 7. Instrumentation guidelines
- Record server-side canonical events for critical actions (e.g., vendor_contact) to avoid client tampering.
- Client should send events with `consent_tracking` flag; server must respect it and route to non-identifying buckets if false.
- Validate events at ingestion (schema/required fields).
- Rate-limit client events to reduce noise (e.g., impression throttling).
- Strip EXIF/location from uploads on server unless `consent_location` is true.

## 8. Data retention & PII handling
- Raw events: retain for 90 days by default (shorten if storage constrained).
- Aggregated metrics: keep indefinitely (rollups).
- PII: do NOT store raw email/phone in `events.properties`. Keep PII in a dedicated identity DB with strict ACL and logs. In events, store `user_id` or `hashed_email` only if necessary.
- Location:
  - Do NOT store precise GPS coordinates by default.
  - Store coarse geoip (country, region) derived from IP.
  - If precise location is required, explicitly surface and store only after `consent_location = true`.
- Deletion & export:
  - Implement user data deletion endpoint: delete or anonymize events tied to `user_id` within retention constraints.
  - Keep a deletion audit log.
- Access control:
  - Limit raw event access to devops/analytics roles.
  - Use separate environments (dev/staging/prod) & keys.
- Encryption:
  - Encrypt data at rest and in transit.
- Anonymization:
  - Use one-way hashing + salt for any identifiers stored outside identity store.

## 9. Dashboard wireframes & KPI queries
Assume a canonical `events` table:
- columns: event (text), user_id (uuid), anon_id (text), timestamp (timestamptz), properties (jsonb)

Postgres/Metabase example queries (adjust column names to your storage):

1) DAU (daily active users)
Postgres:
```sql
SELECT
  date_trunc('day', timestamp) AS day,
  COUNT(DISTINCT COALESCE(user_id, anon_id)) AS dau
FROM events
WHERE timestamp >= now() - interval '30 days'
GROUP BY 1
ORDER BY 1;