export class ReadUnitPricingListModel {}

export class ReadUnitPricingDetailModel {
  Id: string = "";
}

export class CreateUnitPricingModel {
  Name: string = "";
}

export class UpdateUnitPricingModel {
  Id: string = "";
  Name: string = "";
}

export class DeleteUnitPricingModel {
  Id: string = "";
}

export class ReadProductPricingListModel {}

export class CreateProductPricingModel {
  Name: string = "";
  Buy: number = 0;
}

export class UpdateProductPricingModel {
  Id: string = "";
  Name: string = "";
  Buy: number = 0;
}

export class DeleteProductPricingModel {
  Id: string = "";
}

export class CreateProductUnitPricingModel {
  UnitPricingId: string = "";
  ProductPricingId: string = "";
  ProductMenuId: string | null = null;
  Ratio: number = 0;
  Profit: number = 0;
}

export class UpdateProductUnitPricingModel {
  Id: string = "";
  UnitPricingId: string = "";
  ProductMenuId: string | null = null;
  Ratio: number = 0;
  Profit: number = 0;
}

export class DeleteProductUnitPricingModel {
  Id: string = "";
}

export class UpdateProductUnitRatioModel {
  IsRatio: boolean = false;
  ProductUnitId1: string = "";
  ProductUnitId2: string = "";
}

export class CreateDetailProductPricingModel {
  Amount: number = 0;
  ParentProductUnitDetailId: string = "";
  ChildProductUnitDetailId: string = "";
}

export class UpdateDetailProductPricingModel {
  Id: string = "";
  Amount: number = 0;
  ChildProductUnitDetailId: string = "";
}

export class DeleteDetailProductPricingModel {
  Id: string = "";
}

export class ReadCostProductPricingListModel {}

export class ReadCostProductPricingDetailModel {
  Id: string = "";
}

export class CreateCostProductPricingModel {
  Name: string = "";
  Price: number = 0;
}

export class UpdateCostProductPricingModel {
  Id: string = "";
  Name: string = "";
  Price: number = 0;
}

export class DeleteCostProductPricingModel {
  Id: string = "";
}
