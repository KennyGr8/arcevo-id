// IGenericAdapter.ts
export interface IGenericAdapter<TModel = unknown> {
  findById(id: string): Promise<TModel | null>;
  delete(id: string): Promise<boolean>;
}
