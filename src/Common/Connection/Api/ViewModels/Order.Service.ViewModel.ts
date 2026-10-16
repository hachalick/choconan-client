import {
  BaseCreateViewModel,
  BaseDeleteViewModel,
  BaseEmitViewModel,
  BaseReadViewModel,
  BaseUpdateViewModel,
} from "./Seed/Base.Service.ViewModel";

export class ReadTableListViewModel extends BaseReadViewModel {
  Location: string = "";
}

export class ReadTableDetailViewModel extends BaseReadViewModel {
  Table: number = 0;
}

export class CreateTableViewModel extends BaseCreateViewModel {}

export class UpdateTableViewModel extends BaseUpdateViewModel {}

export class DeleteTableViewModel extends BaseDeleteViewModel {}

export class ReadStatusTableViewModel {
  IsBusy: boolean = false;
}

export class AcceptStatusTableViewModel {
  Accept: boolean = false;
}

export class DeleteStatusTableViewModel extends BaseDeleteViewModel {}

export class ReadOrderTableListViewModel extends BaseReadViewModel {
  Location: string = "";
  IsBusy: boolean = false;
  Items: {
    ProductId: string;
    ProductName: string;
    ProductPrice: number;
    ProductCount: number;
  }[] = [];
}

export class ReadOrderTableDetailViewModel extends BaseReadViewModel {
  Location: string = "";
  IsBusy: boolean = false;
  Items: {
    ProductId: string;
    ProductName: string;
    ProductCount: number;
  }[] = [];
}

export class ReadOrderMonthlyListViewModel {
  Month: string = "";
  TotalFactors: number = 0;
  AverageFactors: number = 0;
  TotalItems: number = 0;
  AverageItems: number = 0;
  TotalPrice: number = 0;
  AveragePrice: number = 0;
}

export class CreateOrderTableViewModel extends BaseCreateViewModel {}

export class ReadOrderAccountListViewModel extends BaseReadViewModel {}

export class ReadOrderDetailViewModel extends BaseReadViewModel {
  CustomerMobile: string = "";
  FactorNumber: number = 0;
  Tax: number = 0;
  Location: string = "";
  IsPay: boolean = false;
  FactorDate: string = "";
  FactorItems: {
    Id: string;
    ProductCount: number;
    ProductDiscount: number;
    ProductName: string;
    ProductPrice: number;
  }[] = [];
}

export class ReadOrderListViewModel extends BaseReadViewModel {
  CustomerMobile: string = "";
  FactorNumber: number = 0;
  Tax: number = 0;
  Location: string = "";
  IsPay: boolean = false;
  FactorDate: string = "";
  FactorItems: {
    Id: string;
    ProductCount: number;
    ProductDiscount: number;
    ProductName: string;
    ProductPrice: number;
  }[] = [];
}

export class CreateOrderViewModel extends BaseCreateViewModel {
  Id: string = "";
  FactorNumber: number = 0;
  CustomerMobile: string = "";
  Tax: number = 0;
  Location: string = "";
  IsPay: boolean = false;
  FactorDate: string = "";
}

export class EmitUpdateOrderViewModel extends BaseEmitViewModel {}

export class UpdateOrderViewModel extends BaseUpdateViewModel {}

export class UpdatePayStatusOrderViewModel extends BaseUpdateViewModel {}

export class DeleteOrderViewModel extends BaseDeleteViewModel {}

export class CreateOrderItemViewModel extends BaseCreateViewModel {
  Id: string = "";
  ProductCount: number = 0;
  ProductDiscount: number = 0;
  ProductName: string = "";
  ProductPrice: number = 0;
}

export class UpdateOrderItemViewModel extends BaseUpdateViewModel {}

export class DeleteOrderItemViewModel extends BaseDeleteViewModel {}
