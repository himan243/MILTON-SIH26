# 🚀 Smart India Hackathon (SIH 2026) — Selected Problem Statements Blueprint

This document outlines the **two finalized problem statement options** selected for SIH 2026. Both options are explained in simple, practical language with their complete solution blueprint, recommended tech stack, and long-term scalability roadmap.

---

## 📌 Quick Comparison & Executive Summary

| Feature / Metric | 🍯 Option 1: Honey Chain (`SIH26021`) | 🚚 Option 2: Smart Transit & Logistics (`SIH26198`) |
|---|---|---|
| **Track Type** | **Ministry Track** (*Ministry of MSME / KVIC*) | **Student Innovation Track** (*AICTE*) |
| **Theme** | `Smart Automation` / Food Provenance | `Transportation & Logistics` / Smart Mobility |
| **Category** | `Software` | `Software` |
| **Core Innovation** | Blockchain verification + AI/IoT beekeeping | Multimodal route optimizer + AI freight pooling |
| **Target User** | Beekeepers, Testing Labs, Honey Brands, Consumers | Commuters, Transit Authorities, Logistics Fleets |
| **Competition Heat** | 💎 **Low** (Niche & highly specific) | ⚖️ **Moderate** (Broad innovation scope) |
| **Hackathon WOW Factor** | Live QR Scan -> Blockchain Proof + Origin Map | Interactive Live Map + Dynamic Multi-Modal Solver |

---

# 🍯 Option 1: [SIH26021] Honey Chain — Blockchain-Based Honey Traceability & Smart Beekeeping

> **Ministry / Organization:** Ministry of MSME (Coordination Section / KVIC Honey Mission)  
> **Category:** Software  
> **Theme:** Smart Automation  
> **PS Number:** `SIH26021`

---

### 1. 📖 The Problem in Simple Words
- **Massive Adulteration:** Over 70% of commercial honey in the market is adulterated with cheap sugar syrups (rice syrup, inverted sugar, corn syrup).
- **Lack of Trust & Fair Pricing:** Genuine rural beekeepers and tribal cooperatives (supported by KVIC) produce pure, natural honey but cannot prove its purity to consumers. As a result, they are forced to sell at low prices to middlemen.
- **No Traceability:** When a consumer buys a bottle of honey, there is no way to verify which forest it came from, who harvested it, when it was bottled, or whether it passed authentic lab quality tests (like NMR or pollen analysis).

---

### 2. 💡 Proposed Solution Blueprint
An end-to-end digital provenance platform combining **Blockchain**, **Smart Mobile Logging**, and **Consumer QR Verification**:

```
[ Rural Beekeeper ] ──(Logs Hive & Harvest via App)──> [ Immutable Ledger (Polygon) ]
                                                                │
[ Certified Lab ] ──(Uploads Purity & NMR Test Scores)──>      │
                                                                ▼
[ Consumer ] ──(Scans Bottle QR on Phone)──> [ Interactive Origin & Authenticity Story ]
```

1. **Beekeeper Mobile App (Simple & Multilingual):**
   - Allows beekeepers to register bee boxes, record GPS coordinates of apiaries, select floral sources (e.g., Sundarbans Mangrove, Mustard, Acacia, Wild Forest), and log harvest batches.
   - Works offline and syncs automatically when an internet connection is available.

2. **Lab Quality & Processing Node:**
   - Certified testing labs enter NMR purity scores, moisture content, and HMF levels directly against the batch ID.

3. **Tamper-Proof Blockchain Ledger:**
   - Every stage (Harvest $\rightarrow$ Lab Test $\rightarrow$ Processing $\rightarrow$ Packaging) creates a cryptographic transaction hash on the blockchain. Once written, data cannot be forged or altered.

4. **Consumer QR Scan Experience (No App Required):**
   - The consumer scans a unique QR code printed on the honey jar using their smartphone camera.
   - Opens an interactive web page displaying:
     - 📍 Exact forest/farm location on an interactive map.
     - 🧑‍🌾 Beekeeper profile and cooperative information.
     - 🔬 Certified purity test report badge.
     - ⛓️ Direct blockchain transaction verification link.

5. **AI Hive Health Assistant (Value-Add Feature):**
   - Beekeeper snaps a photo of a comb frame $\rightarrow$ AI detects early signs of hive diseases (e.g., Varroa mites, foulbrood) or estimates bee population health.

