export const convertToNumber = (value) => (value ? Number(value) : undefined);

export const convertToBoolean = (value) => (value === "true" ? true : value === "false" ? false : undefined);

export const booleanSelectPicker = [
  {
    label: "Yes",
    value: "true",
  },
  {
    label: "No",
    value: "false",
  },
].map((item) => ({ label: item.label, value: item.value }));
