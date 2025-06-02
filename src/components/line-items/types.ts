
export type LineItem = {
  id: string;
  productNumber: string;
  countryOfOrigin: string;
  quantity: string;
  unitPrice: string;
  amount: string;
  description: string;
  confidencePercentage: number;
  weight: string;
  alternativeProductNumbers?: string[];
  vatNumber?: string;
  goodsNumber?: string;
  // Additional properties for TAKS export format
  customsCode?: string;
  tariff?: number;
  dutyFree?: boolean;
  hsCode?: string;
  netWeight?: number;
  unitCode?: string;
  taxable?: boolean;
};
