
export type LineItem = {
  id: string;
  productNumber: string;
  countryOfOrigin: string;
  quantity: string;
  unitPrice: string;
  amount: string;
  alternativeProductNumbers?: string[]; // Added new property for alternative suggestions
};
