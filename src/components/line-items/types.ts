
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
};
