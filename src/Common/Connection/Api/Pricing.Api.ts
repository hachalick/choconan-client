import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { BaseApi } from "./SeedWork/Base.Api";
import { ApiBuilder } from "./SeedWork/Builder.Api";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiPricing extends BaseApi {
  constructor() {
    super("/pricing");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiPricing());
  }

  static async fetchGetAllUnitPricing({
    access_token,
  }: TGetUnitPricingDto): Promise<Array<TGetUnitPricingResponseDto>> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.GET_UNIT)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetUnitPricingResponseDto>>();
  }

  static async fetchCreateUnitPricing({
    access_token,
    unit_name,
  }: TCreateUnitPricingDto): Promise<TCreateUnitPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.CREATE_UNIT)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("unit_name", unit_name)
      .fetch<TCreateUnitPricingResponseDto>();
  }

  static async fetchDeleteUnitPricing({
    access_token,
    unit_id,
  }: TDeleteUnitPricingDto): Promise<TDeleteUnitPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_UNIT}/${unit_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteUnitPricingResponseDto>();
  }

  static async fetchGetAllProductPricing({
    access_token,
  }: TGetAllProductPricingDto): Promise<TGetAllProductPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.GET_PRODUCT_PRICING)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<TGetAllProductPricingResponseDto>();
  }

  static async fetchCreateProductPricing({
    access_token,
    buy,
    name,
  }: TCreateProductPricingDto): Promise<TCreateProductPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.CREATE_PRODUCT_PRICING)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("buy", buy)
      .bodyParam("name", name)
      .fetch<TCreateProductPricingResponseDto>();
  }

  static async fetchUpdateProductPricing({
    access_token,
    product_pricing_id,
    buy,
    name,
  }: TUpdateProductPricingDto): Promise<TUpdateProductPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.UPDATE_PRODUCT_PRICING}/${product_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("buy", buy)
      .bodyParam("name", name)
      .fetch<TUpdateProductPricingResponseDto>();
  }

  static async fetchDeleteProductPricing({
    access_token,
    product_pricing_id,
  }: TDeleteProductPricingDto): Promise<TDeleteProductPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_PRODUCT_PRICING}/${product_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .fetch<TDeleteProductPricingResponseDto>();
  }

  static async fetchCreateProductUnitPricing({
    access_token,
    product_menu_id,
    product_pricing_id,
    ratio,
    unit_id,
  }: TCreateProductUnitPricingDto): Promise<TCreateProductUnitPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.CREATE_PRODUCT_PRICING)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("product_menu_id", product_menu_id)
      .bodyParam("product_pricing_id", product_pricing_id)
      .bodyParam("ratio", ratio)
      .bodyParam("unit_id", unit_id)
      .fetch<TCreateProductUnitPricingResponseDto>();
  }

  static async fetchUpdateProductUnitPricing({
    access_token,
    product_unit_pricing_id,
    ratio,
  }: TUpdateProductUnitPricingDto) {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.UPDATE_PRODUCT_PRICING)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("product_unit_pricing_id", product_unit_pricing_id)
      .bodyParam("ratio", ratio)
      .fetch<TCreateProductUnitPricingResponseDto>();
  }

  static async fetchDeleteProductUnitPricing({
    access_token,
    product_unit_pricing_id,
  }: TDeleteProductUnitPricingDto) {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_PRODUCT_PRICING_UNIT}/${product_unit_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteProductPricingResponseDto>();
  }

  static async fetchCreateDetailProductUnitPricing({
    access_token,
    amount,
    child_product_unit_id,
    parent_product_unit_id,
  }: TCreateDetailProductUnitPricingDto): Promise<TCreateDetailProductUnitPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.CREATE_DETAIL_PRODUCT_PRICING_UNIT)
      .header("access_token", access_token)
      .bodyParam("amount", amount)
      .bodyParam("child_product_unit_id", child_product_unit_id)
      .bodyParam("parent_product_unit_id", parent_product_unit_id)
      .method(EMethodRequest.POST)
      .fetch<TCreateDetailProductUnitPricingResponseDto>();
  }

  static async fetchUpdateDetailProductUnitPricing({
    access_token,
    amount,
    detail_product_unit_pricing_id,
  }: TUpdateDetailProductUnitPricingDto): Promise<TUpdateDetailProductUnitPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(
        `${ERoute.UPDATE_DETAIL_PRODUCT_PRICING_UNIT}/${detail_product_unit_pricing_id}`
      )
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("amount", amount)
      .fetch<TUpdateDetailProductUnitPricingResponseDto>();
  }

  static async fetchDeleteDetailProductUnitPricing({
    access_token,
    detail_product_unit_pricing_id,
  }: TDeleteDetailProductUnitPricingDto) {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(
        `${ERoute.DELETE_DETAIL_PRODUCT_PRICING_UNIT}/${detail_product_unit_pricing_id}`
      )
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteDetailProductUnitPricingResponseDto>();
  }

  static async fetchCreateCostPricing({
    access_token,
    name,
    price,
  }: TCreateCostPricingDto): Promise<TCreateCostPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.CREATE_COST_PRODUCT_PRICING_UNIT)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("name", name)
      .bodyParam("price", price)
      .fetch<TCreateCostPricingResponseDto>();
  }

  static async fetchUpdateCostPricing({
    access_token,
    cost_pricing_id,
    name,
    price,
  }: TUpdateCostPricingDto): Promise<TUpdateCostPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.UPDATE_COST_PRODUCT_PRICING_UNIT}/${cost_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("name", name)
      .bodyParam("price", price)
      .fetch<TUpdateCostPricingResponseDto>();
  }

  static async fetchDeleteCostPricing({
    access_token,
    cost_pricing_id,
  }: TDeleteCostPricingDto): Promise<TDeleteCostPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_COST_PRODUCT_PRICING_UNIT}/${cost_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteCostPricingResponseDto>();
  }
}
