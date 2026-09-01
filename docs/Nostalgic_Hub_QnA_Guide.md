# Nostalgic Hub — Hackathon Q&A Master Guide

This document contains 50 comprehensive, open-ended questions and answers tailored specifically for hackathon pitching, architectural defense, and technical evaluation of the **Nostalgic Hub** project, based strictly on the Product Requirements Document (PRD).

---

## Part 1: Product Vision & Core Philosophy

### 1. What is the primary vision and emotional identity of Nostalgic Hub?
* **Answer:** Nostalgic Hub is a hackathon-ready, full-stack MVP designed to rediscover, preserve, learn, create, and experience forgotten culture, crafts, foods, and traditional games of Northeast India. Its emotional identity centers on **nostalgia + discovery + culture + creativity + community**, serving as a digital museum, community hub, creative playground, and artisan marketplace combined.

### 2. Why does the PRD state that the homepage should not feel like a conventional e-commerce store?
* **Answer:** Because the primary experience upon opening the website should be **# DISCOVER**, making users immediately curious about things they may have forgotten from their childhood. A conventional e-commerce layout would immediately commercialize the experience, whereas Nostalgic Hub prioritizes cultural storytelling and emotional connection before introducing marketplace elements.

### 3. What are the primary and secondary target audiences for Nostalgic Hub?
* **Answer:** The primary audiences are families and millennials. Secondary audiences include children and younger users discovering traditional games, students, young adults, tourists interested in Northeast Indian culture, local artisans, traditional craft makers, traditional food makers, and community organizers. The product is intentionally designed so different generations can use it comfortably.

### 4. What is the overarching Product Principle that defines Nostalgic Hub's differentiator?
* **Answer:** Its unique differentiator is the combination of **Cultural preservation + nostalgia + AI creativity + traditional games + local community + artisan marketplace**. Users arrive for nostalgia and leave discovering something they can learn, make, play, or experience.

### 5. What are the seven core success criteria that the final MVP must communicate immediately?
* **Answer:** 
  1. **DISCOVER:** Rediscover forgotten culture.
  2. **CREATE:** Turn ordinary objects into creative possibilities with AI.
  3. **PLAY:** Bring forgotten games back to life.
  4. **CONNECT:** Find people and local communities.
  5. **SUPPORT:** Connect artisans with customers.
  6. **PRESERVE:** Allow verified cultural knowledge to survive digitally.
  7. **RETURN:** Give users meaningful reasons to come back.

---

## Part 2: Architecture & Cost Constraints

### 6. What is the strict cost constraint mandated for the Nostalgic Hub MVP development?
* **Answer:** **Zero development cost.** The project must not introduce paid APIs, paid SaaS products, paid AI APIs, or paid infrastructure. Developers must rely on free/open-source technologies, free tiers, browser-native capabilities, local processing, and open-source models.

### 7. How does the architecture handle features that normally require paid external APIs?
* **Answer:** Developers must not fake the feature. They must identify a genuinely free/open-source alternative; if one exists, implement it. If not, create a clearly separated abstraction/interface so the service can be plugged in later, and provide a transparent fallback for the hackathon MVP rather than pretending unavailable features work.

### 8. How is the codebase structured to ensure future scalability across India and globally?
* **Answer:** The application uses a modular architecture separating authentication, users, content, games, marketplace, vendors, AI, community, gamification, feedback, and administration. It avoids monolithic components or giant data structures, ensuring easy expansion to multiple cultures, regions, and languages later.

### 9. What languages are supported in the MVP localization structure, and how should strings be managed?
* **Answer:** The MVP supports English, Hindi, Assamese, Bengali, and Bodo. Translated strings must not be hardcoded throughout the application; developers must use a proper localization structure so additional Northeast Indian languages can be easily added later.

### 10. What is the Anti-Fake-Functionality Rule in the PRD?
* **Answer:** Every visible interactive element must either **work**, **be explicitly marked as coming soon**, or **be omitted from the MVP**. Fake AI responses, fake marketplace orders, fake player locations, fake leaderboards, fake statistics, fake chat, fake authentication, and fake payment confirmations are strictly prohibited.

