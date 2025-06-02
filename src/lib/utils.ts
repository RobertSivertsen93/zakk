
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { LineItem } from "@/components/line-items/types";
import { InvoiceData } from "@/types/export";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts data to TAKS format
 * - Removes dots from HS codes
 * - Replaces decimal points with commas in numerical values
 */
export function convertToTaksFormat(data: InvoiceData): InvoiceData {
  // Create a deep copy to avoid modifying original data
  const result = JSON.parse(JSON.stringify(data));
  
  // Process line items if they exist
  if (result.lineItems && Array.isArray(result.lineItems)) {
    result.lineItems = result.lineItems.map((item: LineItem) => {
      return {
        ...item,
        // Remove dots from product numbers (HS codes)
        productNumber: item.productNumber.replace(/\./g, ''),
        // Convert decimal points to commas in numerical values
        weight: item.weight?.replace('.', ','),
        quantity: typeof item.quantity === 'string' ? item.quantity.replace('.', ',') : item.quantity,
        unitPrice: typeof item.unitPrice === 'string' ? item.unitPrice.replace('.', ',') : item.unitPrice,
        amount: typeof item.amount === 'string' ? item.amount.replace('.', ',') : item.amount,
        // Process alternative product numbers if they exist
        alternativeProductNumbers: item.alternativeProductNumbers?.map(code => code.replace(/\./g, ''))
      }
    });
  }
  
  // Process other numerical fields if needed
  // Add any additional TAKS-specific formatting here
  
  return result;
}
