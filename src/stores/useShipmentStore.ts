
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface InvoiceData {
  id: string;
  fileName: string;
  pdfUrl: string;
  invoiceNumber: string;
  invoiceDate: string;
  customerName: string;
  currency: string;
  totalAmount: number;
  lineItems: any[];
  status: 'pending' | 'approved' | 'rejected';
  extractedData: any;
  createdAt: string;
}

export interface ShipmentState {
  invoices: InvoiceData[];
  selectedInvoices: string[];
  shipmentName: string;
  
  // Actions
  addInvoice: (invoice: Omit<InvoiceData, 'id' | 'createdAt'>) => void;
  removeInvoice: (id: string) => void;
  updateInvoiceStatus: (id: string, status: InvoiceData['status']) => void;
  toggleInvoiceSelection: (id: string) => void;
  selectAllInvoices: () => void;
  clearSelection: () => void;
  setShipmentName: (name: string) => void;
  getApprovedInvoices: () => InvoiceData[];
  clearShipment: () => void;
}

export const useShipmentStore = create<ShipmentState>()(
  persist(
    (set, get) => ({
      invoices: [],
      selectedInvoices: [],
      shipmentName: '',

      addInvoice: (invoiceData) => {
        const newInvoice: InvoiceData = {
          ...invoiceData,
          id: `invoice-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };
        
        set((state) => ({
          invoices: [...state.invoices, newInvoice]
        }));
      },

      removeInvoice: (id) => {
        set((state) => ({
          invoices: state.invoices.filter(invoice => invoice.id !== id),
          selectedInvoices: state.selectedInvoices.filter(selectedId => selectedId !== id)
        }));
      },

      updateInvoiceStatus: (id, status) => {
        set((state) => ({
          invoices: state.invoices.map(invoice => 
            invoice.id === id ? { ...invoice, status } : invoice
          )
        }));
      },

      toggleInvoiceSelection: (id) => {
        set((state) => ({
          selectedInvoices: state.selectedInvoices.includes(id)
            ? state.selectedInvoices.filter(selectedId => selectedId !== id)
            : [...state.selectedInvoices, id]
        }));
      },

      selectAllInvoices: () => {
        const { invoices } = get();
        set({
          selectedInvoices: invoices.map(invoice => invoice.id)
        });
      },

      clearSelection: () => {
        set({ selectedInvoices: [] });
      },

      setShipmentName: (name) => {
        set({ shipmentName: name });
      },

      getApprovedInvoices: () => {
        const { invoices } = get();
        return invoices.filter(invoice => invoice.status === 'approved');
      },

      clearShipment: () => {
        set({
          invoices: [],
          selectedInvoices: [],
          shipmentName: ''
        });
      }
    }),
    {
      name: 'shipment-storage',
    }
  )
);