---

## Part 3: Homepage & Discovery Experience

### 11. What is the rotating cultural feature displayed under "Today's Nostalgic Discovery"?
* **Answer:** It features one rotating cultural item (such as a forgotten game, craft, childhood creation, traditional food, or local invention) displaying an image, name, region, short story, and a "Discover" CTA.

### 12. What does the visual discovery feed ("Remember This?") showcase on the homepage?
* **Answer:** It features a visual horizontal/vertical discovery feed containing nostalgic objects and activities such as bottle-cap spinning tops, marbles, leaf horns, handmade toys, traditional decorations, bamboo objects, and childhood games.

### 13. What key information attributes must be displayed on each Forgotten Game card?
* **Answer:** Story/history, how to play, number of players, required items, skill progression, difficulty, region, and CTAs for "Find Players", "Learn Game", and "Save to Collection".

### 14. What distinction is strictly maintained regarding Traditional Food Stories on the platform?
* **Answer:** Food stories serve as a cultural and educational experience detailing regional origin, cultural background, ingredients, and preparation steps. The PRD explicitly states: **Do NOT turn this section into a food-delivery application.**

### 15. How does the homepage represent nearby traditional-game activity without compromising privacy?
* **Answer:** It displays a summary indicator such as *"12 people nearby are looking for players"* while strictly respecting user privacy settings and **never exposing precise user locations publicly by default**.

---

## Part 4: AI Creative Assistant ("Create with AI")

### 16. What input methods are supported by the "Create with AI" assistant?
* **Answer:** Users can upload a single image, upload multiple images, take/upload a picture of an object, add a text description, or combine image and text (e.g., *"I have an old bottle, a straw and some cardboard. What can I make?"*).

### 17. Is the AI restricted solely to traditional crafts? Why or why not?
* **Answer:** No. The AI is not restricted only to traditional crafts; it may suggest nostalgic childhood creations, traditional-inspired crafts, decorations, toys, games, useful household objects, artistic projects, educational projects, upcycling ideas, and completely new creative ideas.

### 18. What specific outputs must the AI provide for each suggested project?
* **Answer:** Project name, short concept, objects/materials used, difficulty, estimated time, step-by-step instructions, safety considerations where relevant, skills learned, cultural connection (if applicable), alternative ideas, "Save project", and "Try another idea".

### 19. What multimodal capability should the AI support regarding visual presentation?
* **Answer:** When appropriate, the system should allow the AI to generate a visual concept or mockup of the finished creation using available no-cost technology or open-source solutions.

### 20. What is the exact user journey for the Visual AI Experience?
* **Answer:** 
  1. "What do you have?" (Upload/take pictures).
  2. AI identifies usable objects/materials.
  3. "Here's what you could make" (Show creative visual cards).
  4. User chooses an idea.
  5. AI provides instructions.
  6. User can generate/see a visual concept.
  7. User saves the project and earns XP.
  8. User shares creation with the community.

---

## Part 5: Games & Nearby Player System

### 21. How is skill progression structured within the Forgotten Games practice module?
* **Answer:** The progression system follows a four-tier ladder: **Beginner → Explorer → Skilled → Master**, awarding XP based on meaningful engagement.

### 22. What user actions are supported when organizing a game session in the Play section?
* **Answer:** Users can find nearby players, create a game session, join a session, choose date and time, select approximate location, create teams, invite participants, chat with participants, and rate/report participants.

### 23. What are the three privacy levels available for the Nearby Player System?
* **Answer:** 
  1. Precise GPS/location sharing.
  2. Approximate locality/area.
  3. Manually selected area.
  The user retains full control over their choice, and exact locations are never exposed publicly.

### 24. How are game rankings and leaderboards designed to prevent superficial activity?
* **Answer:** Rankings incorporate XP, levels, game-specific progression, and overall player level across local, city, state, Northeast India, and India scopes. Crucially, **rankings are NOT made solely based on the number of logins**, but rather reward meaningful participation.

