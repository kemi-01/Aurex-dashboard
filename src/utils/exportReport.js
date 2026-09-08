// ============================================================
// AUREX - REPORT EXPORT UTILITY
// Frontend-only CSV export
// ============================================================

export function exportReport({ filename = "aurex-report.csv", data = [] }) {
  if (!data || data.length === 0) {
    console.warn("No report data available to export.");
    return;
  }

  // Get all column names
  const headers = Object.keys(data[0]);

  // Convert values into CSV-safe format
  const escapeCSV = (value) => {
    if (value === null || value === undefined) {
      return "";
    }

    const stringValue = String(value);

    // Escape quotes
    const escaped = stringValue.replace(/"/g, '""');

    // Wrap values containing commas, quotes or line breaks
    if (
      escaped.includes(",") ||
      escaped.includes('"') ||
      escaped.includes("\n")
    ) {
      return `"${escaped}"`;
    }

    return escaped;
  };

  // Create CSV header
  const csvRows = [
    headers.map(escapeCSV).join(","),
  ];

  // Create CSV rows
  data.forEach((row) => {
    const values = headers.map((header) =>
      escapeCSV(row[header])
    );

    csvRows.push(values.join(","));
  });

  // Create CSV file
  const csvContent = csvRows.join("\n");

  const blob = new Blob(
    [csvContent],
    {
      type: "text/csv;charset=utf-8;",
    }
  );

  // Create temporary download URL
  const url = URL.createObjectURL(blob);

  // Create download link
  const link = document.createElement("a");

  link.href = url;
  link.download = filename;

  document.body.appendChild(link);

  link.click();

  // Clean up
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}