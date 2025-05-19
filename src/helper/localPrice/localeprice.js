export const formatNumberWithCommas = (number) => {
    // Convert to number first
    const num = Number(number);
    
    // Check if the conversion was successful
    if (isNaN(num)) {
      // If not a valid number, return the original as string
      return String(number);
    }
    
    // Format with commas
    return num.toLocaleString('en-US');
  };