const formatLogTimestamp = (timestamp) => {
  // 1. Handle missing or null timestamps
  if (!timestamp) return { relativeTime: "---", dateParts: [] };

  const now = new Date();
  const logDate = new Date(timestamp);

  // 2. Handle invalid date strings
  if (isNaN(logDate.getTime())) {
    return { relativeTime: "N/A", dateParts: ["--", "---", "----"] };
  }

  const diffInSeconds = Math.floor((now - logDate) / 1000);

  // 3. Calculate Relative Time String
  let relativeTime = "JUST NOW";
  if (diffInSeconds >= 60 && diffInSeconds < 3600) {
    relativeTime = `${Math.floor(diffInSeconds / 60)}M AGO`;
  } else if (diffInSeconds >= 3600 && diffInSeconds < 86400) {
    relativeTime = `${Math.floor(diffInSeconds / 3600)}H AGO`;
  } else if (diffInSeconds >= 86400) {
    relativeTime = `${Math.floor(diffInSeconds / 86400)}D AGO`;
  }

  // 4. Create Date Parts Array
  const dateParts = [
    logDate.getDate().toString().padStart(2, '0'),
    // FIXED: Must be 'short' (lowercase)
    logDate.toLocaleString('en-US', { month: 'short' }).toUpperCase(), 
    logDate.getFullYear().toString(),
    logDate.toTimeString().split(' ')[0].substring(0, 5) // HH:mm
  ];

  return { relativeTime, dateParts };
};

export default formatLogTimestamp;