### 25. What sample traditional games are pre-populated in the MVP demo data?
* **Answer:** Pittu, Gilli Danda, Hopscotch, Marbles, Chor-Police, Chupan Chupai, and Shollo Ana.

---

## Part 6: Crafts, Marketplace & Vendor Ecosystem

### 26. What fundamental distinction must be maintained between cultural knowledge and marketplace listings for crafts?
* **Answer:** **Cultural Knowledge** covers what the item is, its history, cultural significance, and traditional manufacturing techniques. **Marketplace Listings** represent actual physical products offered by verified vendors. These two concepts must never be improperly mixed.

### 27. What capabilities are included in the Vendor/Artisan dashboard?
* **Answer:** Vendors can create profiles, add business information, upload products with images and descriptions, set prices and inventory, accept bulk-order requests, receive customer inquiries, manage listings, view order/request status, and communicate with customers.

### 28. What is the mandatory moderation rule for all vendor profiles and product listings?
* **Answer:** **ALL VENDOR AND PRODUCT LISTINGS MUST REQUIRE ADMIN APPROVAL.** Newly submitted listings default to **"Pending Approval"**, and only approved content becomes publicly visible.

### 29. How does the marketplace business model operate, and how is commission handled?
* **Answer:** It functions as a commission-based multi-vendor platform connecting customers with vendors (*Customer → Nostalgic Hub → Vendor*). The commission percentage is **admin-configurable** and must not be hardcoded into the application.

### 30. Why is real checkout and online payment excluded from the marketplace MVP?
* **Answer:** Real payment processing requires external payment gateways which violate zero-cost constraints or require complex legal setup. Instead, the MVP provides alternative transactional actions: **Contact Vendor**, **Request Order**, **Request Bulk Order**, **Chat**, and vendor contact options, while architecting backend data models for future payment gateway integration.

---

## Part 7: Bulk Orders & Food Stories

### 31. What details must a customer bulk-order request contain?
* **Answer:** The product, quantity, customer message, required date, delivery/location information, and contact information. Vendors can accept, reject, respond with quotations, or ask questions.

### 32. What is the primary purpose of the "Food Stories" section?
* **Answer:** It serves primarily as a **cultural and educational experience** (detailing regional origin, cultural stories, historical background, ingredients, preparation steps, and traditional occasions) rather than a food-delivery platform.

### 33. Can users submit new food stories or corrections?
* **Answer:** Yes, users can save foods, add them to collections, suggest foods, submit corrections, and submit stories. However, **all submitted cultural content requires admin approval before public publication**.

### 34. What categories of local crafts are highlighted in the bamboo and local crafts domain?
* **Answer:** Examples include bamboo mats, nangol, bamboo flutes, bamboo dustbins, fishing/fishery items, traditional filters, earthen pots, decorative products, and household objects.

### 35. What nostalgic childhood builds are featured alongside traditional crafts?
* **Answer:** Bottle-cap toys, leaf-based toys, handmade childhood decorations, simple recycled creations, marble games, leaf horns, and simple childhood inventions.

---

## Part 8: Gamification & Retention

### 36. How is XP earned within Nostalgic Hub's gamification system?
* **Answer:** XP is awarded for meaningful activities such as discovering content, completing game tutorials, learning a craft, completing a project, completing challenges, joining community activities, submitting useful content, and providing feedback. Meaningless clicking is intentionally excluded.

### 37. What are Quests in the gamification framework?
* **Answer:** Multi-step missions (e.g., *"Rediscover Northeast Childhood"* requiring users to discover 3 games, learn 2 games, complete 1 game challenge, and save 5 cultural items) designed to guide user engagement.

### 38. What retention mechanisms are prohibited according to product principles?
* **Answer:** **Manipulative retention mechanics** are forbidden. Retention must come from genuine discovery, ensuring users continually find new things to discover, learn, create, play, collect, and share.

### 39. What does the personalized "Your Nostalgia Journey" page display for users?
* **Answer:** Games discovered, crafts discovered, projects created, challenges completed, skills progressed, badges earned, and collections completed.

