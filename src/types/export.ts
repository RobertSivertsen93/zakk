
export interface InvoiceData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  sender: string;
  documentNumber: string;
  paymentMethod: string;
  notes: string;
  lineItems: {
    id: string;
    productNumber: string;
    countryOfOrigin: string;
    description: string;
    quantity: string;
    unitPrice: string;
    amount: string;
    confidencePercentage: number;
    weight: string;
    alternativeProductNumbers?: string[];
  }[];
}
