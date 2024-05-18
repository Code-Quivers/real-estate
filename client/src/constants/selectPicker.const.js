// sorting data
export const sortingPicker = [
  { label: "Newest", value: "desc" },
  { label: "Oldest", value: "asc" },
].map((item) => ({
  label: item.label,
  value: item.value,
}));

export const pricePicker = [
  {
    label: "High to low",
    value: "desc",
  },
  {
    label: "Low to High",
    value: "asc",
  },
].map((item) => ({
  label: item.label,
  value: item.value,
}));
