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

Rules

1) CPU ↔ Motherboard socket match
- Check: CPU.socket must equal Motherboard.cpu_socket
- If CPU.socket and motherboard.cpu_socket are both known and different -> error
- If one is unknown -> info (cannot determine) or warning if an inferred conflict (not in MVP)

2) Motherboard ↔ RAM type
- Check: Motherboard.supported_ram (e.g., DDR4, DDR5) must include RAM.generation
- If known and incompatible -> error
- If known and compatible but RAM frequency exceeds supported max -> warning

3) RAM DDR generation
- Check: RAM.generation values should be explicit (DDR3|DDR4|DDR5)
- If RAM.generation unknown -> info

4) GPU ↔ Case length (physical fit)
- Check: GPU.length_mm <= Case.max_gpu_length_mm
- If GPU.length_mm > Case.max_gpu_length_mm -> error
- If Case.max_gpu_length_mm unknown -> info
- If length close to limit (for example within 10mm) -> warning (may be tight fit)

5) PSU wattage estimate
- Check: Estimated build power draw <= PSU.wattage * 0.8 recommended threshold
- If PSU.wattage < estimated_draw -> error
- If PSU.wattage between estimated_draw and estimated_draw * 1.2 -> warning (marginal)
- Note: estimation is heuristic; expose the estimated draw and the rule should be an advisory calculation

6) PSU connectors
- Check: Ensure PSU has required connectors for selected components (e.g., GPU needs one or more PCIe 8-pin connectors; CPU power requires EPS 4/8-pin)
- If PSU lacks required connector type/count -> error
- If adapter needed (not recommended) -> warning with reason

7) Motherboard form factor ↔ Case
- Check: Motherboard.form_factor (ATX/mATX/ITX/E-ATX) must be supported by Case.supported_motherboard_form_factors
- If unsupported -> error
- If barely supported (e.g., E-ATX in a case that lists "limited E-ATX") -> warning

8) CPU cooler ↔ CPU socket
- Check: CPU Cooler.supported_sockets includes CPU.socket
- If not included -> error

9) CPU cooler height ↔ Case clearance
- Check: CPU Cooler.height_mm <= Case.max_cpu_cooler_height_mm
- If greater -> error
- If within a small margin -> warning

10) Storage (M.2 / SATA) support
- Check: Motherboard.available_m2_slots >= number of M.2 devices marked as NVMe
- If insufficient M.2 slots -> error for M.2 devices requiring those slots
- If SATA port count < number of SATA devices -> error
- If features such as PCIe gen/version mismatch with NVMe drive (e.g., PCIe Gen4 NVMe on Gen3-only MB) -> warning or info depending on severity

General rule guidance

- Unknown or null fields: treat as unknown. A rule that cannot decisively fail due to missing data must return an info result explaining what data is missing and how to obtain it.
- Rules must be deterministic and idempotent. Running the same normalized input must produce identical results.
- Rules should be modular and composable: each rule checks a single aspect and returns structured output so the UI can present actionable steps.
