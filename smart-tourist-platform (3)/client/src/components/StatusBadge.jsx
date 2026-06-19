import { Badge } from "@/components/ui/badge";

export const StatusBadge = ({
  status,
  variant = "default",
}) => {
  const s = status || 'UNKNOWN';
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ACCEPTED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    DRAFT: "bg-gray-100 text-gray-800",
    ONGOING: "bg-blue-100 text-blue-800",
    PLANNING: "bg-purple-100 text-purple-800",
    BOOKED: "bg-blue-100 text-blue-800",
    CHECKED_IN: "bg-green-100 text-green-800",
    CHECKED_OUT: "bg-gray-100 text-gray-800",
    CONFIRMED: "bg-green-100 text-green-800",
  };

  const colorClass =
    statusColors[s.toUpperCase()] || "bg-gray-100 text-gray-800";

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}
    >
      {s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()}
    </span>
  );
};
