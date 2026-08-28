# NOSTALGIC HUB — Software Requirements Specification (SRS)

## 1. Purpose

This SRS translates the supplied Nostalgic Hub product specification into implementable software requirements for a hackathon-ready, full-stack MVP.

The system shall be functional, modular, scalable, mobile-first, accessible, secure, and developed with zero development cost.

## 2. Scope

The system shall provide:
- Public cultural discovery
- Traditional/forgotten game information and sessions
- AI-assisted creative project generation from images/text
- Crafts and artisan/vendor management
- Marketplace discovery and order-request workflows
- Traditional food stories
- Community contributions and challenges
- XP, levels, badges, collections, quests and rewards
- Search and recommendations
- Multilingual UI/AI
- Authentication and role-based authorization
- Admin moderation, verification, configuration and analytics
- In-app notifications


## 3. User Roles

The system shall support these roles:

| Role | Core permissions |
|---|---|
| Guest | Browse public content |
| User | Save content, earn XP, create/join sessions, chat, submit content, participate in challenges |
| Vendor/Artisan | Manage profile, products, inventory, order/bulk requests and customer communication |
| Admin | Verify/moderate users, vendors, products, cultural content, challenges, rewards, feedback and system configuration |

Server-side authorization shall be enforced; frontend role checks alone shall never be trusted.

## 4. Functional Requirements

### FR-01 Authentication
1. The system shall support Google Login.
2. Users shall be able to browse publicly without authentication.
3. Authentication shall be required for protected features including saving, XP, collections, sessions, chat, vendor interaction, submissions, challenges and personalized recommendations.
4. Admin/demo credentials shall not be hardcoded in frontend code.

### FR-02 Discovery Homepage
1. The system shall provide a Discover homepage.
2. It shall display a rotating Today's Nostalgic Discovery.
3. It shall provide Remember This?, Forgotten Games, Made by Our People, Food Stories, Create Something, nearby player activity and Community Challenges sections.
4. Interactive CTAs shall perform real actions or be explicitly marked as coming soon.

### FR-03 Cultural Content
The system shall support structured content for games, crafts, food stories and nostalgic builds, including region, story/background, instructions or preparation information, media and related content as appropriate.
User/vendor cultural submissions shall enter an approval workflow before public publication.

### FR-04 Games
1. Each game shall have a detailed page.
2. Game records shall support name, alternate names, region, description, story, rules, player count, equipment, playing area, difficulty and skills.
3. Users shall be able to create and join sessions.
4. Sessions shall support date/time, approximate location, player limit, teams, invitations, chat, leave/cancel and reporting.
5. Location privacy shall support precise GPS, approximate locality/area, or manually selected area.
6. Exact location shall not be publicly exposed unless explicitly permitted.
7. Game progression shall support Beginner → Explorer → Skilled → Master.

### FR-05 Nearby Players
The system shall support privacy-controlled player discovery and session creation. The implementation shall not fabricate player locations or activity.

### FR-06 AI Creative Assistant
1. Users shall upload one or more images and/or text.
2. The system shall analyze available objects/materials where a suitable free/open-source capability is available.
3. It shall return structured project suggestions.
4. Each suggestion shall support project name, concept, materials, difficulty, time, steps, safety considerations where relevant, skills, cultural connection where applicable, alternatives, save and retry.
5. Visual concept generation shall be supported only where an actually available no-cost capability exists.
6. Paid services shall not be silently introduced.
7. AI providers shall be abstracted so they can be replaced later.
8. AI failure shall have a transparent fallback.

### FR-07 Localization
MVP languages shall be English, Hindi, Assamese, Bengali and Bodo. The UI shall use a localization structure rather than hardcoded translations. The AI shall respond in the selected language.

### FR-08 Marketplace
1. Multiple vendors shall be supported.
2. Products shall have listings, images, descriptions, prices, inventory and categories.
3. Listings shall require admin approval before public visibility.
4. Customers shall be able to discover products and contact vendors/request orders.
5. The MVP shall not implement real checkout or online payment.
6. The data model shall support future commission calculation and payment integration.
7. Commission percentage shall be admin-configurable.

