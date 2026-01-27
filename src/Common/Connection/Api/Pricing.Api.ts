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
      .route(ERoute.UNIT)
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
      .route(ERoute.UNIT)
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
      .route(`${ERoute.UNIT}/${unit_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteUnitPricingResponseDto>();
  }

  static async fetchGetAllProductPricing({
    access_token,
  }: TGetAllProductPricingDto): Promise<TGetAllProductPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.PRODUCT)
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
      .route(ERoute.PRODUCT)
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
      .route(`${ERoute.PRODUCT}/${product_pricing_id}`)
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
      .route(`${ERoute.PRODUCT}/${product_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteProductPricingResponseDto>();
  }

  static async fetchCreateProductUnitPricing({
    access_token,
    product_menu_id,
    product_pricing_id,
    ratio,
    unit_id,
    profit,
  }: TCreateProductUnitPricingDto): Promise<TCreateProductUnitPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(ERoute.UNIT_PRODUCT)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("product_menu_id", product_menu_id)
      .bodyParam("product_pricing_id", product_pricing_id)
      .bodyParam("ratio", ratio)
      .bodyParam("unit_id", unit_id)
      .bodyParam("profit", profit)
      .fetch<TCreateProductUnitPricingResponseDto>();
  }

  static async fetchUpdateProductUnitPricing({
    access_token,
    product_unit_pricing_id,
    product_menu_id,
    ratio,
    profit,
    unit_id,
  }: TUpdateProductUnitPricingDto) {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.UNIT_PRODUCT}/${product_unit_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("product_menu_id", product_menu_id)
      .bodyParam("ratio", ratio)
      .bodyParam("profit", profit)
      .bodyParam("unit_id", unit_id)
      .fetch<TCreateProductUnitPricingResponseDto>();
  }

  static async fetchDeleteProductUnitPricing({
    access_token,
    product_unit_pricing_id,
  }: TDeleteProductUnitPricingDto) {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.UNIT_PRODUCT}/${product_unit_pricing_id}`)
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
      .route(ERoute.DETAIL_PRODUCT_UNIT)
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
    product_unit_id,
  }: TUpdateDetailProductUnitPricingDto): Promise<TUpdateDetailProductUnitPricingResponseDto> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.DETAIL_PRODUCT_UNIT}/${detail_product_unit_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("amount", amount)
      .bodyParam("product_unit_id", product_unit_id)
      .fetch<TUpdateDetailProductUnitPricingResponseDto>();
  }

  static async fetchDeleteDetailProductUnitPricing({
    access_token,
    detail_product_unit_pricing_id,
  }: TDeleteDetailProductUnitPricingDto) {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${ERoute.DETAIL_PRODUCT_UNIT}/${detail_product_unit_pricing_id}`)
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
      .route(ERoute.COST)
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
      .route(`${ERoute.COST}/${cost_pricing_id}`)
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
      .route(`${ERoute.COST}/${cost_pricing_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteCostPricingResponseDto>();
  }
}
