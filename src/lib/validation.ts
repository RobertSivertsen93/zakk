
// Field validation utilities

// Country code validation
export const isValidCountryCode = (code: string): boolean => {
  // List of common country codes - in a real app this would be more comprehensive
  const countryCodes = [
    'CN', 'US', 'GB', 'DE', 'FR', 'IT', 'ES', 'JP', 'KR', 'IN',
    'BR', 'CA', 'AU', 'NZ', 'ZA', 'RU', 'MX', 'AR', 'DK', 'SE',
    'NO', 'FI', 'IS', 'CH', 'AT', 'PL', 'NL', 'BE', 'LU', 'PT',
    'GR', 'TH', 'VN', 'ID', 'MY', 'SG', 'PH', 'SA', 'AE', 'EG'
  ];
  
  return countryCodes.includes(code.toUpperCase());
};

// Date format validation
export const isValidDate = (dateStr: string): boolean => {
  if (!dateStr) return false;
  
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  
  const date = new Date(dateStr);
  return !isNaN(date.getTime());
};

// Amount/number validation
export const isValidAmount = (amount: string): boolean => {
  const regex = /^-?\d+(\.\d{1,2})?$/; // Valid amounts with up to 2 decimal places
  return regex.test(amount);
};

// HS code validation
export const isValidHSCode = (code: string): boolean => {
  // Basic validation - in reality this would check against a real database
  const regex = /^\d{4}\.\d{2}\.\d{2}$/;
  return regex.test(code);
};

// Get validation message
export const getValidationMessage = (field: string, value: string): string | null => {
  if (!value) return null; // Don't validate empty fields here
  
  switch (field) {
    case 'countryOfOrigin':
      return isValidCountryCode(value) ? null : 'Enter a valid 2-letter country code (e.g., US, CN, UK)';
    case 'invoiceDate':
    case 'dueDate':
      return isValidDate(value) ? null : 'Enter a valid date in YYYY-MM-DD format';
    case 'quantity':
    case 'unitPrice': 
    case 'amount':
      return isValidAmount(value) ? null : 'Enter a valid number with up to 2 decimal places';
    case 'productNumber':
      return isValidHSCode(value) ? null : 'Enter a valid HS code (e.g., 6117.80.80)';
    default:
      return null;
  }
};
