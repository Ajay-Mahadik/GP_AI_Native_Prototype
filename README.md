AI Native Prototype: Product MVP

Live Interactive Demo: https://gp-ai-native-prototype-ajaymahadik.netlify.app/

This repository houses the functional prototype for the Episodic AI Anchor. Built as an interactive supplement to my Product Management case study, this MVP demonstrates how AI-native semantic retrieval can solve fundamental UX flaws in modern cloud storage.

The Problem: "The Metadata Mismatch"
Legacy photo galleries (Google Photos, Apple Photos) rely on a rigid, chronological data model driven by EXIF timestamps. However, user behavior has evolved. In the era of WhatsApp forwards, Instagram downloads, and AirDrop, original EXIF data is routinely stripped and replaced by the download date.
The UX Failure: If a user downloads a photo from a 2021 family vacation in 2026, the gallery anchors it to 2026. This shatters the user's "episodic memory" grouping, burying the photo and rendering traditional chronological scrolling useless.

The Solution: Semantic Episodic Clustering
This product replaces fragile chronological sorting with AI-driven semantic retrieval. By interpreting the visual and contextual intent of a search query, the engine can dynamically cluster photos back into their correct human "Episodes" (a specific trip, project, or event), completely ignoring corrupted EXIF timestamps.

Product Decisions & Execution
As a PM, my goal for this MVP was to prove the core semantic hypothesis while ensuring a zero-friction experience for case study evaluators.
Optimizing Time-to-Value (No API Keys): Evaluators drop off if forced to configure environments. I built a serverless proxy using Netlify Edge Functions (/netlify/functions/search.js) to securely vault the Gemini 2.5 Flash API key. Evaluators get a production-ready experience the second they click the link.
Designing for Reliability (Deterministic Hydration): LLMs are prone to structural hallucinations, which destroys user trust. To solve this, I decoupled the reasoning from the rendering. The AI strictly returns a JSON array of matching Photo IDs. The React client deterministically maps these IDs against the database to render the UI. The AI makes the choices; the application builds the screen.
Curated Edge-Case Testing: The MVP runs on a purpose-built 70-item dataset loaded with "dirty data" (mismatched download dates, multi-month projects, utility receipts) to prove the algorithm's resilience.

Evaluator Demo Guide: Core User Journeys
To validate the product hypothesis, please test the following specific scenarios in the live demo:

1: Bridging the Metadata Gap
The Context: Scroll down the default timeline to Sept 27, 2026. Notice the "Mom and Priya" beach photo sitting completely isolated from the rest of the 2021 Bali trip because it was downloaded from WhatsApp 5 years later.
The Action: Search "Bali Trip"
The Validation: The engine successfully bridges the 5-year gap, yanking the out-of-place 2026 photo and clustering it seamlessly with the original July 2021 Bali photos.

2: Asynchronous Event Grouping
The Context: Certain life events aren't captured in a single weekend. A home renovation spans months, scattering the photos across a timeline.
The Action: Search "Kitchen Renovation"
The Validation: The engine identifies the semantic thread and groups the project into one unified Episode, despite the photos spanning 6 months (Jan 2025 – June 2025).

3: Noise Filtering & Fallback UX
The Context: Users have thousands of "noise" photos (receipts, memes, parking tickets). A search engine shouldn't elevate these to major "Episodes."
The Action: Search "Utility" or "Car"
The Validation: Demonstrates the fallback UX logic. Standalone items matching the query are intelligently routed to a secondary "Related Singles & Utilities" tier, keeping the primary UI clean and preventing false-positive events.
