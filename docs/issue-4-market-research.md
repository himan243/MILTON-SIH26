# Market research: demand and user segments for Nostalgic Hub in Northeast India

This file captures the proposed research plan, methods, deliverables and an actionable solution to resolve GitHub issue #4: "Market research: demand and user segments for Nostalgic Hub in Northeast India".

Issue: https://github.com/himan243/MILTON-SIH26/issues/4
Assigned: @MITHI935

---

## Objective
Conduct focused market research for Northeast India to validate demand and prioritize MVP (P0) features for Nostalgic Hub — a marketplace for regional/heritage goods and artisan services.

## Research goals
- Estimate TAM (Total Addressable Market) and SAM (Serviceable Available Market) for primary audiences: families and millennials in target states (Assam, Meghalaya, Manipur, Nagaland, Arunachal Pradesh, Tripura, Mizoram, Sikkim).
- Quantify user demographics, device & connectivity profiles, and language preferences.
- Size the vendor/artisan supply market and readiness (count of artisans, pricing ranges, inventory constraints).
- Assess willingness-to-pay for marketplace features and payment/commission sensitivity.
- Produce recommended pricing & monetization hypotheses to test during the hackathon MVP.

## Deliverables
1. Research report (Markdown + optional PDF): methods, assumptions, sources, results, recommendations.
2. Spreadsheet (CSV/XLSX): raw datasets, calculations, TAM/SAM worksheets, vendor sizing, pricing scenarios.
3. Prioritized MVP feature list with rationale tied to research findings.
4. Three concrete monetization experiments with metric definitions and target values.

---

## Methodology / Data sources
Recommended authoritative sources to use (public/government/NGO/industry):
- Census of India (population by state, urban/rural split)
- National Sample Survey / NFHS (demographic breakdowns)
- TRAI reports (telecom subscribers, broadband penetration)
- Ministry of Textiles / Ministry of MSME reports (artisan counts, handicraft clusters)
- State government tourism / culture departments (lists of registered artisans, craft clusters)
- Marketplaces benchmarks: Etsy, Amazon India regional seller reports, Meesho, Shop101 studies
- NGO reports (Dastkar, Craft Revival Trust, local craft NGOs)
- Secondary sources: Statista, World Bank, UN reports for household income brackets

When primary local datasets are unavailable, use conservative assumptions and clearly document them.

---

## Step-by-step research plan (2-week hackathon-friendly)
Week 1 — Data collection & quick estimates
- Collect population and internet/mobile penetration by state from Census + TRAI.
- Estimate addressable user segments: families (households) and millennials (age 18–39).
  - Use population shares to compute household counts (divide population by average household size ~4.5, or local value if available).
- Collect poverty/household income bands to estimate purchasing power.
- Compile known craft clusters and registered artisan counts from Ministry/NGO sources.
- Quick interviews/surveys (N = 30–100) with local residents and artisans via WhatsApp/Google Forms to validate qualitative assumptions.

Week 2 — Sizing, willingness-to-pay, and recommendations
- Build TAM -> SAM -> SOM funnel:
  - TAM: total households / individuals in target states.
  - SAM: subset with smartphone + internet + interest in regional crafts (apply percent filters from TRAI/income/urbanization data).
  - SOM (realistic first-year reach): apply conservative go-to-market penetration for hackathon MVP (e.g., 0.1%–1% of SAM depending on channels).
- Vendor supply-side sizing: estimate number of active artisans reachable via clusters/NGOs/marketplaces.
- Run pricing sensitivity with 3 scenarios: conservative/likely/aggressive.
- Produce prioritized P0 features (e.g., vendor contact requests, curated collections, language toggles, low-friction checkout, COD support) based on research.

---

## Spreadsheet layout (recommended tabs)
- README: data sources, assumptions, notes
- Population & demographics: raw state-level population, age buckets
- Connectivity: smartphone & broadband penetration
- TAM-SAM calculations: formulas and intermediate filters
- Vendor sizing: lists, cluster counts, typical pricing
- Pricing models: willingness-to-pay survey results, scenario calculations
- Monetization experiments: metrics & expected outcomes

Include a column for source URL and date for every data row.

---

## Example TAM/SAM calculation (template)
- Population (state) = P
- Households = P / avg_household_size
- Smartphone penetration = s%
- Potential buyers (SAM) = Households * s% * interest_rate%

Document each assumption (avg_household_size, interest_rate) and show sensitivity +/- 25%.

---

## Recommended P0 features (priority-driven)
1. Vendor contact / request-to-sell (low barrier for artisans; no full catalog upload required)
2. Curated regional collections (showcase, build trust)
3. Language support for local languages and English (UI copy + product descriptions)
4. Simple ordering flow: contact-to-order, COD & UPI support
5. Vendor onboarding form + photo-based listing (mobile-first)

Tie each feature to a research insight (example: high COD preference -> include COD; low digital readiness among artisans -> simplified onboarding).

---

## Three monetization experiments (hackathon-ready)
1) Listing fee + low commission
- Hypothesis: Artisans will pay a small fixed monthly listing fee (INR 50–150) for better visibility; platform commission kept low (5%–8%).
- Experiment: Offer "featured listing" for INR 99/month vs free basic listing for 30 days to a test cohort of 100 artisans.
- Metrics: conversion rate to paid listing, churn after 30/60 days, ARPU per artisan.

2) Lead / contact-fee model
- Hypothesis: Vendors value verified buyer leads and will pay per lead (INR 20–100) rather than a % commission.
- Experiment: Offer verified buyer contact requests with 20 free leads for early adopters, then charge INR 40/lead.
- Metrics: leads purchased per artisan, revenue per artisan, lead-to-order conversion rate.

3) Commission on payments + premium services
- Hypothesis: Buyers prefer frictionless checkout; platform takes 6% commission on transactions and sells premium services to artisans (professional photos, translations).
- Experiment: Offer 0% commission and free premium services for first 100 orders, then transition to 6% + add-on pricing.
- Metrics: GMV growth, average order value (AOV), take-rate, churn.

For each experiment specify targeting (regions/states, artisan categories), sample size, duration (e.g., 4–6 weeks), and success thresholds.

---

## Acceptance criteria (to close the issue)
- Research report with cited sources and clear assumptions uploaded to repo (Markdown or PDF).
- Spreadsheet with TAM/SAM calculations and vendor sizing available.
- Clear, actionable recommendations for P0 features and the three monetization experiments.
- Short executive summary (1 page) with go/no-go recommendation for hackathon MVP.

---

## Notes / next steps (what I'll do if assigned)
1. Create the spreadsheet template and populate public data (Census, TRAI) for target states.
2. Draft the report using the template above and run 1st round of quick surveys.
3. Produce prioritized feature list and experiment designs and open a PR adding the report + spreadsheet.

---

Generated: by @copilot for issue #4
