import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { BaseApi } from "./Seed/Base.Api";
import { ApiBuilder } from "./Seed/Builder.Api";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import {
  CreateCostProductPricingModel,
  CreateDetailProductPricingModel,
  CreateProductPricingModel,
  CreateProductUnitPricingModel,
  CreateUnitPricingModel,
  DeleteCostProductPricingModel,
  DeleteDetailProductPricingModel,
  DeleteProductPricingModel,
  DeleteProductUnitPricingModel,
  DeleteUnitPricingModel,
  ReadCostProductPricingDetailModel,
  ReadCostProductPricingListModel,
  ReadProductPricingListModel,
  ReadUnitPricingDetailModel,
  ReadUnitPricingListModel,
  UpdateCostProductPricingModel,
  UpdateDetailProductPricingModel,
  UpdateProductPricingModel,
  UpdateProductUnitPricingModel,
  UpdateUnitPricingModel,
} from "./Models/Pricing.Service.Model";
import { BaseAuthModel } from "./Models/Seed/Base.Service.Model";
import {
  CreateCostProductPricingViewModel,
  CreateDetailProductPricingViewModel,
  CreateProductPricingViewModel,
  CreateProductUnitPricingViewModel,
  CreateUnitPricingViewModel,
  DeleteCostProductPricingViewModel,
  DeleteDetailProductPricingViewModel,
  DeleteProductPricingViewModel,
  DeleteProductUnitPricingViewModel,
  DeleteUnitPricingViewModel,
  ReadCostProductPricingDetailViewModel,
  ReadCostProductPricingListViewModel,
  ReadProductPricingListViewModel,
  ReadUnitPricingDetailViewModel,
  ReadUnitPricingListViewModel,
  UpdateCostProductPricingViewModel,
  UpdateDetailProductPricingViewModel,
  UpdateProductPricingViewModel,
  UpdateProductUnitPricingViewModel,
  UpdateUnitPricingViewModel,
} from "./ViewModels/Pricing.Service.ViewModel";

