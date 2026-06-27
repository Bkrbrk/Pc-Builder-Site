# Pull Request: Add architecture planning documents

This PR adds a set of planning and architecture documents under the docs/ directory:

- docs/project-plan.md
- docs/data-flow.md
- docs/api-endpoints.md
- docs/compatibility-rules.md
- docs/component-schema.md

Summary

- These documents define the MVP scope, data flow, API design, compatibility rules, and canonical component schemas for the PC Builder Compatibility Checker project.
- No application logic is added — this is documentation only.

Review notes

- Please review the component schema for missing fields or desired enum values.
- Normalization guidance is intentionally conservative: prefer null over guessing.

Merge target

- Base branch: main
- Head branch: docs/architecture-planning

Co-authored-by: Copilot <copilot@example.com>