### 40. What reward types are supported within the admin-configurable reward system?
* **Answer:** Coupons, marketplace rewards, and community rewards, fully configurable by administrators.

---

## Part 9: Community, Feedback & Admin Control

### 41. What is the purpose of the central "Help Us Preserve What We Forgot" feedback area?
* **Answer:** It allows users to suggest forgotten games, traditional crafts, and foods, submit cultural information and tutorials, request products, report incorrect cultural information or inappropriate content, suggest features, vote on suggestions, and give feedback.

### 42. What lifecycle statuses can an admin assign to user feedback and submissions?
* **Answer:** Pending, Under Review, Approved, Rejected, Needs More Information, and Implemented.

### 43. What management domains are available in the fully functional Admin Dashboard?
* **Answer:** Users, Vendors, Products, Games, Crafts, Food Stories, AI content/reporting, Community moderation, Feedback reviews, Rewards configuration, Commission percentage configuration, and comprehensive Analytics.

### 44. What analytics metrics must the admin dashboard display?
* **Answer:** Registered users, active users, popular games, most discovered content, most popular crafts, AI usage, AI project creation, game sessions, vendor listings, pending approvals, feedback submissions, marketplace requests, and community activity.

### 45. How is secure access to the admin dashboard handled without hardcoding secrets?
* **Answer:** A secure development/demo mechanism is established using environment variables or the chosen authentication system, ensuring credentials are never hardcoded into frontend code.

---

## Part 10: Security, Reliability & Implementation Strategy

### 46. What security measures are mandated for the MVP?
* **Answer:** Authentication, authorization, role-based permissions (Guest, User, Vendor/Artisan, Admin), server-side validation, input sanitization, secure file uploads, protected admin and vendor routes, unexposed secrets, appropriate database security rules, and basic abuse prevention. **Admin operations must always be authorized server-side.**

### 47. How must the application handle error states and network failures under reliability rules?
* **Answer:** The application must gracefully handle network failures, empty states, loading states, API failures, invalid uploads, unsupported images, missing content, unauthorized access, duplicate submissions, and vendor rejections by using loading indicators, error messages, retry actions, form validation, and confirmation states. **Users must never stare at a broken or blank screen.**

### 48. What are the P0 (Must Work) priorities for hackathon implementation?
* **Answer:** Google authentication, Discover homepage, Games section, game detail pages, create/join game session, nearby-player discovery with privacy options, AI creative assistant, image upload, AI project suggestions, step-by-step project generation, crafts section, vendor profiles, vendor dashboard, admin approval system, marketplace product discovery, contact vendor, request order, Food Stories, XP/levels, badges, collections, daily/weekly challenges, feedback system, multilingual UI, and responsive mobile UI.

### 49. What build strategy phases are outlined in the PRD for systematic development?
* **Answer:** 
  * Phase 1: Foundation (structure, design system, auth, database, routing, roles)
  * Phase 2: Discover (homepage, content model, search, games, crafts, food)
  * Phase 3: AI (upload, analysis, suggestions, instructions, saving)
  * Phase 4: Community (player discovery, sessions, profiles, rankings, challenges)
  * Phase 5: Marketplace (vendors, products, approval, contact, orders, bulk requests)
  * Phase 6: Gamification (XP, levels, badges, collections, quests, streaks, rewards)
  * Phase 7: Admin (moderation, verification, analytics, feedback, config)
  * Phase 8: Polish (responsive UI, loading, errors, accessibility, performance, security, testing)

### 50. What is the complete end-to-end user journey that must be verified before considering the MVP complete?
* **Answer:** A user discovers a forgotten game, reads its story, learns how to play, finds nearby players, creates/joins a session, and earns XP. They then upload a picture of an old household object, receive AI creative suggestions, get step-by-step instructions, save it to their collection, discover a local artisan, view a verified craft listing, contact the vendor/request an order, read a traditional food story, complete a challenge, and earn a badge—leaving them with a compelling reason to return tomorrow.
