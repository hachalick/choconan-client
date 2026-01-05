import { ERoute } from "@/Common/Enums/Routs";
import { BaseApi } from "./SeedWork/Base.Api";
import { ApiBuilder } from "./SeedWork/Builder.Api";
import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";

export class ApiOnlineShop extends BaseApi {
  constructor() {
    super("/service/crawler");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiOnlineShop());
  }

  static async fetchCrawlerSnap(): Promise<TGetOnlineShopSnapResponseDto> {
    return await ApiOnlineShop.builder()
      .cache("no-store")
      .route(ERoute.GET_CRAWLER_MENU_SNAP_FOOD)
      .method(EMethodRequest.GET)
      .fetch<TGetOnlineShopSnapResponseDto>();
  }

  static async fetchCrawlerTapsi(): Promise<TGetOnlineShopTapsiResponseDto> {
    return await ApiOnlineShop.builder()
      .cache("no-store")
      .route(ERoute.GET_CRAWLER_MENU_TAPSI_FOOD)
      .method(EMethodRequest.GET)
      .fetch<TGetOnlineShopSnapResponseDto>();
  }
}
