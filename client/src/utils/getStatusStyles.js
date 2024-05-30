export const getMaintenanceStatusStyles = (statusName) => {
  const statusStyles = {
    PENDING: "bg-yellow-100 border-yellow-600 text-yellow-600",
    APPROVED: "bg-blue-100 text-blue-600 border-blue-600",
    ACTIVE: "bg-green-100 text-green-600 border-green-600",
    PAUSED: "bg-gray-100 text-gray-600 border-gray-600",
    CANCEL: "bg-red-100 text-red-600 border-red-600",
    COMPLETED: "bg-green-100 text-green-600 border-green-600",
  };

  return statusStyles[statusName] || "";
};
