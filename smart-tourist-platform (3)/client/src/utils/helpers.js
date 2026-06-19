export function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return String(dateString);

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatCurrency(
  amount,
  currency
) {
  if (amount === undefined || amount === null) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency || "USD",
  }).format(amount);
}

export function getStatusColor(status) {
  const colors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    ACCEPTED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
    COMPLETED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
    BOOKED: "bg-blue-100 text-blue-800",
    CHECKED_IN: "bg-green-100 text-green-800",
    CHECKED_OUT: "bg-gray-100 text-gray-800",
    DRAFT: "bg-gray-100 text-gray-800",
    ONGOING: "bg-blue-100 text-blue-800",
    PLANNING: "bg-purple-100 text-purple-800",
    CONFIRMED: "bg-green-100 text-green-800",
  };
  return colors[status?.toUpperCase()] || "bg-gray-100 text-gray-800";
}

export function calculateDuration(startDate, endDate) {
  if (!startDate || !endDate) return 0;
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPhone(phone) {
  return /^\+?[\d\s\-()]{7,20}$/.test(phone);
}

export function formatServerError(data) {
  if (!data) return null;
  let msg = data.error || data.message || null;
  if (data.details && typeof data.details === 'object') {
    const fieldErrors = Object.entries(data.details)
      .map(([field, err]) => `${field}: ${err}`)
      .join('\n');
    msg = msg ? `${msg}\n${fieldErrors}` : fieldErrors;
  }
  return msg;
}
