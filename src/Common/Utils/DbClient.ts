import { IndexDbRepository } from "./IndexDbRepository";

enum EIndexDb {
  DB_NAME = "orders",
  TABLE_NAME = "orders-client",
}

export interface IOrderRepository {
  id: number;
  product_id: string;
  count: number;
}

export const OrderRepository = new IndexDbRepository<IOrderRepository>({
  DbName: EIndexDb.DB_NAME,
  TblName: EIndexDb.TABLE_NAME,
  SampleModel: { id: 0, count: 0, product_id: "" },
});
