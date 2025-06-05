export interface ITransactionAdapter {
  listTransactions(customerId: string): Promise<any[]>;
  getTransaction(txnId: string): Promise<any>;
}