---

### 3. 🛠️ Recommended Tech Stack

| Layer | Recommended Technology | Why Chosen? |
|---|---|---|
| **Mobile App (Beekeepers)** | **Flutter** / **React Native** | Cross-platform (Android/iOS), low storage footprint, multilingual UI, offline SQLite sync. |
| **Consumer Web Portal** | **Next.js 14**, **Tailwind CSS**, **Framer Motion** | Blazing-fast load speed for instant mobile QR scans, responsive UI, rich interactive animations. |
| **Backend API** | **Python FastAPI** / **Node.js (Express)** | Lightweight, asynchronous, high-performance REST APIs for fast batch processing. |
| **Blockchain / Web3** | **Solidity**, **Polygon PoS (or Arbitrum L2 / Sepolia Testnet)**, **Ethers.js** / **Web3.py** | Ultra-low gas fees (< ₹0.10 per batch minting), high transaction throughput, EVM compatibility. |
| **Decentralized Storage** | **IPFS / Pinata** | Stores decentralized tamper-proof lab certificates and hive inspection images. |
| **Database & Caching** | **PostgreSQL (Supabase)** & **Redis** | Relational data management for user accounts, batch logs, and rapid caching of QR lookups. |
| **Mapping & GIS** | **Mapbox GL JS** / **Leaflet.js** | Interactive farm-to-bottle visual route mapping. |
| **AI / Computer Vision** | **Ultralytics YOLOv8** (Python / ONNX) | Lightweight comb inspection model for disease & brood pattern detection. |

---

### 4. 📈 Scalability & Future Roadmap

- **Phase 1 (Hackathon MVP):**
  - Functional beekeeper mobile logging app with offline support.
  - Smart contract deployed on Polygon Testnet for immutable batch registration.
  - Dynamic QR generator + consumer verification web app with interactive map.
  - Basic AI comb health scanner demo.
- **Phase 2 (Pilot & KVIC Integration):**
  - Onboard regional beekeeper clusters (e.g., Mustard honey in Rajasthan, Mangrove honey in West Bengal).
  - Integration with KVIC & TRIFED procurement portals.
  - B2B API gateway for commercial honey packaging brands.
- **Phase 3 (Multi-Commodity Expansion):**
  - Extend the underlying provenance framework to other high-value GI-tagged (Geographical Indication) commodities such as **Kashmir Saffron, Darjeeling Tea, Organic Turmeric, and Pure Desi Ghee**.

---

---

# 🚚 Option 2: [SIH26198] Smart Transit & Logistics Optimization Platform (Student Innovation)

> **Organization:** AICTE (Student Innovation Track)  
> **Category:** Software  
> **Theme:** Transportation & Logistics  
> **PS Number:** `SIH26198`

---

### 1. 📖 The Problem in Simple Words
- **Inefficient Commutes:** Urban commuters waste hours daily switching between disconnected transport modes (metro, bus, auto-rickshaw, walking) without unified real-time ETA or route intelligence.
- **Empty Return Trips & High Logistics Cost:** Small and medium logistics carriers in India face 30–40% "deadhead miles" (running empty return trips after dropping off goods), causing severe fuel wastage, high freight costs, and avoidable carbon emissions.
- **Lack of Smart Predictive Routing:** Most small fleet operators rely on static navigation apps that do not account for load capacity, multi-stop drop-offs, or dynamic congestion hotspots.

---

### 2. 💡 Proposed Solution Blueprint
An integrated **Multimodal Commuter & AI Freight Optimization Platform**:

```
[ Commuter / Passenger ] ───> [ Multimodal Route Engine ] ───> Best Time / Least Cost / Green Route
                                      │
[ Small Fleet / Cargo Drivers ] ───> [ AI Freight Matching ] ───> Zero Empty Return Runs (Load Sharing)
                                      │
[ City Dispatcher / Fleet Admin ] ──> [ Live Fleet Telematics & Analytics Dashboard ]
```

1. **Intelligent Multimodal Journey Planner (For Commuters):**
   - Calculates the most optimal end-to-end trip combining public buses, metro lines, and first/last-mile shared rides.
   - Dynamic ETA prediction using historical traffic trends and live congestion data.

