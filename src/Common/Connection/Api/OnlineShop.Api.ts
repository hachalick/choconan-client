import { EServerRoute } from "@/Common/Enums/ServerRout";
import { BaseApi } from "./Seed/Base.Api";
import { ApiBuilder } from "./Seed/Builder.Api";
import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import {
  ReadMenuSnapFoodViewModel,
  ReadMenuTapsiFoodViewModel,
} from "./ViewModels/Service.Service.ViewModel";

export class ApiOnlineShop extends BaseApi {
  constructor() {
    super("/service/crawler");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiOnlineShop());
  }

  static async ReadMenuSnapFood(): Promise<ReadMenuSnapFoodViewModel> {
    return await ApiOnlineShop.builder()
      .cache("no-store")
      .route(EServerRoute.SERVICE_MENU_SNAP_FOOD)
      .method(EMethodRequest.GET)
      .fetch<ReadMenuSnapFoodViewModel>();
  }

  static async ReadMenuTapsiFood(): Promise<ReadMenuTapsiFoodViewModel> {
    return await ApiOnlineShop.builder()
      .cache("no-store")
      .route(EServerRoute.SERVICE_MENU_TAPSI_FOOD)
      .method(EMethodRequest.GET)
      .fetch<ReadMenuTapsiFoodViewModel>();
  }
}
