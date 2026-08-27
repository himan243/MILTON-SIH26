## 📁 Structure

```text
data/
├── games.json
├── crafts-builds.json
├── vendors.json
├── ai-projects.json
└── image-manifest.json

assets/
├── logo/
└── demo/

config/
└── admin-demo.json
```

## 🎮 Forgotten & Fading Games

The dataset includes 10 traditional games that were once common in everyday childhood play:

* Gilli Danda
* Kanche (Marbles)
* Lattu (Spinning Top)
* Pitthu (Seven Stones)
* Aankh-Micholi
* Vish-Amrit
* Chor-Sipahi
* Pachisi
* Chaupar
* Nau Gotiyan
* Shollo Guti

> These are described as **"Forgotten & Fading Games"**, not extinct games, as some are still played in certain communities.

## 🌿 Crafts & Builds — Made From What We Had

The dataset includes 15 traditional crafts and builds using naturally available materials such as:

**Leaves · Bamboo · Reeds · Grass · Straw · Clay · Coconut Shells · Seeds · Wood**

Examples include:

* Leaf Boats
* Leaf Whistles
* Bamboo Baskets
* Bamboo Mats
* Bamboo Flutes
* Bamboo Toys
* Reed Baskets
* Straw Dolls
* Clay Toys
* Clay Lamps
* Coconut-Shell Crafts
* Seed Necklaces

Cultural information should include **region, community, local name, materials, traditional use, and source** where available.

## 🏪 Demo Vendors

5 fictional vendor profiles are included for demonstrating the marketplace and moderation system.

```json
{
  "demo": true,
  "replaceable": true,
  "status": "pending"
}
```

### Vendor Flow

```text
Pending → Admin Review → Approve → Published
```

Demo vendors must be replaced with verified real vendors before production.

## 🤖 AI Demo Projects

Includes sample concepts such as:

* Game Memory Matcher
* Craft Story Helper
* Nostalgia Recommender
* Multilingual Memory Guide
* Vendor Listing Assistant

AI-generated cultural content should be reviewed before publication.

## 🌐 Supported Languages

`English` · `Hindi` · `Assamese` · `Bengali` · `Bodo`

Production translations should be reviewed by native speakers or community reviewers.

## 👨‍💼 Admin Demo Setup

1. Create a dedicated test admin account.
2. Assign the `admin` role.
3. Import `vendors.json`.
4. Open **Admin → Vendor Management**.
5. Review a pending vendor.
6. Click **Approve**.
7. Verify the vendor appears as **Published**.

## ⚠️ Demo Disclaimer

All seed records, vendor profiles and demo assets are **temporary prototype content**.

They should be replaced or independently verified before production use.

Traditional games and crafts are community cultural knowledge; their inclusion does not imply ownership by Nostalgic Hub.

## 🎯 Vision

**DISCOVER → REMEMBER → LEARN → RECREATE → SHARE → PRESERVE**

Nostalgic Hub aims to turn disappearing everyday memories and hands-on knowledge into a **living, searchable, community-driven cultural archive**.
