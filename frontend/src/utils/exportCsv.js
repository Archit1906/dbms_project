export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    alert("No data available to export");
    return;
  }

  // Extract headers
  const headers = Object.keys(data[0]).join(',');

  // Extract rows
  const rows = data.map(item => {
    return Object.values(item).map(value => {
      // Escape commas and quotes for CSV
      if (typeof value === 'string') {
        const escaped = value.replace(/"/g, '""');
        return `"${escaped}"`;
      }
      return value;
    }).join(',');
  });

  const csvContent = [headers, ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');

  if (navigator.msSaveBlob) { // IE 10+
    navigator.msSaveBlob(blob, filename);
  } else {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
