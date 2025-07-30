import * as DTO from "./user.dto";

export interface IUserAdapter<TModel = unknown> 
  extends IGenericAdapter<TModel> {
  findAll(): Promise<TModel[]>;
  findByEmail(email: string): Promise<TModel | null>;
  create(data: DTO.CreateUserDto): Promise<TModel>;
  update(id: string, data: DTO.UpdateUserDto"): Promise<TModel>;
}
