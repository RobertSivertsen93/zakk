
// Define our supported languages
export type Language = 'en' | 'fo';

// Define translations interface
export interface Translations {
  [key: string]: {
    en: string;
    fo: string;
  };
}

// Define our base translations
export const translations: Translations = {
  // Navigation
  logout: {
    en: 'Logout',
    fo: 'Útrita',
  },
  // Extract page
  uploadPdf: {
    en: 'Upload PDF',
    fo: 'Send PDF',
  },
  backToUpload: {
    en: 'Back to Upload',
    fo: 'Aftur til at senda',
  },
  invoice: {
    en: 'Invoice',
    fo: 'Faktura',
  },
  lineItems: {
    en: 'Line Items',
    fo: 'Linjupostar',
  },
  export: {
    en: 'Export',
    fo: 'Útflyt',
  },
  continue: {
    en: 'Continue',
    fo: 'Hald fram',
  },
  completed: {
    en: 'Completed',
    fo: 'Liðugt',
  },
  // New fields for customs
  vatNumber: {
    en: 'VAT Number',
    fo: 'V-tal',
  },
  goodsNumber: {
    en: 'Goods Number',
    fo: 'Góðsnummar',
  },
  receiptOfOrigin: {
    en: 'Receipt of Origin',
    fo: 'Upprunaváttan',
  },
  // Shipment/Customs translations
  customsShipment: {
    en: 'Customs Shipment',
    fo: 'Tolla sending',
  },
  customsShipmentDescription: {
    en: 'Process multiple invoices for customs declaration',
    fo: 'Viðger fleiri fakturarar fyri tollayvirskifting',
  },
  invoiceBatch: {
    en: 'Invoice Batch',
    fo: 'Faktura pakki',
  },
  addInvoice: {
    en: 'Add Invoice',
    fo: 'Legg faktura afturat',
  },
  shipmentSummary: {
    en: 'Shipment Summary',
    fo: 'Sendingaryvirlit',
  },
  shipmentControls: {
    en: 'Shipment Controls',
    fo: 'Sendingar stýring',
  },
  searchInvoices: {
    en: 'Search invoices...',
    fo: 'Leita fakturarar...',
  },
  filterBy: {
    en: 'Filter by',
    fo: 'Filtrera eftir',
  },
  pending: {
    en: 'Pending',
    fo: 'Bíðar',
  },
  approved: {
    en: 'Approved',
    fo: 'Góðkent',
  },
  rejected: {
    en: 'Rejected',
    fo: 'Avvísað',
  },
  viewPdf: {
    en: 'View PDF',
    fo: 'Vís PDF',
  },
  approve: {
    en: 'Approve',
    fo: 'Góðken',
  },
  reject: {
    en: 'Reject',
    fo: 'Avvís',
  },
  remove: {
    en: 'Remove',
    fo: 'Strika',
  },
  date: {
    en: 'Date',
    fo: 'Dato',
  },
  amount: {
    en: 'Amount',
    fo: 'Upphædd',
  },
  totalInvoices: {
    en: 'Total Invoices',
    fo: 'Fakturarar í alt',
  },
  selected: {
    en: 'Selected',
    fo: 'Vald',
  },
  statusBreakdown: {
    en: 'Status Breakdown',
    fo: 'Status yvirlit',
  },
  approvedValue: {
    en: 'Approved Value',
    fo: 'Góðkent virði',
  },
  invoicesReadyForExport: {
    en: 'invoices ready for export',
    fo: 'fakturarar klár til útflyt',
  },
  shipmentName: {
    en: 'Shipment Name',
    fo: 'Sendingar navn',
  },
  enterShipmentName: {
    en: 'Enter shipment name...',
    fo: 'Skriva sendingar navn...',
  },
  batchOperations: {
    en: 'Batch Operations',
    fo: 'Pakka viðgerðir',
  },
  selectAll: {
    en: 'Select All',
    fo: 'Vel øll',
  },
  deselectAll: {
    en: 'Deselect All',
    fo: 'Vel einki',
  },
  exportApproved: {
    en: 'Export Approved',
    fo: 'Útflyt góðkent',
  },
  clearShipment: {
    en: 'Clear Shipment',
    fo: 'Reinsa sending',
  },
  addInvoiceToBatch: {
    en: 'Add Invoice to Batch',
    fo: 'Legg faktura í pakka',
  },
  cancel: {
    en: 'Cancel',
    fo: 'Avlýs',
  },
  addToBatch: {
    en: 'Add to Batch',
    fo: 'Legg í pakka',
  },
  invoiceAdded: {
    en: 'Invoice added',
    fo: 'Faktura løgd afturat',
  },
  exportShipment: {
    en: 'Export Shipment',
    fo: 'Útflyt sending',
  },
  exportSummary: {
    en: 'Export Summary',
    fo: 'Útflyt yvirlit',
  },
  approvedInvoicesWillBeExported: {
    en: 'approved invoices will be exported',
    fo: 'góðkendar fakturarar verða útfluttar',
  },
  exportFormat: {
    en: 'Export Format',
    fo: 'Útflyt snið',
  },
  fileName: {
    en: 'File Name',
    fo: 'Fílu navn',
  },
  optional: {
    en: 'Optional',
    fo: 'Valfrí',
  },
  taksFormatNote: {
    en: 'TAKS Format Conversion',
    fo: 'TAKS snið umbreyting',
  },
  hsCodesWithoutDots: {
    en: 'HS codes without dots (e.g., "61178080")',
    fo: 'HS kodar uttan punkt (t.d., "61178080")',
  },
  decimalCommas: {
    en: 'Decimal values with commas (e.g., "1,020")',
    fo: 'Desimal virði við komma (t.d., "1,020")',
  },
  noApprovedInvoices: {
    en: 'No approved invoices to export',
    fo: 'Eingar góðkendar fakturarar at útflyta',
  },
  exportCompleted: {
    en: 'Export completed',
    fo: 'Útflyt liðugt',
  },
  invoicesExported: {
    en: 'invoices exported',
    fo: 'fakturarar útfluttar',
  },
  // Missing dropdown menu translations
  reviewAndApprove: {
    en: 'Review & Approve',
    fo: 'Kanna & Góðken',
  },
  quickApprove: {
    en: 'Quick Approve',
    fo: 'Skjót góðkenning',
  },
  all: {
    en: 'All',
    fo: 'Øll',
  },
  // Additional translations that may be missing
  approvalStatus: {
    en: 'Approval Status',
    fo: 'Góðkenningar støða',
  },
  pendingInvoicesWarning: {
    en: 'Some invoices are still pending approval',
    fo: 'Nakrar fakturarar bíða enn eftir góðkenning',
  },
};
