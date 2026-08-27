Got it. For the GitHub version, I’d keep it **English-only**, remove the food section completely, and focus on the two strongest content pillars: **forgotten/fading games** and **traditional crafts made from natural materials**, plus vendors, AI projects, licensing, and demo setup.

Use this as your `README.md`:

# Nostalgic Hub — Demo Seed Data & Content Pack

> **Hackathon Demo Data — All content is DEMO / REPLACEABLE**

This repository contains the seed data, demo assets, vendor profiles, localization structure, and setup documentation required for the Nostalgic Hub MVP hackathon demonstration.

Nostalgic Hub aims to help people rediscover **forgotten games, traditional crafts, childhood activities, and everyday knowledge that is gradually disappearing from modern life.**

The demo content is intentionally designed to represent a broad Indian audience rather than focusing on one particular region.

---

## Repository Structure

```text
nostalgic-hub/
│
├── README.md
│
├── data/
│   ├── games.json
│   ├── crafts-builds.json
│   ├── vendors.json
│   ├── ai-projects.json
│   └── image-manifest.json
│
├── assets/
│   ├── logo/
│   │   └── nostalgic-hub-logo.png
│   └── demo/
│       └── README.md
│
├── config/
│   └── admin-demo.json
│
└── scripts/
    └── seed-import.md
```

---

# Games — Forgotten & Fading Games

The Games section focuses on traditional games that were once common in children's everyday play but are now less visible compared with modern entertainment.

### Included Games

| Game                      | Description                                                                                      |
| ------------------------- | ------------------------------------------------------------------------------------------------ |
| **Gilli Danda**           | A traditional stick-and-hit game played with a short stick and a longer stick.                   |
| **Kanche (Marbles)**      | A traditional aiming and collection game played with marbles.                                    |
| **Lattu (Spinning Top)**  | A wooden spinning-top game involving control, tricks and challenges.                             |
| **Pitthu (Seven Stones)** | Players knock down a stack of stones and attempt to rebuild it while avoiding the opposing team. |
| **Aankh-Micholi**         | A traditional group game where one player searches for others without being able to see.         |
| **Vish-Amrit**            | A chasing and freeze-and-rescue game.                                                            |
| **Chor-Sipahi**           | A team-based chase and capture game.                                                             |
| **Pachisi**               | A traditional Indian cross-shaped race and strategy board game.                                  |
| **Chaupar**               | A traditional Indian strategy and race board game.                                               |
| **Nau Gotiyan**           | A traditional placement and strategy game using small pieces.                                    |

### Why "Forgotten & Fading"?

The project deliberately avoids calling these games "extinct."

Some of these games are still played in particular communities and regions.

The preferred terminology for the platform is:

**Forgotten & Fading Games**

or

**Games Fading From Everyday Play**

This keeps the concept nostalgic without making inaccurate claims.

---

# Crafts & Builds — Made From What We Had

The Crafts section focuses on objects, toys and useful items traditionally made from materials that were easily available around people.

### Suggested Section Name

**Made From What We Had**

This section explores the idea that children and families often created things from whatever was available around them rather than buying everything ready-made.

### Natural Materials

* Leaves
* Bamboo
* Reeds
* Grass
* Straw
* Clay
* Coconut shells
* Seeds
* Wood
* Flowers
* Natural fibres

### Included Crafts & Builds

| Craft / Build            | Material                      |
| ------------------------ | ----------------------------- |
| **Leaf Boats**           | Leaves                        |
| **Leaf Whistles**        | Leaves                        |
| **Leaf Crowns**          | Leaves                        |
| **Bamboo Baskets**       | Bamboo                        |
| **Bamboo Mats**          | Bamboo                        |
| **Bamboo Flute**         | Bamboo                        |
| **Bamboo Toys**          | Bamboo                        |
| **Reed Baskets**         | Reeds                         |
| **Straw Dolls**          | Straw                         |
| **Grass Mats**           | Grass                         |
| **Clay Toys**            | Clay                          |
| **Clay Lamps**           | Clay                          |
| **Handmade Dolls**       | Cloth / clay / natural fibres |
| **Coconut-Shell Crafts** | Coconut shells                |
| **Seed Necklaces**       | Seeds                         |

### Cultural Accuracy

These crafts should not be presented as if every community across India made them in exactly the same way.

When replacing demo content with real cultural documentation, include:

* Region
* Community
* Local name
* Alternate names
* Materials
* Traditional use
* Approximate period
* Contributor/source

The purpose is to document **real variations**, not to flatten different traditions into one generic "Indian craft."

---

# Vendor Profiles

The demo includes **5 fictional vendor profiles** to demonstrate the marketplace functionality.

Example categories include:

* Traditional crafts
* Handmade toys
* Clay and pottery
* Bamboo products
* Traditional products

Every demo vendor is marked as:

```json
{
  "demo": true,
  "replaceable": true
}
```

and initially has:

```json
{
  "status": "pending"
}
```

### Vendor Approval Flow

```text
Pending
   ↓
Admin Review
   ↓
Approve
   ↓
Published
```

The demo vendors are fictional and must **not** be presented as real businesses.

---

# AI Demo Projects

The seed data includes sample AI-powered features that demonstrate the future direction of Nostalgic Hub.

