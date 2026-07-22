import { Dexie, type EntityTable } from "dexie";

export class IndexDbRepository<T extends { id?: number }> {
  private _db: Dexie;
  private _tblName: string;
  private _table: EntityTable<T, "id">;

  constructor({
    DbName,
    TblName,
    SampleModel,
  }: {
    DbName: string;
    TblName: string;
    SampleModel: T;
  }) {
    this._tblName = TblName;

    const keys = Object.keys(SampleModel);
    const schema = keys
      .map((key) => {
        if (key === "id" || key === "Id") return `++${key}`;
        if (key === "Guid" || key === "guid") return `&${key}`;
        return key;
      })
      .join(", ");

    this._db = new Dexie(DbName);
    this._db.version(1).stores({
      [TblName]: schema,
    });

    this._table = this._db.table(TblName) as EntityTable<T, "id">;
  }

  async add(item: Omit<T, "id">): Promise<number> {
    return (await this._table.add(item as any)) as any;
  }

  async addMany(items: Omit<T, "id">[]): Promise<number[]> {
    return (await this._table.bulkAdd(items as any)) as any;
  }

  async getAll(): Promise<T[]> {
    return await this._table.toArray();
  }

  async getById(id: number): Promise<T | undefined> {
    return await this._table.get(id as any);
  }

  async getWhere(filter: Partial<T>): Promise<T[]> {
    return await this._table
      .filter((item) => {
        return Object.entries(filter).every(([key, value]) => {
          return (item as any)[key] === value;
        });
      })
      .toArray();
  }

  async update(id: number, changes: Partial<T>): Promise<number> {
    const result = await this._table.update(id as any, changes as any);
    return result as number;
  }

  async delete(id: number): Promise<void> {
    return await this._table.delete(id as any);
  }

  async deleteWhere(filter: Partial<T>): Promise<void> {
    const items = await this.getWhere(filter);
    const ids = items.map((item) => (item as any).id);
    await this._table.bulkDelete(ids as any);
  }

  async clear(): Promise<void> {
    return await this._table.clear();
  }

  async count(): Promise<number> {
    return await this._table.count();
  }
}
