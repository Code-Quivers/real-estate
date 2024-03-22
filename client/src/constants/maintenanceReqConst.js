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
    label: "Tenant Screening",
    value: "TENANT_SCREENING",
  },
  {
    label: "Maintenance & Repair",
    value: "MAINTENANCE_AND_REPAIR",
  },
  {
    label: "Cleaning",
    value: "CLEANING",
  },
  {
    label: "Pest Control",
    value: "PEST_CONTROL",
  },
  {
    label: "Lawn Care",
    value: "LAWN_CARE",
  },
  {
    label: "Security and Safety",
    value: "SECURITY_AND_SAFETY",
  },
  {
    label: "Insurance",
    value: "INSURANCE",
  },
  {
    label: "Inspection",
    value: "INSPECTION",
  },
  {
    label: "Marketing",
    value: "MARKETING",
  },
  {
    label: "Technology",
    value: "TECHNOLOGY",
  },
].map((item) => ({ label: item.label, value: item.value }));
