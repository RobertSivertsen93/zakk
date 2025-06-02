
import { useState, useEffect } from 'react';

export interface ExchangeRateData {
  rates: Record<string, number>;
  base: string;
  date: string;
}

export const useExchangeRates = () => {
  const [rates, setRates] = useState<ExchangeRateData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRates = async (baseCurrency: string = 'USD') => {
    setLoading(true);
    setError(null);
    
    try {
      // Using a free exchange rate API (exchangerate-api.com)
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      
      const data = await response.json();
      setRates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch exchange rates');
      console.error('Exchange rate fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getExchangeRate = (fromCurrency: string, toCurrency: string): number | null => {
    if (!rates) return null;
    
    if (fromCurrency === toCurrency) return 1;
    
    // If base currency is the from currency
    if (rates.base === fromCurrency) {
      return rates.rates[toCurrency] || null;
    }
    
    // If base currency is the to currency
    if (rates.base === toCurrency) {
      const fromRate = rates.rates[fromCurrency];
      return fromRate ? 1 / fromRate : null;
    }
    
    // Convert through base currency
    const fromRate = rates.rates[fromCurrency];
    const toRate = rates.rates[toCurrency];
    
    if (fromRate && toRate) {
      return toRate / fromRate;
    }
    
    return null;
  };

  return {
    rates,
    loading,
    error,
    fetchRates,
    getExchangeRate
  };
};