export class ApiPricing extends BaseApi {
  constructor() {
    super("/pricing");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiPricing());
  }

  static async ReadUnitPricingList(
    Param: ReadUnitPricingListModel & BaseAuthModel,
  ): Promise<Array<ReadUnitPricingListViewModel>> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_UNIT)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadUnitPricingListViewModel>>();
  }

  static async ReadUnitPricingDetail(
    Param: ReadUnitPricingDetailModel & BaseAuthModel,
  ): Promise<ReadUnitPricingDetailViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_UNIT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<ReadUnitPricingDetailViewModel>();
  }

  static async CreateUnitPricing(
    Param: CreateUnitPricingModel & BaseAuthModel,
  ): Promise<CreateUnitPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_UNIT)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.POST)
      .bodyParam("Name", Param.Name)
      .fetch<CreateUnitPricingViewModel>();
  }

  static async UpdateUnitPricing(
    Param: UpdateUnitPricingModel & BaseAuthModel,
  ): Promise<UpdateUnitPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_UNIT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.PUT)
      .bodyParam("Name", Param.Name)
      .fetch<UpdateUnitPricingViewModel>();
  }

  static async DeleteUnitPricing(
    Param: DeleteUnitPricingModel & BaseAuthModel,
  ): Promise<DeleteUnitPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_UNIT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteUnitPricingViewModel>();
  }

  static async ReadProductPricingList(
    Param: ReadProductPricingListModel & BaseAuthModel,
  ): Promise<ReadProductPricingListViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_PRODUCT)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<ReadProductPricingListViewModel>();
  }

  static async CreateProductPricing(
    Param: CreateProductPricingModel & BaseAuthModel,
  ): Promise<CreateProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_PRODUCT)
      .header("access_token", Param.AccessToken)
      .bodyParam("Buy", Param.Buy)
      .bodyParam("Name", Param.Name)
      .method(EMethodRequest.POST)
      .fetch<CreateProductPricingViewModel>();
  }

  static async UpdateProductPricing(
    Param: UpdateProductPricingModel & BaseAuthModel,
  ): Promise<UpdateProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_PRODUCT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("Buy", Param.Buy)
      .bodyParam("Name", Param.Name)
      .method(EMethodRequest.PUT)
      .fetch<UpdateProductPricingViewModel>();
  }

  static async DeleteProductPricing(
    Param: DeleteProductPricingModel & BaseAuthModel,
  ): Promise<DeleteProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_PRODUCT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteProductPricingViewModel>();
  }

  static async CreateProductUnitPricing(
    Param: CreateProductUnitPricingModel & BaseAuthModel,
  ): Promise<CreateProductUnitPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_UNIT_PRODUCT)
      .header("access_token", Param.AccessToken)
      .bodyParam("ProductPricingId", Param.ProductPricingId)
      .bodyParam("UnitPricingId", Param.UnitPricingId)
      .bodyParam("Ratio", Param.Ratio)
      .bodyParam("ProductMenuId", Param.ProductMenuId)
      .bodyParam("Profit", Param.Profit)
      .method(EMethodRequest.POST)
      .fetch<CreateProductUnitPricingViewModel>();
  }

  static async UpdateProductUnitPricing(
    Param: UpdateProductUnitPricingModel & BaseAuthModel,
  ): Promise<UpdateProductUnitPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_UNIT_PRODUCT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("UnitPricingId", Param.UnitPricingId)
      .bodyParam("Ratio", Param.Ratio)
      .bodyParam("ProductMenuId", Param.ProductMenuId)
      .bodyParam("Profit", Param.Profit)
      .method(EMethodRequest.PUT)
      .fetch<UpdateProductUnitPricingViewModel>();
  }

  static async DeleteProductUnitPricing(
    Param: DeleteProductUnitPricingModel & BaseAuthModel,
  ): Promise<DeleteProductUnitPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_UNIT_PRODUCT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteProductUnitPricingViewModel>();
  }

  static async CreateDetailProductPricing(
    Param: CreateDetailProductPricingModel & BaseAuthModel,
  ): Promise<CreateDetailProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_DETAIL_PRODUCT_UNIT)
      .header("access_token", Param.AccessToken)
      .bodyParam("Amount", Param.Amount)
      .bodyParam("ChildProductUnitId", Param.ChildProductUnitDetailId)
      .bodyParam("ParentProductUnitId", Param.ParentProductUnitDetailId)
      .method(EMethodRequest.POST)
      .fetch<CreateDetailProductPricingViewModel>();
  }

  static async UpdateDetailProductPricing(
    Param: UpdateDetailProductPricingModel & BaseAuthModel,
  ): Promise<UpdateDetailProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_DETAIL_PRODUCT_UNIT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("Amount", Param.Amount)
      .bodyParam("ChildProductUnitDetailId", Param.ChildProductUnitDetailId)
      .method(EMethodRequest.PUT)
      .fetch<UpdateDetailProductPricingViewModel>();
  }

  static async DeleteDetailProductPricing(
    Param: DeleteDetailProductPricingModel & BaseAuthModel,
  ): Promise<DeleteDetailProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_DETAIL_PRODUCT_UNIT}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteDetailProductPricingViewModel>();
  }

  static async ReadCostProductPricingList(
    Param: ReadCostProductPricingListModel & BaseAuthModel,
  ): Promise<ReadCostProductPricingListViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_COST)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<ReadCostProductPricingListViewModel>();
  }

  static async ReadCostProductPricingDetail(
    Param: ReadCostProductPricingDetailModel & BaseAuthModel,
  ): Promise<ReadCostProductPricingDetailViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_COST}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<ReadCostProductPricingDetailViewModel>();
  }

  static async CreateCostProductPricing(
    Param: CreateCostProductPricingModel & BaseAuthModel,
  ): Promise<CreateCostProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(EServerRoute.PRICING_COST)
      .header("access_token", Param.AccessToken)
      .bodyParam("Name", Param.Name)
      .bodyParam("Price", Param.Price)
      .method(EMethodRequest.POST)
      .fetch<CreateCostProductPricingViewModel>();
  }

  static async UpdateCostProductPricing(
    Param: UpdateCostProductPricingModel & BaseAuthModel,
  ): Promise<UpdateCostProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_COST}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("Name", Param.Name)
      .bodyParam("Price", Param.Price)
      .method(EMethodRequest.PUT)
      .fetch<UpdateCostProductPricingViewModel>();
  }

  static async DeleteCostProductPricing(
    Param: DeleteCostProductPricingModel & BaseAuthModel,
  ): Promise<DeleteCostProductPricingViewModel> {
    return await ApiPricing.builder()
      .cache("no-store")
      .route(`${EServerRoute.PRICING_COST}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteCostProductPricingViewModel>();
  }
}
