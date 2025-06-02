
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DollarSign, RefreshCw, Calculator, AlertCircle, TrendingUp } from 'lucide-react';
import { useExchangeRates } from '@/hooks/useExchangeRates';
import { toast } from "@/lib/toast";

interface CurrencyConverterProps {
  onConvert: (rate: number, fromCurrency: string, toCurrency: string) => void;
  selectedItemsCount: number;
}

const COMMON_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' }
];

const CurrencyConverter: React.FC<CurrencyConverterProps> = ({ 
  onConvert, 
  selectedItemsCount 
}) => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [manualRate, setManualRate] = useState('');
  const [useManualRate, setUseManualRate] = useState(false);
  const [previewAmount, setPreviewAmount] = useState('100');
  
  const { rates, loading, error, fetchRates, getExchangeRate } = useExchangeRates();

  useEffect(() => {
    fetchRates(fromCurrency);
  }, [fromCurrency]);

  const currentRate = useManualRate 
    ? parseFloat(manualRate) || 0 
    : getExchangeRate(fromCurrency, toCurrency) || 0;

  const previewConverted = parseFloat(previewAmount) * currentRate;

  const handleConvert = () => {
    if (currentRate <= 0) {
      toast.error('Please enter a valid conversion rate');
      return;
    }

    onConvert(currentRate, fromCurrency, toCurrency);
  };

  const handleRefreshRates = () => {
    fetchRates(fromCurrency);
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <DollarSign className="h-5 w-5" />
          Currency Conversion
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Convert amounts for {selectedItemsCount} selected items
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Currency Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>From Currency</Label>
            <Select value={fromCurrency} onValueChange={setFromCurrency}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {COMMON_CURRENCIES.map((currency) => (
                  <SelectItem key={currency.code} value={currency.code}>
                    {currency.symbol} {currency.code} - {currency.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>To Currency</Label>
            <div className="flex gap-2">
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {COMMON_CURRENCIES.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.symbol} {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={swapCurrencies}
                title="Swap currencies"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Exchange Rate */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Exchange Rate</Label>
            <div className="flex items-center gap-2">
              <Label htmlFor="manual-rate" className="text-sm">Manual Rate</Label>
              <Switch
                id="manual-rate"
                checked={useManualRate}
                onCheckedChange={setUseManualRate}
              />
            </div>
          </div>

          {useManualRate ? (
            <div className="space-y-2">
              <Input
                type="number"
                step="0.0001"
                value={manualRate}
                onChange={(e) => setManualRate(e.target.value)}
                placeholder="Enter exchange rate"
              />
              <p className="text-xs text-muted-foreground">
                1 {fromCurrency} = {manualRate || '0'} {toCurrency}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 border rounded-md bg-muted/20">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="font-medium">
                    1 {fromCurrency} = {currentRate.toFixed(4)} {toCurrency}
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRefreshRates}
                  disabled={loading}
                >
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                </Button>
              </div>
              
              {error && (
                <div className="flex items-center gap-2 text-sm text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              )}
              
              {rates && (
                <p className="text-xs text-muted-foreground">
                  Last updated: {new Date(rates.date).toLocaleDateString()}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Preview */}
        <div className="space-y-4 border-t pt-4">
          <Label>Preview Conversion</Label>
          <div className="grid grid-cols-3 gap-2 items-center">
            <Input
              type="number"
              value={previewAmount}
              onChange={(e) => setPreviewAmount(e.target.value)}
              placeholder="Amount"
            />
            <div className="text-center text-lg font-medium">→</div>
            <div className="p-3 border rounded-md bg-muted/20 text-center font-medium">
              {previewConverted.toFixed(2)} {toCurrency}
            </div>
          </div>
        </div>

        {/* Convert Button */}
        <Button 
          onClick={handleConvert} 
          className="w-full"
          disabled={currentRate <= 0}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Convert {selectedItemsCount} Items
        </Button>
      </CardContent>
    </Card>
  );
};

export default CurrencyConverter;
