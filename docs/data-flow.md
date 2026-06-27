# Data Flow — PC Builder Compatibility Checker

This document describes the intended data flow between the frontend, backend, and external providers.

User action sequence (high level)

1. User searches for a part in the frontend UI.
2. Frontend calls the backend search proxy endpoint.
3. Backend calls one or more search providers (pluggable connector) and receives raw provider results.
4. Backend returns raw results to the frontend OR attempts to normalize them before returning (implementation choice). Normalization is **required** before compatibility checks.
5. User reviews results and selects a product.
6. Frontend normalizes the selected product client-side (optional) or sends it to backend normalize endpoint for normalization.
7. Normalized product added to the temporary build (stored client-side in localStorage for MVP).
8. Frontend invokes backend compatibility check endpoint with the temporary build (array of normalized components).
9. Backend compatibility engine evaluates rules and returns structured results with severities: error/warning/info.
10. Frontend renders results to the user.

Responsibilities

Frontend responsibilities

- Search UI: collect queries and display search results returned by backend.
- Local temporary build: manage the user's temporary build (add/remove parts) using localStorage initially.
- Product selection: allow users to pick a product; either call backend normalize endpoint or keep raw result and request normalization when checking build.
- Display: render compatibility engine results (errors/warnings/info) in a clear, actionable way.
- Resilience: handle partial data and unknown fields gracefully; do not assume spec completeness.

Backend responsibilities

- Search proxy: provide a single REST endpoint to query pluggable providers; return provider raw results and/or normalized results depending on the configuration.
- Normalization: convert raw provider results into the internal PCComponent schema. The normalization step must be explicit and auditable.
- Compatibility engine: accept a build (array of normalized components) and return deterministic compatibility results (structured list of rule outcomes with severities and messages).
- Validation & sanitization: ensure incoming normalized objects conform to expected types and range-check numeric values where appropriate.

Temporary storage strategy (MVP)

- Use browser localStorage as the first-line, client-side temporary storage for a user's current build.
- Save a lightweight normalized representation of each selected product to localStorage. Keep timestamps and source metadata to aid later synchronization.
- Do not store user-sensitive data in localStorage.

Future cache / database support

- When moving beyond MVP, add server-side cache and a small DB table to store normalized product records and optionally persistent user builds.
- Caching normalized products reduces repeated normalization and speeds compatibility checks.
- Use an LRU cache or Redis for short-term caching of provider responses and normalized products.

Notes on normalization

- Normalization must map provider-specific fields into the canonical schema. Missing or unknown values should be represented as null or the string "unknown" — never guess a value.

Normalization rules (explicit)

Normalization NEVER guesses specifications. If a value cannot be verified by the normalizer, set it according to the rules below:

- numeric values -> null
- boolean values -> null
- enum values -> null
- text values -> "unknown"

Compatibility rules and engine behavior

- The compatibility engine must never assume missing values. Rules must explicitly check for null/"unknown" and return an info-level result when a check cannot be completed due to missing data.
- Normalizers should prefer canonical field names (socket, manufacturer, displayName, category, model) and canonical enumerations (see docs/component-schema.md). Do not invent new fields that duplicate meaning.
