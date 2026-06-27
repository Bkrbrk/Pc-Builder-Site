# API Endpoints (Planned)

This document describes the planned REST endpoints for the MVP. These are design-only — do not implement them yet.

Convention

- All endpoints are under /api.
- Requests and responses use JSON and return appropriate HTTP status codes.
- Normalized product objects follow the internal schema documented in docs/component-schema.md.

Endpoints summary

1. GET /api/health
2. GET /api/search?q=&type=
3. GET /api/parts/normalize?url=
4. POST /api/build/check

---

## 1) GET /api/health

Purpose: quick health check for the backend service.

Request:
- Method: GET
- Query: none

Response (success):
- Status: 200
- Body:
  {
    "status": "ok",
    "version": "0.1.0",
    "uptime_seconds": 12345
  }

Error cases:
- 500: { "status": "error", "message": "detailed error" }

Use case: monitoring, readiness/liveness checks.

---

## 2) GET /api/search?q=&type=

Purpose: proxy a search request to configured search providers and return raw results or provider-agnostic normalized snippets depending on implementation.

Request:
- Method: GET
- Query parameters:
  - q (string, required): search query
  - type (string, optional): optional part category filter (e.g., cpu, motherboard, gpu, ram)
  - provider (string, optional): explicit provider id for the request (if the system supports multiple providers)

Response (success):
- Status: 200
- Body:
  {
    "query": "rtx 4070",
    "provider": "example-provider",
    "results": [
      { "id": "abc-123", "title": "GPU model X", "price": 499.99, "raw": { /* provider raw object */ }, "normalized": { /* optional light normalized summary */ } }
    ]
  }

Error cases:
- 400: missing q parameter
- 502: provider upstream error
- 500: internal server error

Notes:
- The API may return raw provider payloads in `raw` and optionally a light `normalized` object for display. Full normalization should be done via the normalize endpoint.

---

## 3) GET /api/parts/normalize?url=

Purpose: Normalize a single product given a provider product URL or provider id + product id. Returns the canonical product schema used by the compatibility engine.

Request:
- Method: GET
- Query parameters (one of):
  - url (string): absolute provider product URL
  - provider (string) and id (string): provider-specific identifiers

Response (success):
- Status: 200
- Body:
  {
    "normalized": { /* canonical PCComponent object */ },
    "source": { "provider": "example", "raw": { /* raw provider payload */ } }
  }

Error cases:
- 400: missing parameters
- 404: product not found at provider
- 422: product could not be normalized (e.g., required fields missing)
- 500: internal error

Notes:
- Normalizer should not fabricate data. Missing values should be null or "unknown".

---

## 4) POST /api/build/check

Purpose: Run the compatibility engine against a build (array of normalized PCComponent objects) and return structured rule results.

Request:
- Method: POST
- Body:
  {
    "build": [ { /* normalized component object */ }, ... ],
    "options": { "tolerate_unknowns": true }
  }

Response (success):
- Status: 200
- Body:
  {
    "summary": { "errors": 1, "warnings": 2, "infos": 3 },
    "results": [
      {
        "rule_id": "cpu-mb-socket",
        "level": "error",
        "message": "CPU socket AM5 is not compatible with motherboard socket LGA1700",
        "component_ids": ["cpu-1","mb-1"],
        "details": { "cpu_socket": "AM5", "mb_socket": "LGA1700" }
      }
    ]
  }

Error cases:
- 400: invalid request body
- 422: normalization required — some build entries are raw provider objects (client should normalize before checking)
- 500: internal server error

Notes:
- Engine should be stateless and deterministic. Unknown fields should not cause crashes; instead rules should return info/warning levels when a check cannot be performed.
