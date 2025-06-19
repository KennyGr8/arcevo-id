import * as DTO from "./user.dto";

export interface IUserAdapter<TModel = unknown> {
  findAll(): Promise<TModel[]>;
  findById(id: string): Promise<TModel | null>;
  findByEmail(email: string): Promise<TModel | null>;
  create(data: DTO.CreateUserDto): Promise<TModel>;
  update(id: string, data: DTO.UpdateUserDto"]): Promise<TModel>;
  delete(id: string): Promise<void>;
}