### Included Examples

**Game Memory Matcher**

Suggests forgotten games based on a user's childhood memories.

**Craft Story Helper**

Turns a craft-making process into a short, engaging story.

**Nostalgia Recommender**

Recommends games, crafts and activities based on user interests.

**Multilingual Memory Guide**

Helps present cultural content across the MVP's supported languages.

**Vendor Listing Assistant**

Creates a draft vendor listing that requires admin approval before publication.

AI-generated cultural content should always be treated as a **draft** until reviewed.

---

# Localization

The MVP is designed to support:

| Language | Code  |
| -------- | ----- |
| English  | `en`  |
| Hindi    | `hi`  |
| Assamese | `as`  |
| Bengali  | `bn`  |
| Bodo     | `brx` |

The seed data provides the structure for localized content.

For production, translations should be reviewed by native speakers or appropriate community reviewers.

Do not rely solely on machine translation for culturally specific terminology.

---

# Image Assets & Licensing

All image assets supplied with this hackathon demo are either:

* AI-generated illustrative assets
* Prototype assets
* Explicit placeholders

They are **not intended to represent real vendors, people or cultural artifacts.**

### Production Image Requirements

Before using an image in production:

1. Use creator-owned or commissioned photography where possible.
2. Use public-domain or appropriately licensed images.
3. Verify the license of every individual image.
4. Record the creator.
5. Record the original source URL.
6. Record the license.
7. Record required attribution.
8. Obtain appropriate consent when identifiable people are involved.

Image information should be maintained in:

```text
data/image-manifest.json
```

### Important

Do not assume that every image on a particular website has the same license.

Always verify the license and attribution requirements of the **individual asset**.

---

# Admin Demo Account

The demo includes:

```text
config/admin-demo.json
```

This is a configuration template for setting up a dedicated demo administrator.

### Recommended Setup

1. Create a dedicated test account using the application's authentication system.
2. Assign the `admin` role.
3. Use the development/demo environment.
4. Import the vendor seed data.
5. Confirm vendors appear as `pending`.
6. Open the Admin Dashboard.
7. Navigate to **Vendor Management**.
8. Select a vendor.
9. Review the vendor profile.
10. Click **Approve**.
11. Confirm the status changes to `approved`.
12. Verify the vendor becomes visible in the demo marketplace.

### Vendor Statuses

```text
pending   → Awaiting admin review
approved  → Published
rejected  → Not published
```

### Security

**Never commit real passwords, API keys, authentication tokens or production secrets to GitHub.**

Use environment variables or your authentication provider's test-account system.

---

# Importing Seed Data

The seed files are located inside:

```text
data/
```

Recommended import order:

```text
1. games.json
2. crafts-builds.json
3. vendors.json
4. ai-projects.json
5. image-manifest.json
```

## REST API

If the application uses a REST API, the intended structure is:

```text
POST /api/admin/seed/games
POST /api/admin/seed/crafts
POST /api/admin/seed/vendors
POST /api/admin/seed/ai-projects
```

Adapt the endpoint names to match the application's backend.

Seed imports should only be executed against the **development/demo database**.

---

# Demo Data Flags

Every seed record should be identifiable as temporary demo content.

Recommended fields:

```json
{
  "demo": true,
  "replaceable": true
}
```

These flags allow the application to distinguish hackathon content from verified production content.

---

# Production Replacement Checklist

Before launching publicly:

* [ ] Replace fictional vendor profiles
* [ ] Replace demo images
* [ ] Verify image licenses
* [ ] Add image attribution where required
* [ ] Validate Hindi terminology
* [ ] Validate Assamese translations
* [ ] Validate Bengali translations
* [ ] Validate Bodo translations
* [ ] Add regional/community information
* [ ] Verify cultural claims
* [ ] Obtain contributor permissions
* [ ] Remove demo administrator credentials
* [ ] Disable demo-only seed endpoints in production
* [ ] Remove or update `demo: true` records after verification

---

# Cultural Documentation Guidelines

Nostalgic Hub should treat cultural content as **community knowledge**, not as a single standardized Indian experience.

Whenever possible, document:

```text
Name
Local Name
Alternate Names
Region
Community
Materials
How It Was Made / Played
Traditional Use
Approximate Period
Contributor
Source
```

Avoid unsupported claims such as:

> "Every Indian child used to play this."

Prefer:

> "A traditional game that was widely played in many communities."

This keeps the platform respectful and culturally accurate.

---

# Demo Disclaimer

> **This repository contains prototype content created for hackathon demonstration purposes.**

All vendors, descriptions, images and other records marked as demo are temporary and replaceable.

Demo vendor profiles are fictional and do not represent real businesses.

Traditional games and crafts documented in this repository belong to the broader cultural traditions of the communities that practice them. Their inclusion in this prototype does not imply ownership by Nostalgic Hub.

---

# Vision

Nostalgic Hub is built around a simple idea:

```text
DISCOVER
   ↓
REMEMBER
   ↓
LEARN
   ↓
RECREATE
   ↓
SHARE
   ↓
PRESERVE
```

The goal is to turn disappearing everyday memories, games and hands-on knowledge into a **living, searchable and community-driven cultural archive.**
