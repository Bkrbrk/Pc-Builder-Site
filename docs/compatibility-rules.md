# Compatibility Rules (Reference)

Each rule in the compatibility engine should return a result object with:
- rule_id (string)
- level ("error" | "warning" | "info")
- message (string)
- component_ids (array of component ids implicated)
- details (optional object with normalized fields used for the check)

Severity definitions

- error: definitive incompatibility. The build cannot function or would be damaged if used.
- warning: technically compatible but suboptimal or risky (performance, reliability, physical fit, or best practice violated).
- info: informational note useful to the builder (e.g., alternate suggestions, missing non-critical features).

Canonical field names

This project uses a small set of canonical field names across all normalized objects. Use these exact names in normalizers and rules:
- socket
- manufacturer
- displayName
- category
- model

Do not introduce alternate synonyms for these fields in docs or normalized data.

Rules

1) CPU ↔ Motherboard socket match
- Check: CPU.specs.socket must equal Motherboard.specs.socket
- If both CPU.specs.socket and Motherboard.specs.socket are known and different -> error
- If one is unknown (null or "unknown") -> info (cannot determine)

2) Motherboard ↔ RAM type
- Check: Motherboard.specs.supported_ram (e.g., DDR3, DDR4, DDR5) must include RAM.specs.generation
- If known and incompatible -> error
- If known and compatible but RAM speed exceeds supported max -> warning

3) RAM DDR generation
- Check: RAM.specs.generation values should be one of the canonical DDR generations (see Canonical Enumerations)
- If RAM.specs.generation is null -> info

4) GPU ↔ Case length (physical fit)
- Check: GPU.specs.length_mm <= Case.specs.max_gpu_length_mm
- If GPU.specs.length_mm > Case.specs.max_gpu_length_mm -> error
- If Case.specs.max_gpu_length_mm is null -> info
- If length is close to limit (for example within 10mm) -> warning (may be tight fit)

5) PSU wattage estimate
- Check: Estimated build power draw <= PSU.specs.wattage * 0.8 recommended threshold
- If PSU.specs.wattage < estimated_draw -> error
- If PSU.specs.wattage between estimated_draw and estimated_draw * 1.2 -> warning (marginal)
- Note: estimation is heuristic; expose the estimated draw and the rule should be an advisory calculation

6) PSU connectors
- Check: Ensure PSU.specs.connectors has required connector types/counts for selected components (e.g., GPU needs one or more PCIe 8-pin connectors; CPU power requires EPS 4/8-pin)
- If PSU.specs.connectors lacks required connector type/count -> error
- If adapter needed (not recommended) -> warning with reason

7) Motherboard form factor ↔ Case
- Check: Motherboard.specs.form_factor (Mini-ITX / Micro-ATX / ATX / E-ATX) must be supported by Case.specs.supported_motherboard_form_factors
- If unsupported -> error
- If barely supported (e.g., case lists "limited E-ATX") -> warning

8) CPU cooler ↔ CPU socket
- Check: CPU Cooler.specs.supported_sockets includes CPU.specs.socket
- If not included -> error

9) CPU cooler height ↔ Case clearance
- Check: CPU Cooler.specs.height_mm <= Case.specs.max_cpu_cooler_height_mm
- If greater -> error
- If within a small margin -> warning

10) Storage (M.2 / SATA) support
- Check: Motherboard.specs.m2_slot_count >= number of M.2 devices marked as NVMe
- If insufficient M.2 slots -> error for M.2 devices requiring those slots
- If Motherboard.specs.sata_port_count < number of SATA devices -> error
- If PCIe generation mismatch between NVMe drive and motherboard -> warning or info depending on severity

General rule guidance

- Unknown or null fields: treat as unknown. A rule that cannot decisively fail due to missing data must return an info result explaining what data is missing and how to obtain it.
- Rules must be deterministic and idempotent. Running the same normalized input must produce identical results.
- Rules should be modular and composable: each rule checks a single aspect and returns structured output so the UI can present actionable steps.