2. **Smart Freight Pooling & Return-Trip Matcher (For Logistics):**
   - Acts as a smart load-sharing exchange where small businesses needing cargo delivery are matched with nearby commercial vehicles returning empty along the same route.
   - Solves the classic Vehicle Routing Problem (VRP) with multi-stop drop-off optimization.

3. **Predictive Congestion & Eco-Routing Engine:**
   - Evaluates road elevation, traffic pinch points, and vehicle type to calculate the most fuel-efficient route.
   - Tracks carbon savings and rewards eco-friendly drivers/commuters with "Green Miles" credits.

4. **Fleet Telematics & Central Dispatch Dashboard:**
   - Real-time vehicle location tracking via WebSockets.
   - Geofencing alerts, route deviation alerts, and delivery proof verification (digital signature / OTP).

---

### 3. 🛠️ Recommended Tech Stack

| Layer | Recommended Technology | Why Chosen? |
|---|---|---|
| **Mobile App (Driver & Commuter)** | **React Native** / **Flutter** | Smooth GPS location streaming, native map integration, cross-platform performance. |
| **Web Dashboard (Fleet Admin)** | **Next.js 14**, **Tailwind CSS**, **Shadcn UI** | High-performance fleet tracking interface with responsive data tables and analytics charts. |
| **Backend & Real-Time Engine** | **Python FastAPI** & **Node.js (Socket.io)** | Fast asynchronous REST endpoints for business logic + low-latency WebSockets for live vehicle tracking. |
| **Routing & Optimization Algorithms**| **OSRM (Open Source Routing Machine)** & **Google OR-Tools** | Open-source, self-hosted routing (zero Google Maps API bill shock) + advanced heuristics for Vehicle Routing Problem (VRP). |
| **AI / Machine Learning** | **Scikit-Learn, LightGBM / XGBoost** | Dynamic ETA regression model trained on speed limits, time-of-day, weather, and historical delay patterns. |
| **Geospatial Database** | **PostgreSQL with PostGIS extension** | Industry standard for geospatial indexing, distance calculations, and polygon geofencing queries. |
| **Caching & Message Broker** | **Redis** & **RabbitMQ / Apache Kafka** | Ultra-fast caching for driver coordinates and message queue for high-volume dispatch events. |
| **Mapping UI** | **Mapbox GL JS** / **Leaflet / OpenStreetMap** | Smooth vector tile rendering with customized route polyline visualization. |

---

### 4. 📈 Scalability & Future Roadmap

- **Phase 1 (Hackathon MVP):**
  - Multimodal route calculator showcasing seamless transit transitions.
  - Real-time simulated vehicle tracking with dynamic route re-calculation.
  - Interactive freight matching interface with return-load booking.
  - Driver & commuter mobile companion demo.
- **Phase 2 (City-Scale Pilot & Open Data Integration):**
  - Ingestion of open transit feeds (GTFS - General Transit Feed Specification) from city transport corporations (e.g., DTC, BMTC, BEST).
  - Pilot testing with local courier and intra-city cargo aggregators.
- **Phase 3 (National Logistics Network & ONDC Integration):**
  - Integration with India's **ONDC Logistics Network** and **ULIP (Unified Logistics Interface Platform)**.
  - EV fleet charging-station route optimization and automated carbon credit settlement.

---

## 🎯 Recommended Next Steps for the Team

1. **Pick the Final Statement:**
   - Choose **Option 1 (`SIH26021`)** if you want a **Ministry-backed, low-competition, high-credibility** project with clear societal impact and demonstrable blockchain/QR proof.
   - Choose **Option 2 (`SIH26198`)** if you want to build a **high-visual-impact mobility & logistics SaaS** with complex routing algorithms and real-time mapping.
2. **Assign Core Roles:**
   - **Frontend / UI-UX:** Next.js + Tailwind web apps, Flutter/React Native mobile screens.
   - **Backend & GIS/Smart Contracts:** FastAPI / Node.js + PostGIS / Solidity smart contracts.
   - **AI/ML & Optimization:** YOLOv8 / OR-Tools / LightGBM routing models.
3. **Draft Hackathon PPT:** Structure slides around: *Problem $\rightarrow$ Solution $\rightarrow$ Architecture $\rightarrow$ Tech Stack $\rightarrow$ Demo Flow $\rightarrow$ Scalability & Business Model*.
