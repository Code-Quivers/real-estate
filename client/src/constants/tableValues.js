export const getStatusClasses = (status) => {
  switch (status) {
    case "PENDING":
      return "bg-[#f1c231]";
    case "APPROVED":
      return "bg-green-500";
    case "ACTIVE":
      return "bg-blue-500";
    case "PAUSED":
      return "bg-gray-500";
    case "CANCEL":
      return "bg-red-500";
    case "COMPLETED":
      return "bg-purple-500";
    default:
      return "";
  }
};

export const getType = (type) => {
  const formatString = (str) => {
    return str
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return formatString(type || "");
};
