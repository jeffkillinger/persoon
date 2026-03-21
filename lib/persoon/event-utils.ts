export function formatEventTimestamp(timestamp: number) {
  return new Date(timestamp).toLocaleString();
}

export function summarizeMetadata(metadata?: Record<string, unknown>) {
  if (!metadata || Object.keys(metadata).length === 0) {
    return "None";
  }

  return Object.entries(metadata)
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        return `${key}: ${value.join(", ")}`;
      }

      if (typeof value === "object" && value !== null) {
        return `${key}: ${JSON.stringify(value)}`;
      }

      return `${key}: ${String(value)}`;
    })
    .join(" | ");
}
