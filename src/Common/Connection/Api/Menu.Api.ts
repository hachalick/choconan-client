import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";
import { BaseApi } from "./SeedWork/Base.Api";
import { ApiBuilder } from "./SeedWork/Builder.Api";

export class ApiMenu extends BaseApi {
  constructor() {
    super("/menu");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiMenu());
  }

  static async fetchSearch({
    query,
  }: TGetProductMenuSearchDto): Promise<
    Array<TGetProductMenuSearchResponseDto>
  > {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.SEARCH_ON_MENU}/${encodeURI(query)}`)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetProductMenuSearchResponseDto>>();
  }

  static async fetchAllProductMenu(): Promise<
    Array<TGetCategoryMenuResponseDto>
  > {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(ERoute.GET_FULL_MENU)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetCategoryMenuResponseDto>>();
  }

  static async fetchCategoryMenu({
    category_name,
  }: GetCategoryMenuDto): Promise<TGetCategoryMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.GET_FULL_MENU}/${encodeURI(category_name)}`)
      .method(EMethodRequest.GET)
      .fetch<TGetCategoryMenuResponseDto>();
  }

  static async fetchProductMenu({
    category_name,
    product_id,
  }: TGetProductMenuDto): Promise<TGetProductMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(
        `${ERoute.GET_FULL_MENU}/${encodeURI(category_name)}/${product_id}`
      )
      .method(EMethodRequest.GET)
      .fetch<TGetProductMenuResponseDto>();
  }

  static async fetchCreateCategoryMenu({
    category,
    icon,
    access_token,
  }: TCreateCategoryMenuDto): Promise<TCreateProductMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(ERoute.ADD_CATEGORY_MENU)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .bodyParam("category", category)
      .bodyParam("icon", icon)
      .fetch<TCreateProductMenuResponseDto>();
  }

  static async fetchUpdateCategoryMenu({
    category_id,
    category,
    icon,
    access_token,
  }: TUpdateCategoryMenuDto): Promise<TUpdateCategoryMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.UPDATE_CATEGORY_MENU}/${category_id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", access_token)
      .bodyParam("category", category)
      .bodyParam("icon", icon)
      .fetch<TUpdateCategoryMenuResponseDto>();
  }

  static async fetchDeleteCategoryMenu({
    category_id,
    access_token,
  }: TDeleteCategoryMenuDto): Promise<TDeleteCategoryMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_CATEGORY_MENU}/${category_id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", access_token)
      .fetch<TDeleteCategoryMenuResponseDto>();
  }

  static async fetchCreateProductMenu({
    category_id,
    id,
    available,
    price,
    waiting,
    description,
    meta_description,
    meta_title,
    name,
    src,
    access_token,
    snap,
    tapsi,
  }: TCreateProductMenuDto): Promise<TCreateProductMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.ADD_PRODUCT_MENU}/${category_id}`)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .bodyParam("id", id)
      .bodyParam("available", available)
      .bodyParam("price", price)
      .bodyParam("waiting", waiting)
      .bodyParam("description", description)
      .bodyParam("meta_description", meta_description)
      .bodyParam("meta_title", meta_title)
      .bodyParam("name", name)
      .bodyParam("src", src)
      .bodyParam("snap", snap)
      .bodyParam("tapsi", tapsi)
      .fetch<TCreateProductMenuResponseDto>();
  }

  static async fetchUpdateProductMenu({
    product_id,
    id,
    available,
    price,
    waiting,
    description,
    meta_description,
    meta_title,
    name,
    src,
    access_token,
    snap,
    tapsi,
  }: TUpdateProductMenuDto): Promise<TUpdateProductMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.UPDATE_PRODUCT_MENU}/${product_id}`)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .bodyParam("id", id)
      .bodyParam("available", available)
      .bodyParam("price", price)
      .bodyParam("waiting", waiting)
      .bodyParam("description", description)
      .bodyParam("meta_description", meta_description)
      .bodyParam("meta_title", meta_title)
      .bodyParam("name", name)
      .bodyParam("src", src)
      .bodyParam("snap", snap)
      .bodyParam("tapsi", tapsi)
      .fetch<TUpdateProductMenuResponseDto>();
  }

  static async fetchDeleteProductMenu({
    product_id,
    access_token,
  }: TDeleteProductMenuDto): Promise<TDeleteProductMenuResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_PRODUCT_MENU}/${product_id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", access_token)
      .fetch<TDeleteProductMenuResponseDto>();
  }
  static async fetchGetEconomicPackage({
    access_token,
  }: TGetEconomicPackageDto): Promise<TGetEconomicPackageResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(ERoute.DELETE_STATUS_TABLE)
      .method(EMethodRequest.GET)
      .header("access_token", access_token)
      .fetch<TGetEconomicPackageResponseDto>();
  }

  static async fetchGetEconomicPackages({
    all,
  }: TGetEconomicPackagesDto): Promise<Array<TGetEconomicPackageResponseDto>> {
    return all
      ? await ApiMenu.builder()
          .cache("no-store")
          .route(ERoute.GET_ECONOMIC_PACKAGES)
          .method(EMethodRequest.GET)
          .param("all", all)
          .fetch<Array<TGetEconomicPackageResponseDto>>()
      : await ApiMenu.builder()
          .cache("no-store")
          .route(ERoute.GET_ECONOMIC_PACKAGES)
          .method(EMethodRequest.GET)
          .fetch<Array<TGetEconomicPackageResponseDto>>();
  }

  static async fetchAddEconomicPackage({
    access_token,
    end_day,
    end_hours,
    is_active,
    price,
    src,
    start_day,
    start_hours,
    title,
  }: TCreateEconomicPackageDto): Promise<TGetEconomicPackageResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(ERoute.ADD_ECONOMIC_PACKAGE)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .bodyParam("end_day", end_day)
      .bodyParam("end_hours", end_hours)
      .bodyParam("is_active", is_active)
      .bodyParam("price", price)
      .bodyParam("src", src)
      .bodyParam("start_day", start_day)
      .bodyParam("start_hours", start_hours)
      .bodyParam("title", title)
      .fetch<TGetEconomicPackageResponseDto>();
  }

  static async fetchUpdateEconomicPackage({
    access_token,
    economic_package_id,
    end_day,
    end_hours,
    is_active,
    price,
    src,
    start_day,
    start_hours,
    title,
  }: TUpdateEconomicPackageDto): Promise<TUpdateEconomicPackageResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.UPDATE_ECONOMIC_PACKAGE}/${economic_package_id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", access_token)
      .bodyParam("end_day", end_day)
      .bodyParam("end_hours", end_hours)
      .bodyParam("is_active", is_active)
      .bodyParam("price", price)
      .bodyParam("src", src)
      .bodyParam("start_day", start_day)
      .bodyParam("start_hours", start_hours)
      .bodyParam("title", title)
      .fetch<TUpdateEconomicPackageResponseDto>();
  }

  static async fetchDeleteEconomicPackage({
    economic_package_id,
    access_token,
  }: TDeleteEconomicPackageDto): Promise<TDeleteEconomicPackageResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_ECONOMIC_PACKAGE}/${economic_package_id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", access_token)
      .fetch<TDeleteEconomicPackageResponseDto>();
  }

  static async fetchAddContentEconomicPackage({
    economic_package_id,
    product_id,
    access_token,
    count,
  }: TCreateContentEconomicPackageDto): Promise<TCreateContentEconomicPackageResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(ERoute.ADD_CONTENT_ECONOMIC_PACKAGE)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .bodyParam("economic_package_id", economic_package_id)
      .bodyParam("product_id", product_id)
      .bodyParam("count", count)
      .fetch<TCreateContentEconomicPackageResponseDto>();
  }

  static async fetchDeleteContentEconomicPackage({
    content_economic_package_id,
    access_token,
  }: TDeleteContentEconomicPackageDto): Promise<TDeleteContentEconomicPackageResponseDto> {
    return await ApiMenu.builder()
      .cache("no-store")
      .route(
        `${ERoute.DELETE_CONTENT_ECONOMIC_PACKAGE}/${content_economic_package_id}`
      )
      .method(EMethodRequest.DELETE)
      .header("access_token", access_token)
      .fetch<TDeleteContentEconomicPackageResponseDto>();
  }
}
