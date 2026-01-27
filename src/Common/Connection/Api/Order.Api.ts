import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";
import { ApiBuilder } from "./SeedWork/Builder.Api";
import { BaseApi } from "./SeedWork/Base.Api";

export class ApiOrder extends BaseApi {
  constructor() {
    super("/order");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiOrder());
  }

  static async fetchTables(): Promise<Array<TGetTableOrderResponseDto>> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(ERoute.TABLE)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetTableOrderResponseDto>>();
  }

  static async fetchOrderPanel(): Promise<
    Array<TGetFactorPresentOrderTableResponseDto>
  > {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(ERoute.ORDER_TABLES)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetFactorPresentOrderTableResponseDto>>();
  }

  static async fetchOrderTablePanel({
    table_id,
  }: TGetFactorPresentOrderTableDto): Promise<TGetFactorPresentOrderTableResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER_TABLES}/${table_id}`)
      .method(EMethodRequest.GET)
      .fetch<TGetFactorPresentOrderTableResponseDto>();
  }

  static async fetchOrderTable({
    table_id,
    list_order,
  }: TCreateOrderTableDto): Promise<TCreateOrderTableResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.TABLE}/${table_id}`)
      .method(EMethodRequest.POST)
      .bodyParam("list_order", list_order)
      .fetch<TCreateOrderTableResponseDto>();
  }

  static async fetchCreateTable({
    table_number,
    access_token,
  }: TCreateTableDto): Promise<TCreateTableResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.TABLE}/${table_number}`)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .fetch<TCreateTableResponseDto>();
  }

  static async fetchDeleteTable({
    table_id,
    access_token,
  }: TDeleteTableDto): Promise<TDeleteTableDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.TABLE}/${table_id}`)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .fetch<TDeleteTableDto>();
  }

  static async fetchStatusTable({
    table_id,
    access_token,
  }: TGetStatusTableDto): Promise<TGetStatusTableResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.STATUS_TABLE}/${table_id}`)
      .method(EMethodRequest.GET)
      .header("access_token", access_token)
      .fetch<TGetStatusTableResponseDto>();
  }

  static async fetchAcceptStatusTable({
    table_id,
    access_token,
  }: TCreateAcceptStatusTableOrderDto): Promise<TCreateAcceptStatusTableOrderResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ACCEPT_STATUS_TABLE}/${table_id}`)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .fetch<TCreateAcceptStatusTableOrderResponseDto>();
  }

  static async fetchDeleteStatusTable({
    table_id,
    access_token,
  }: TCreateDeleteStatusTableOrderDto): Promise<TCreateDeleteStatusTableOrderResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.STATUS_TABLE}/${table_id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", access_token)
      .fetch<TCreateDeleteStatusTableOrderResponseDto>();
  }

  static async fetchGetOrders({
    access_token,
    start_day,
    end_day,
    pay_status,
  }: TGetOrdersDto): Promise<Array<TGetFactorResponseDto>> {
    let fetchRes = ApiOrder.builder()
      .cache("no-store")
      .route(ERoute.ORDER)
      .method(EMethodRequest.GET)
      .header("access_token", access_token);

    start_day !== undefined && fetchRes.param("start_day", start_day);
    end_day !== undefined && fetchRes.param("end_day", end_day);
    pay_status !== undefined && fetchRes.param("pay_status", pay_status);

    return fetchRes.fetch<Array<TGetFactorResponseDto>>();
  }

  static async fetchGetOrder({
    order_id,
    access_token,
  }: TGetOrderDto): Promise<TGetFactorResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER}/${order_id}`)
      .method(EMethodRequest.GET)
      .header("access_token", access_token)
      .fetch<TGetFactorResponseDto>();
  }

  static async fetchCreateOrder({
    access_token,
  }: TCreateOrderDto): Promise<TCreateFactorResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(ERoute.ORDER)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .fetch<TCreateFactorResponseDto>();
  }

  static async fetchDeleteOrder({
    access_token,
    order_id,
  }: TDeleteFactorDto): Promise<TDeleteFactorResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER}/${order_id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", access_token)
      .fetch<TDeleteFactorResponseDto>();
  }

  static async fetchUpdateOrder({
    access_token,
    customer_mobile,
    factor_number,
    location,
    pay_status,
    tax,
    factor_id,
  }: TUpdateFactorDto): Promise<TUpdateFactorResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER}/${factor_id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", access_token)
      .bodyParam("pay_status", pay_status)
      .bodyParam("customer_mobile", customer_mobile)
      .bodyParam("location", location)
      .bodyParam("factor_number", factor_number)
      .bodyParam("tax", tax)
      .fetch<TUpdateFactorResponseDto>();
  }

  static async fetchUpdatePayStatusOrder({
    order_id,
    access_token,
    pay_status,
  }: {
    order_id: string;
    access_token: string;
    pay_status: boolean;
  }): Promise<TUpdatePayStatusOrderResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER_PAY_STATUS}/${order_id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", access_token)
      .bodyParam("pay_status", pay_status)
      .fetch<TUpdatePayStatusOrderResponseDto>();
  }

  static async fetchReportMonthlyOrder({
    access_token,
  }: TGetReportMonthlyOrderDto): Promise<
    Array<TGetReportMonthlyOrderResponseDto>
  > {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(ERoute.ORDER_MONTHLY)
      .method(EMethodRequest.GET)
      .header("access_token", access_token)
      .fetch<Array<TGetReportMonthlyOrderResponseDto>>();
  }

  static async fetchCreateOrderItem({
    access_token,
    factor_id,
  }: CreateFactorItemDto): Promise<TCreateFactorItemResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER_ITEM}/${factor_id}`)
      .method(EMethodRequest.POST)
      .header("access_token", access_token)
      .fetch<TCreateFactorItemResponseDto>();
  }

  static async fetchDeleteOrderItem({
    access_token,
    order_item_id,
  }: TDeleteOrderItemResponseDto): Promise<TGetFactorResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER_ITEM}/${order_item_id}`)
      .method(EMethodRequest.DELETE)
      .header("access_token", access_token)
      .fetch<TGetFactorResponseDto>();
  }

  static async fetchUpdateOrderItem({
    order_item_id,
    access_token,
    product_count,
    product_discount,
    product_name,
    product_price,
  }: TUpdateFactorItemResponseDto): Promise<TUpdateOrderItemResponseDto> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${ERoute.ORDER_ITEM}/${order_item_id}`)
      .method(EMethodRequest.PUT)
      .header("access_token", access_token)
      .bodyParam("product_count", product_count)
      .bodyParam("product_discount", product_discount)
      .bodyParam("product_name", product_name)
      .bodyParam("product_price", product_price)
      .fetch<TUpdateOrderItemResponseDto>();
  }
}
