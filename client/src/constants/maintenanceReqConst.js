export const MaintenancePriorityType = [
  {
    label: "Low Priority",
    value: "LOW_PRIORITY",
  },
  {
    label: "Medium Priority",
    value: "MEDIUM_PRIORITY",
  },
  {
    label: "High Priority",
    value: "HIGH_PRIORITY",
  },
].map((item) => ({ label: item.label, value: item.value }));

export const issueTypes = [
  {
    label: "Structural Issues",
    value: "Structural Issues",
  },
  {
    label: "Plumbing Issues",
    value: "Plumbing Issues",
  },
  {
    label: "Electrical Issues",
    value: "Electrical Issues",
  },
  {
    label: "HVAC (Heating, Ventilation, and Air Conditioning) Issues",
    value: "HVAC (Heating, Ventilation, and Air Conditioning) Issues",
  },
  {
    label: "Roofing Issues",
    value: "Roofing Issues",
  },
  {
    label: "Moisture and Waterproofing Issues",
    value: "Moisture and Waterproofing Issues",
  },
  {
    label: "Pest Issues",
    value: "Pest Issues",
  },
  {
    label: "Interior Issues",
    value: "Interior Issues",
  },
  {
    label: "Exterior Issues",
    value: "Exterior Issues",
  },
  {
    label: "Safety Issues",
    value: "Safety Issues",
  },
  {
    label: "Others",
    value: "Others",
  },
].map((item) => ({ label: item.label, value: item.value }));
