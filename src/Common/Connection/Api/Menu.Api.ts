import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import { BaseApi } from "./Seed/Base.Api";
import { ApiBuilder } from "./Seed/Builder.Api";
import {
  CreateContentEconomicPackageViewModel,
  CreateEconomicPackageViewModel,
  CreateMenuCategoryViewModel,
  CreateMenuProductViewModel,
  DeleteContentEconomicPackageViewModel,
  DeleteEconomicPackageViewModel,
  DeleteMenuCategoryViewModel,
  DeleteMenuProductViewModel,
  ReadEconomicPackageDetailViewModel,
  ReadEconomicPackageListViewModel,
  ReadMenuCategoryDetailViewModel,
  ReadMenuDetailViewModel,
  ReadMenuProductDetailViewModel,
  ReadSearchMenuDetailViewModel,
  UpdateEconomicPackageViewModel,
  UpdateMenuCategoryViewModel,
  UpdateMenuProductViewModel,
} from "./ViewModels/Menu.Service.ViewModel";
import {
  CreateContentEconomicPackageModel,
  CreateEconomicPackageModel,
  CreateMenuCategoryModel,
  CreateMenuProductModel,
  DeleteContentEconomicPackageModel,
  DeleteEconomicPackageModel,
  DeleteMenuCategoryModel,
  DeleteMenuProductModel,
  ReadEconomicPackageDetailModel,
  ReadEconomicPackageListModel,
  ReadMenuCategoryDetailModel,
  ReadMenuDetailModel,
  ReadMenuProductDetailModel,
  ReadSearchMenuDetailModel,
  UpdateEconomicPackageModel,
  UpdateMenuCategoryModel,
  UpdateMenuProductModel,
} from "./Models/Menu.Service.Model";
import { BaseAuthModel } from "./Models/Seed/Base.Service.Model";

