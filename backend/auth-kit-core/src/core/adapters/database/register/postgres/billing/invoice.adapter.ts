export interface IInvoiceAdapter {
  listInvoices(customerId: string): Promise<any[]>;
  getInvoice(invoiceId: string): Promise<any>;
  downloadInvoice(invoiceId: string): Promise<Buffer>;
}
