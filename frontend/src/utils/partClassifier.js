export const PART_TYPES = {
  CPU: 'cpu',
  MOTHERBOARD: 'motherboard',
  RAM: 'ram',
  GPU: 'gpu',
  PSU: 'psu',
  STORAGE: 'storage',
  COOLER: 'cooler',
  CASE: 'case'
}

export const classifyPart = (part) => {
  return { type: null, confidence: 0 }
}