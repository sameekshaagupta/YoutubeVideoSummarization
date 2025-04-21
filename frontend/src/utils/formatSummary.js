export function formatSummary(summary) {
    // Remove all * and ** characters
    const cleaned = summary.replace(/\*/g, '');
  
    // Optionally add any further formatting
    const formatted = cleaned.replace(/\n/g, '<br/>');
  
    return formatted;
  }
  