### FR-09 Bulk Orders
Bulk requests shall support product, quantity, message, required date, delivery/location information and contact information. Vendors shall be able to accept, reject, respond with a quotation, or ask questions.

### FR-10 Vendor Communication
The system shall support in-platform chat where feasible, vendor contact, order/request conversations and bulk-order communication while minimizing unnecessary personal-data exposure.

### FR-11 Food Stories
Food records shall support name, origin, story, history, ingredients, preparation, occasions and related content. Users shall be able to save, suggest and submit corrections/stories. Submissions shall require approval.

### FR-12 Gamification
The system shall support XP, levels, badges, daily/weekly challenges, streaks, collections, skill progression, quests and configurable rewards. XP shall be tied to meaningful activities rather than meaningless clicks.

### FR-13 Community Challenges
Challenges shall support title, description, rules, dates, XP reward, badge/reward, submissions and leaderboard, with admin moderation.

### FR-14 Feedback
Users shall be able to suggest games, crafts, food, cultural information, tutorials, products and features; request products; report inaccuracies/inappropriate content; provide feedback; and vote on suggestions. Feedback statuses shall include Pending, Under Review, Approved, Rejected, Needs More Information and Implemented.

### FR-15 Admin
Admins shall manage users, vendors, products, games, crafts, food stories, community content, feedback, rewards, commission configuration and analytics. Admin actions shall include appropriate approval, rejection, editing, suspension and removal workflows.

### FR-16 Search
Global search shall cover games, crafts, products, food, stories, AI projects and vendors. Filters shall include category, region, difficulty, availability, language, vendor and popularity.

### FR-17 Recommendations
The system shall initially use simple reliable recommendation logic such as liked-content relationships, region and related categories. The architecture shall allow later ML-based recommendations.

### FR-18 Notifications
In-app notifications shall support game invitations/updates, chat messages, vendor/bulk-order responses, submission decisions, challenge reminders, badges, level-ups and rewards.

### FR-19 Onboarding
Optional onboarding shall collect preferred language, region and interests such as games, crafts, food and AI creativity. The questionnaire shall remain short.

## 5. Data Requirements

The database shall provide related entities for:
- Users, roles and vendor verification
- Vendors, products and categories
- Orders/requests and bulk-order requests
- Games, sessions, participants and rankings
- Crafts, food stories and nostalgic builds
- AI projects and generations
- Collections and saved items
- XP transactions, levels, badges and user badges
- Challenges, quests, rewards and coupons
- Feedback, suggestions and reports
- Notifications
- Chat conversations and messages
- Admin approvals and content revisions

The system shall use relationships rather than unnecessary duplication.

## 6. Non-Functional Requirements

### NFR-01 Cost
Development shall use zero-cost technologies/services: free/open-source tooling, free tiers, browser-native capabilities, local processing and open-source/free-tier models where practical. Paid APIs/services shall not be introduced secretly.

### NFR-02 Security
The system shall implement authentication, authorization, RBAC, server-side validation, input sanitization, secure file uploads, protected admin/vendor routes, secret management, database security rules and basic abuse prevention.

### NFR-03 Reliability
The system shall handle network/API failures, empty/loading states, invalid uploads, unsupported images, missing content, unauthorized access, failed/duplicate submissions, rejected listings, users leaving sessions and chat errors. Users shall receive loading indicators, errors, retry actions, empty states, validation and confirmation states.

### NFR-04 Performance
The system shall prioritize fast initial load, lazy-loaded images, optimized assets, pagination/infinite scrolling where appropriate, efficient database queries, minimal API calls and suitable caching.

### NFR-05 Mobile
The application shall be mobile-first and work well for discovery, game instructions, image upload, AI interaction, nearby players, chat, vendor contact and collections. Desktop shall also be polished.

