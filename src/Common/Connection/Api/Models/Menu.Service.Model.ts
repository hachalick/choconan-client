export class ReadMenuDetailModel {}

export class ReadMenuCategoryDetailModel {
  Id: string = "";
}

export class ReadMenuProductDetailModel {
  Id: string = "";
}

export class ReadSearchMenuDetailModel {
  Text: string = "";
}

export class CreateMenuCategoryModel {
  Name: string = "";
  IsShowMenu: boolean = true;
  MetaTitle: string = "";
  MetaDescription: string = "";
  Icon: string = "";
  Description: string = "";
}

export class UpdateMenuCategoryModel {
  Id: string = "";
  Name: string = "";
  IsShowMenu: boolean = true;
  MetaTitle: string = "";
  MetaDescription: string = "";
  Icon: string = "";
  Description: string = "";
}

export class DeleteMenuCategoryModel {
  Id: string = "";
}

export class CreateMenuProductModel {
  CategoryId: string = "";
  IsShowMenu: boolean = true;
  MetaTitle: string = "";
  MetaDescription: string = "";
  Name: string = "";
  Description: string = "";
  Price: number = 0;
  Waiting: number = 0;
  SnapId: string = "";
  TapsiId: string = "";
  SrcImage: string = "";
}

export class UpdateMenuProductModel {
  Id: string = "";
  CategoryId: string = "";
  IsShowMenu: boolean = true;
  MetaTitle: string = "";
  MetaDescription: string = "";
  Name: string = "";
  Description: string = "";
  Price: number = 0;
  Waiting: number = 0;
  SnapId: string = "";
  TapsiId: string = "";
  SrcImage: string = "";
}

export class DeleteMenuProductModel {
  Id: string = "";
}

export class ReadEconomicPackageListModel {
  IsActiveNow?: boolean;
}

export class ReadEconomicPackageDetailModel {
  Id: string = "";
}

export class CreateEconomicPackageModel {
  IsShowMenu: boolean = true;
  SrcImage: string = "";
  Title: string = "";
  StartDate: string = "";
  EndDate: string = "";
  Price: number = 0;
}

export class UpdateEconomicPackageModel {
  Id: string = "";
  IsShowMenu: boolean = true;
  SrcImage: string = "";
  Title: string = "";
  StartDate: string = "";
  EndDate: string = "";
  Price: number = 0;
}

export class DeleteEconomicPackageModel {
  Id: string = "";
}

export class CreateContentEconomicPackageModel {
  EconomicPackageId: string = "";
  ProductId: string = "";
  Count: number = 0;
}

export class DeleteContentEconomicPackageModel {
  EconomicPackageId: string = "";
  ProductId: string = "";
  Count: number = 0;
}
