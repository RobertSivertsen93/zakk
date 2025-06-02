
export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  sender: string;
  documentNumber: string;
  paymentMethod: string;
  notes: string;
  customerNumber: string;
  customerName: string;
  customerAddress: string;
  currency: string;
  reference: string;
  vatNumber: string;
  goodsNumber: string;
  lineItems: {
    id: string;
    productNumber: string;
    countryOfOrigin: string;
    description: string;
    quantity: number;
    unitPrice: number;
    amount: number;
    confidencePercentage: number;
    weight: number;
    hsCode: string;
    netWeight: number;
    unitCode: string;
    taxable: boolean;
    alternativeProductNumbers?: string[];
  }[];
}