export class ApiMenu extends BaseApi {
  constructor() {
    super("/menu");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiMenu());
  }

  static async ReadSearchMenuDetail(
    Param: ReadSearchMenuDetailModel,
  ): Promise<Array<ReadSearchMenuDetailViewModel>> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_SEARCH}?Text=${encodeURI(Param.Text)}`)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadSearchMenuDetailViewModel>>();
  }

  static async ReadMenuDetail(
    Param: ReadMenuDetailModel,
  ): Promise<Array<ReadMenuDetailViewModel>> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(EServerRoute.MENU)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadMenuDetailViewModel>>();
  }

  static async ReadMenuCategoryDetail(
    Param: ReadMenuCategoryDetailModel,
  ): Promise<ReadMenuCategoryDetailViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_CATEGORY}/${Param.Id}`)
      .method(EMethodRequest.GET)
      .fetch<ReadMenuCategoryDetailViewModel>();
  }

  static async ReadMenuProductDetail(
    Param: ReadMenuProductDetailModel,
  ): Promise<ReadMenuProductDetailViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_PRODUCT}/${Param.Id}`)
      .method(EMethodRequest.GET)
      .fetch<ReadMenuProductDetailViewModel>();
  }

  static async CreateMenuCategory(
    Param: CreateMenuCategoryModel & BaseAuthModel,
  ): Promise<CreateMenuCategoryViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(EServerRoute.MENU_CATEGORY)
      .method(EMethodRequest.POST)
      .header("access_token", Param.AccessToken)
      .bodyParam("Description", Param.Description)
      .bodyParam("Icon", Param.Icon)
      .bodyParam("IsShowMenu", Param.IsShowMenu)
      .bodyParam("Name", Param.Name)
      .bodyParam("MetaDescription", Param.MetaDescription)
      .bodyParam("MetaTitle", Param.MetaTitle)
      .fetch<CreateMenuCategoryViewModel>();
  }

  static async UpdateMenuCategory(
    Param: UpdateMenuCategoryModel & BaseAuthModel,
  ): Promise<UpdateMenuCategoryViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_CATEGORY}/${Param.Id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", Param.AccessToken)
      .bodyParam("Icon", Param.Icon)
      .bodyParam("IsShowMenu", Param.IsShowMenu)
      .bodyParam("Name", Param.Name)
      .bodyParam("Description", Param.Description)
      .bodyParam("MetaTitle", Param.MetaTitle)
      .bodyParam("MetaDescription", Param.MetaDescription)
      .fetch<UpdateMenuCategoryViewModel>();
  }

  static async DeleteMenuCategory(
    Param: DeleteMenuCategoryModel & BaseAuthModel,
  ): Promise<DeleteMenuCategoryViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .header("access_token", Param.AccessToken)
      .route(`${EServerRoute.MENU_CATEGORY}/${Param.Id}`)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteMenuCategoryViewModel>();
  }

  static async CreateMenuProduct(
    Param: CreateMenuProductModel & BaseAuthModel,
  ): Promise<CreateMenuProductViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_PRODUCT}/${Param.CategoryId}`)
      .method(EMethodRequest.POST)
      .header("access_token", Param.AccessToken)
      .bodyParam("IsShowMenu", Param.IsShowMenu)
      .bodyParam("Name", Param.Name)
      .bodyParam("Description", Param.Description)
      .bodyParam("MetaTitle", Param.MetaTitle)
      .bodyParam("MetaDescription", Param.MetaDescription)
      .bodyParam("Price", Param.Price)
      .bodyParam("SrcImage", Param.SrcImage)
      .bodyParam("Waiting", Param.Waiting)
      .bodyParam("SnapId", Param.SnapId)
      .bodyParam("TapsiId", Param.TapsiId)
      .fetch<CreateMenuProductViewModel>();
  }

  static async UpdateMenuProduct(
    Param: UpdateMenuProductModel & BaseAuthModel,
  ): Promise<UpdateMenuProductViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_PRODUCT}/${Param.Id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", Param.AccessToken)
      .bodyParam("CategoryId", Param.CategoryId)
      .bodyParam("IsShowMenu", Param.IsShowMenu)
      .bodyParam("Name", Param.Name)
      .bodyParam("Description", Param.Description)
      .bodyParam("MetaTitle", Param.MetaTitle)
      .bodyParam("MetaDescription", Param.MetaDescription)
      .bodyParam("SrcImage", Param.SrcImage)
      .bodyParam("Waiting", Param.Waiting)
      .bodyParam("Price", Param.Price)
      .bodyParam("SnapId", Param.SnapId)
      .bodyParam("TapsiId", Param.TapsiId)
      .fetch<UpdateMenuProductViewModel>();
  }

  static async DeleteMenuProduct(
    Param: DeleteMenuProductModel & BaseAuthModel,
  ): Promise<DeleteMenuProductViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_PRODUCT}/${Param.Id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", Param.AccessToken)
      .fetch<DeleteMenuProductViewModel>();
  }

  static async ReadEconomicPackageList(
    Param: ReadEconomicPackageListModel,
  ): Promise<Array<ReadEconomicPackageListViewModel>> {
    const fetchRes = ApiMenu.builder()
      .cache("no-store")
      .route(EServerRoute.MENU_ECONOMIC_PACKAGE)
      .method(EMethodRequest.GET);

    Param.IsActiveNow !== undefined &&
      fetchRes.param("IsActiveNow", Param.IsActiveNow);

    return await fetchRes.fetch<Array<ReadEconomicPackageListViewModel>>();
  }

  static async ReadEconomicPackageDetail(
    Param: ReadEconomicPackageDetailModel,
  ): Promise<ReadEconomicPackageDetailViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_ECONOMIC_PACKAGE}/${Param.Id}`)
      .method(EMethodRequest.GET)
      .fetch<ReadEconomicPackageDetailViewModel>();
  }

  static async CreateEconomicPackage(
    Param: CreateEconomicPackageModel & BaseAuthModel,
  ): Promise<CreateEconomicPackageViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(EServerRoute.MENU_ECONOMIC_PACKAGE)
      .method(EMethodRequest.POST)
      .header("access_token", Param.AccessToken)
      .bodyParam("Title", Param.Title)
      .bodyParam("SrcImage", Param.SrcImage)
      .bodyParam("IsShowMenu", Param.IsShowMenu)
      .bodyParam("StartDate", Param.StartDate)
      .bodyParam("EndDate", Param.EndDate)
      .bodyParam("Price", Param.Price)
      .fetch<CreateEconomicPackageViewModel>();
  }

  static async UpdateEconomicPackage(
    Param: UpdateEconomicPackageModel & BaseAuthModel,
  ): Promise<UpdateEconomicPackageViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_ECONOMIC_PACKAGE}/${Param.Id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", Param.AccessToken)
      .bodyParam("Title", Param.Title)
      .bodyParam("SrcImage", Param.SrcImage)
      .bodyParam("IsShowMenu", Param.IsShowMenu)
      .bodyParam("StartDate", Param.StartDate)
      .bodyParam("EndDate", Param.EndDate)
      .bodyParam("Price", Param.Price)
      .fetch<UpdateEconomicPackageViewModel>();
  }

  static async DeleteEconomicPackage(
    Param: DeleteEconomicPackageModel & BaseAuthModel,
  ): Promise<DeleteEconomicPackageViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${EServerRoute.MENU_ECONOMIC_PACKAGE}/${Param.Id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", Param.AccessToken)
      .fetch<DeleteEconomicPackageViewModel>();
  }

  static async CreateContentEconomicPackage(
    Param: CreateContentEconomicPackageModel & BaseAuthModel,
  ): Promise<CreateContentEconomicPackageViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(EServerRoute.MENU_CONTENT_ECONOMIC_PACKAGE)
      .method(EMethodRequest.POST)
      .header("access_token", Param.AccessToken)
      .bodyParam("EconomicPackageId", Param.EconomicPackageId)
      .bodyParam("ProductId", Param.ProductId)
      .bodyParam("Count", Param.Count)
      .fetch<CreateContentEconomicPackageViewModel>();
  }

  static async DeleteContentEconomicPackage(
    Param: DeleteContentEconomicPackageModel & BaseAuthModel,
  ): Promise<DeleteContentEconomicPackageViewModel> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(EServerRoute.MENU_CONTENT_ECONOMIC_PACKAGE)
      .method(EMethodRequest.DELETE)
      .header("access_token", Param.AccessToken)
      .bodyParam("EconomicPackageId", Param.EconomicPackageId)
      .bodyParam("ProductId", Param.ProductId)
      .bodyParam("Count", Param.Count)
      .fetch<DeleteContentEconomicPackageViewModel>();
  }
}
