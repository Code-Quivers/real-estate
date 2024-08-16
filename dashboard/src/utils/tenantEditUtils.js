export const convertToNumber = (value) => (value ? Number(value) : null);

export const convertToBoolean = (value) => (value === "true" ? true : value === "false" ? false : null);

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
