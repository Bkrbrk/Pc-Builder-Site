# Component Schema — Internal Canonical Formats

This document defines the internal PCComponent schema and per-component schemas used by the normalization process and compatibility engine.

Guiding principles

- All external product data must be normalized into these schemas before compatibility checks.
- Missing or unknown values must be represented as null or the exact string "unknown" (preferred: null for typed fields; string "unknown" may be used for free-text fields).
- Do not guess or fabricate values during normalization.
- Use consistent units: mm for lengths/heights, W for power, GB/TB for capacities, MHz for frequencies, and so on.

Universal PCComponent (base) schema (JSON-like)

{
  "id": "string",              // required: internal id or provider id
  "category": "string",      // required: canonical category like "cpu", "motherboard", "ram", "gpu", "psu", "ssd", "hdd", "cooler", "case", "case_fan"
  "title": "string",         // display title
  "source": {                  // optional: provider metadata
    "provider": "string",
    "provider_id": "string",
    "url": "string",
    "raw": { /* provider-specific raw object */ }
  },
  "normalized_at": "ISO8601 timestamp",
  "specs": { /* category-specific specs object */ },
  "meta": {                     // optional: non-compat display metadata
    "price": 499.99,
    "currency": "USD",
    "thumbnail": "url"
  }
}

Note: specs object contains the fields used by compatibility rules.

Per-component schemas

1) CPU
Required fields:
{
  "socket": "string",        // e.g., "LGA1700", "AM5"
  "tdp_w": number | null      // typical TDP in watts
}
Optional fields:
{
  "core_count": number | null,
  "thread_count": number | null,
  "base_clock_mhz": number | null,
  "boost_clock_mhz": number | null
}
Compatibility fields:
- socket
- tdp_w
Display fields:
- title, core/thread counts, clocks
Unknown handling:
- missing socket -> null; compatibility rules that need socket return info

Example:
{
  "id": "cpu-1",
  "category": "cpu",
  "title": "AMD Ryzen 9 7950X",
  "specs": { "socket": "AM5", "tdp_w": 170 }
}

2) Motherboard
Required fields:
{
  "cpu_socket": "string",
  "supported_ram": ["DDR4" | "DDR5"],
  "form_factor": "ATX" | "mATX" | "ITX" | "E-ATX"
}
Optional fields:
{
  "max_ram_slots": number | null,
  "max_ram_capacity_gb": number | null,
  "m2_slot_count": number | null,
  "sata_port_count": number | null
}
Compatibility fields:
- cpu_socket, supported_ram, form_factor, m2_slot_count, sata_port_count

Example:
{
  "id": "mb-1",
  "category": "motherboard",
  "title": "Example X670 ATX",
  "specs": { "cpu_socket": "AM5", "supported_ram": ["DDR5"], "form_factor": "ATX", "m2_slot_count": 3, "sata_port_count": 4 }
}

3) RAM
Required fields:
{
  "generation": "DDR4" | "DDR5",   // required for compatibility
  "capacity_gb": number
}
Optional fields:
{
  "modules": number | null,           // number of sticks
  "speed_mhz": number | null
}
Compatibility fields:
- generation, capacity_gb, modules

Example:
{
  "id": "ram-1",
  "category": "ram",
  "title": "32GB (2x16) DDR5-6000",
  "specs": { "generation": "DDR5", "capacity_gb": 32, "modules": 2, "speed_mhz": 6000 }
}

4) GPU
Required fields:
{
  "length_mm": number | null,
  "power_draw_w": number | null    // typical board power
}
Optional fields:
{
  "slot_width": number | null      // number of expansion slots occupied
}
Compatibility fields:
- length_mm, power_draw_w, slot_width

Example:
{
  "id": "gpu-1",
  "category": "gpu",
  "title": "Example RTX 40X",
  "specs": { "length_mm": 320, "power_draw_w": 300, "slot_width": 2 }
}

5) PSU
Required fields:
{
  "wattage": number,               // total rated wattage
  "connectors": {                  // counts by connector type
    "eps_12v": number | null,
    "pcie_8pin": number | null,
    "sata": number | null,
    "sata_power": number | null
  }
}
Optional fields:
{
  "modular": boolean | null,
  "efficiency_rating": "80+ Bronze" | "80+ Gold" | null
}
Compatibility fields:
- wattage, connectors

Example:
{
  "id": "psu-1",
  "category": "psu",
  "title": "Example 750W Gold",
  "specs": { "wattage": 750, "connectors": { "eps_12v": 1, "pcie_8pin": 3, "sata": 6 } }
}

6) SSD (NVMe / M.2)
Required fields:
{
  "interface": "NVMe" | "SATA",
  "form_factor": "M.2" | "2.5",
  "capacity_gb": number
}
Optional fields:
{
  "nvme_pcie_generation": 3 | 4 | null,
  "length_mm": number | null        // for M.2: 2280 etc
}
Compatibility fields:
- interface, form_factor, nvme_pcie_generation

7) HDD
Required fields:
{
  "interface": "SATA",
  "capacity_gb": number
}
Optional fields:
{
  "size_inches": 3.5 | 2.5 | null
}

8) CPU Cooler
Required fields:
{
  "supported_sockets": ["LGA1700","AM5"],
  "height_mm": number | null
}
Optional fields:
{
  "fan_rpm": number | null,
  "tdp_rating_w": number | null
}
Compatibility fields:
- supported_sockets, height_mm

9) Case
Required fields:
{
  "supported_motherboard_form_factors": ["ATX","mATX","ITX","E-ATX"],
  "max_cpu_cooler_height_mm": number | null,
  "max_gpu_length_mm": number | null
}
Optional fields:
{
  "front_radiator_compat_mm": [120,240,360] | null,
  "drive_bays_3_5": number | null,
  "drive_bays_2_5": number | null
}
Compatibility fields:
- supported_motherboard_form_factors, max_cpu_cooler_height_mm, max_gpu_length_mm

10) Case Fan
Required fields:
{
  "size_mm": number,            // 120, 140
  "power_w": number | null
}
Optional fields:
{
  "rpm": number | null,
  "airflow_cfm": number | null
}

Unknown value handling

- If a provider does not expose a required spec, normalizer must set the relevant field to null or the literal string "unknown" in free-text fields.
- Compatibility rules must check for null/unknown and return an info result indicating what is missing and which fields would be needed to perform a full check.

Examples of normalized object with unknowns:

{
  "id": "gpu-2",
  "category": "gpu",
  "title": "Generic GPU",
  "specs": { "length_mm": null, "power_draw_w": 220 }
}

Final notes

- The schemas above are intentionally conservative: prefer null for typed numeric/enum fields rather than guessing.
- As providers are integrated, normalizers should convert provider-specific values into the canonical enums/units used here.
- Keep normalization logic simple and testable. Document mapping rules in the provider adapters so fixes are auditable.
