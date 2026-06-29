// backend/src/domain/constants.js
// Canonical domain constants for PC components and enumerations.
// Single source of truth for canonical strings used by normalizers and rules.
// No business logic here.

export const COMPONENT_CATEGORIES = Object.freeze({
  CPU: 'cpu',
  MOTHERBOARD: 'motherboard',
  RAM: 'ram',
  GPU: 'gpu',
  PSU: 'psu',
  SSD: 'ssd',
  HDD: 'hdd',
  CPU_COOLER: 'cpu_cooler',
  CASE: 'case',
  CASE_FAN: 'case_fan'
})

export const CPU_SOCKETS = Object.freeze({
  AM4: 'AM4',
  AM5: 'AM5',
  LGA1151: 'LGA1151',
  LGA1200: 'LGA1200',
  LGA1700: 'LGA1700'
})

export const RAM_GENERATIONS = Object.freeze({
  DDR3: 'DDR3',
  DDR4: 'DDR4',
  DDR5: 'DDR5'
})

export const MOTHERBOARD_FORM_FACTORS = Object.freeze({
  MINI_ITX: 'Mini-ITX',
  MICRO_ATX: 'Micro-ATX',
  ATX: 'ATX',
  E_ATX: 'E-ATX'
})

export const STORAGE_INTERFACES = Object.freeze({
  SATA: 'SATA',
  NVME: 'NVMe'
})

export const PSU_EFFICIENCY_RATINGS = Object.freeze({
  '80_PLUS': '80+',
  '80_PLUS_BRONZE': '80+ Bronze',
  '80_PLUS_SILVER': '80+ Silver',
  '80_PLUS_GOLD': '80+ Gold',
  '80_PLUS_PLATINUM': '80+ Platinum',
  '80_PLUS_TITANIUM': '80+ Titanium'
})
