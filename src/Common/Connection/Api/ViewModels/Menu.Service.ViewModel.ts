import {
  BaseCreateViewModel,
  BaseDeleteViewModel,
  BaseReadViewModel,
  BaseUpdateViewModel,
} from "./Seed/Base.Service.ViewModel";

export class ReadMenuDetailViewModel extends BaseReadViewModel {
  Name: string = "";
  IsShowMenu: boolean = false;
  Icon: string = "";
  Products: {
    Id: string;
    IsShowMenu: boolean;
    Name: string;
    Description: string;
    Price: number;
    Waiting: number;
    SnapId: string;
    TapsiId: string;
    SrcImage: string;
  }[] = [];
}

export class ReadMenuCategoryDetailViewModel extends BaseReadViewModel {
  Name: string = "";
  Icon: string = "";
  IsShowMenu: boolean = false;
  Description: string = "";
  MetaTitle: string = "";
  MetaDescription: string = "";
  Products: {
    Id: string;
    IsShowMenu: boolean;
    Name: string;
    Description: string;
    Price: number;
    Waiting: number;
    SnapId: string;
    TapsiId: string;
    SrcImage: string;
  }[] = [];
}

export class ReadMenuProductDetailViewModel extends BaseReadViewModel {
  CategoryId: string = "";
  CategoryName: string = "";
  IsShowMenu: boolean = false;
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

export class ReadSearchMenuDetailViewModel extends BaseReadViewModel {
  IsShowMenu: boolean = false;
  Name: string = "";
  Description: string = "";
  Price: number = 0;
  Waiting: number = 0;
  SnapId: string = "";
  TapsiId: string = "";
  SrcImage: string = "";
}

export class CreateMenuCategoryViewModel extends BaseCreateViewModel {}

export class UpdateMenuCategoryViewModel extends BaseUpdateViewModel {}

export class DeleteMenuCategoryViewModel extends BaseDeleteViewModel {}

export class CreateMenuProductViewModel extends BaseCreateViewModel {}

export class UpdateMenuProductViewModel extends BaseUpdateViewModel {}

export class DeleteMenuProductViewModel extends BaseDeleteViewModel {}

export class ReadEconomicPackageListViewModel extends BaseReadViewModel {
  IsShowMenu: boolean = false;
  SrcImage: string = "";
  Title: string = "";
  StartDate: string = "";
  EndDate: string = "";
  Price: number = 0;
  EconomicPackageItems: {
    Id: string;
    Count: number;
    IsShowMenu: boolean;
    Name: string;
    Price: number;
    SrcImage: string;
  }[] = [];
}

export class ReadEconomicPackageDetailViewModel extends BaseReadViewModel {
  IsShowMenu: boolean = false;
  SrcImage: string = "";
  Title: string = "";
  StartDate: string = "";
  EndDate: string = "";
  Price: number = 0;
  EconomicPackageItems: {
    Id: string;
    ProductId: string;
    Count: number;
    IsShowMenu: boolean;
    Name: string;
    Price: number;
    SrcImage: string;
  }[] = [];
}

export class CreateEconomicPackageViewModel extends BaseCreateViewModel {}

export class UpdateEconomicPackageViewModel extends BaseUpdateViewModel {}

export class DeleteEconomicPackageViewModel extends BaseDeleteViewModel {}

export class CreateContentEconomicPackageViewModel extends BaseCreateViewModel {}

export class DeleteContentEconomicPackageViewModel extends BaseDeleteViewModel {}