### NFR-06 Accessibility
The system shall provide readable typography, strong contrast, keyboard navigation, alt text, accessible buttons, clear form labels, responsive layouts and semantic structure where practical. State shall not rely only on color.

### NFR-07 Content Authenticity
Cultural content shall distinguish Verified, Community Submitted and Pending Verification. User/vendor content shall be moderated where appropriate, and users shall be able to report inaccuracies.

### NFR-08 Scalability
Modules shall remain separated for authentication, users, content, games, marketplace, vendors, AI, community, gamification, feedback, administration and localization. The architecture shall support expansion in geography, languages, users, vendors and content.

## 7. UI/UX Requirements

The UI shall feel warm, nostalgic, modern, cultural, playful, premium, trustworthy and family-friendly. It shall avoid generic corporate SaaS styling, generic AI dashboards, excessive gradients, clutter, overly childish design and cheap marketplace styling.

The product should feel like:

> **a digital museum + community + creative playground + artisan marketplace**

High-quality Northeast Indian cultural imagery shall be used. Authentic documentation and generated/illustrative imagery shall be clearly distinguished.

## 8. MVP Priority

### P0 — Must Work
Google authentication; Discover homepage; games and game details; game sessions; privacy-controlled nearby-player discovery; AI creative assistant; image upload; AI suggestions/instructions; crafts; vendor profiles/dashboard; admin approval; marketplace discovery; contact/request order; Food Stories; XP/levels; badges; collections; daily/weekly challenges; feedback; multilingual UI; responsive mobile UI.

### P1 — Should Work
Leaderboards, skill progression, quests, rewards/coupons, community challenges, chat, bulk-order requests, notifications and admin analytics.

### P2 — Architect for Future
Real payment gateway, advanced recommendations, advanced AI image generation, nationwide expansion, additional languages, advanced vendor analytics, real-time competitive scoring, advanced moderation and native mobile applications.

## 9. Demo/Test Data

The MVP shall include structured representative demo data for games, crafts, nostalgic builds and Northeast Indian traditional foods. Historical claims shall not be fabricated. Demo content shall be replaceable by verified real content.

## 10. Build & Verification Strategy

Implementation shall proceed in phases:
1. Foundation: project structure, design system, auth, database, routing and roles.
2. Discover: homepage, content model, search, games, crafts and food.
3. AI: image upload, analysis, suggestions, instructions and saving.
4. Community: player discovery, sessions, profiles, rankings and challenges.
5. Marketplace: vendors, products, approvals, contact and requests.
6. Gamification: XP, levels, badges, collections, quests, streaks and rewards.
7. Admin: moderation, verification, analytics, feedback and configuration.
8. Polish: responsiveness, loading/errors, accessibility, performance, security and final testing.

Before release, test complete user flows, buttons, forms, authentication, navigation, mobile behavior, database operations, authorization, approvals, vendor listings, image upload, AI failure fallback and empty states.

## 11. End-to-End Acceptance Scenario

A family member shall be able to:
1. Open Nostalgic Hub.
2. Discover a forgotten game.
3. Read its story and learn its rules.
4. Find/create a game session.
5. Earn XP.
6. Upload an old household object.
7. Receive real AI-generated creative suggestions or a transparent fallback.
8. Select a project and receive steps.
9. Save the project.
10. Discover a local artisan and verified craft listing.
11. Contact the vendor/request an order.
12. Discover a traditional food story.
13. Complete a challenge and earn a badge.
14. Return to discover new content.

## 12. Final Acceptance Criteria

The MVP shall immediately communicate:
- **Discover** — rediscover forgotten culture.
- **Create** — turn ordinary objects into creative possibilities with AI.
- **Play** — bring forgotten games back to life.
- **Connect** — find people and communities.
- **Support** — connect artisans with customers.
- **Preserve** — preserve verified cultural knowledge digitally.
- **Return** — provide meaningful reasons to return.

The product must be a real functional MVP, not a static mockup.
