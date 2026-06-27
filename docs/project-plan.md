# Project Plan — PC Builder Compatibility Checker

## Project goal
Build a compatibility-checking service for PC builds that helps users assemble compatible PC parts. The system will let users search products from online sources, select parts into a temporary build, normalize technical specifications, and run compatibility checks that surface errors, warnings, and informational notes.

This repository implements the architecture and backend/frontend scaffolding for a React + Vite frontend and a Node.js + Express backend. The initial work focuses on architecture documentation and planned APIs — not implementation of scraping, AI, UI, or business logic.

## MVP scope
The minimum viable product (MVP) will provide:

- Search proxy: Backend endpoint that accepts search queries and proxies calls to a pluggable search provider (provider implementations are out of scope for MVP).
- Product normalization endpoint: Normalize a single product's technical specs from a provider's raw result into the internal schema (normalization logic implemented with clear interfaces; provider implementations can be mocked).
- Temporary build storage in the browser: Frontend stores a user's current build in localStorage (no server-side persistent builds in MVP).
- Compatibility engine: A deterministic rules engine that validates a temporary build and returns structured results (errors/warnings/info). The engine runs in the backend (stateless) and accepts normalized product data. For MVP, the engine runs rule checks but not advanced heuristics or recommendations.
- Simple REST API (design-only implemented in docs) for health, search proxy, normalize, and build-check endpoints.

MVP exclusions (explicitly not included):

- No UI beyond demonstration stubs (do not implement full frontend in this phase).
- No web scraping provider implementations — product source providers are out of scope.
- No AI-based normalization or suggestion logic (AI is optional and reserved for later phases).
- No persistent user accounts, saved builds, or price-tracking features.
- No production-grade caching or CDN integration (a local dev cache may be used for tests).

## Development phases
Phase 0 — Documentation & scaffolding (current)
- Create docs for architecture, data flow, API design, compatibility rules, and component schemas.
- Create a docs branch and initial commit.

Phase 1 — Core backend & schema
- Implement Node.js + Express API skeleton.
- Implement normalization interfaces and simple normalizer utilities (provider-agnostic). Providers mocked.
- Implement compatibility engine (rule evaluator) with tests.
- Add API endpoints for search proxy (stubbed), product normalization (mocked), build check.

Phase 2 — Frontend & temporary build UX
- Implement React + Vite app skeleton and localStorage-based temporary builds.
- Implement components to add/remove parts and call backend check endpoint.
- Add minimal error and warning display components for the engine output.

Phase 3 — Provider integration & persistence
- Add concrete search/scraping connectors (pluggable providers with adapters).
- Add server-side caching and optional DB persistence for normalized products and recommended builds.
- Add user accounts and saved builds (opt-in).

Phase 4 — Optional AI & advanced features
- Evaluate AI-enhanced normalization and recommendation models (optional — not required for MVP).
- Add price comparison, historical price tracking, and recommendation engine powered by heuristics/ML.

## Notes
- AI is optional: all core MVP functionality must work without AI. If introduced later, AI should be an additive layer (e.g., better normalization, fuzzy compatibility fixes, suggestions), not a requirement.
- Normalization required: product data from external sources is heterogeneous. Before running compatibility checks, raw product data MUST be normalized to the internal component schema. The compatibility engine depends only on normalized fields.
