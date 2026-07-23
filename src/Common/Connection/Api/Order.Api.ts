import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import { ApiBuilder } from "./Seed/Builder.Api";
import { BaseApi } from "./Seed/Base.Api";
import {
  AcceptStatusTableViewModel,
  CreateOrderItemViewModel,
  CreateOrderTableViewModel,
  CreateOrderViewModel,
  CreateTableViewModel,
  DeleteOrderItemViewModel,
  DeleteOrderViewModel,
  DeleteStatusTableViewModel,
  DeleteTableViewModel,
  ReadOrderDetailViewModel,
  ReadOrderListViewModel,
  ReadOrderMonthlyListViewModel,
  ReadOrderTableDetailViewModel,
  ReadOrderTableListViewModel,
  ReadStatusTableViewModel,
  ReadTableListViewModel,
  UpdateOrderItemViewModel,
  UpdateOrderViewModel,
  UpdatePayStatusOrderViewModel,
} from "./ViewModels/Order.Service.ViewModel";
import {
  AcceptStatusTableModel,
  CreateOrderItemModel,
  CreateOrderModel,
  CreateOrderTableModel,
  CreateTableModel,
  DeleteOrderItemModel,
  DeleteOrderModel,
  DeleteStatusTableModel,
  DeleteTableModel,
  ReadOrderDetailModel,
  ReadOrderListModel,
  ReadOrderMonthlyListModel,
  ReadOrderTableDetailModel,
  ReadOrderTableListModel,
  ReadStatusTableModel,
  ReadTableListModel,
  UpdateOrderItemModel,
  UpdateOrderModel,
  UpdatePayStatusOrderModel,
} from "./Models/Order.Service.Model";
import { BaseAuthModel } from "./Models/Seed/Base.Service.Model";

export class ApiOrder extends BaseApi {
  constructor() {
    super("/order");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiOrder());
  }

  static async ReadTableList(
    Param: ReadTableListModel,
  ): Promise<Array<ReadTableListViewModel>> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(EServerRoute.ORDER_TABLE)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadTableListViewModel>>();
  }

  static async CreateTable(
    Param: CreateTableModel & BaseAuthModel,
  ): Promise<CreateTableViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_TABLE}/${encodeURI(Param.Location)}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.POST)
      .fetch<CreateTableViewModel>();
  }

  static async DeleteTable(
    Param: DeleteTableModel & BaseAuthModel,
  ): Promise<DeleteTableViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_TABLE}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteTableViewModel>();
  }

  static async ReadStatusTable(
    Param: ReadStatusTableModel,
  ): Promise<ReadStatusTableViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_STATUS_TABLE}/${Param.Id}`)
      .method(EMethodRequest.GET)
      .fetch<ReadStatusTableViewModel>();
  }

  static async AcceptStatusTable(
    Param: AcceptStatusTableModel & BaseAuthModel,
  ): Promise<AcceptStatusTableViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_STATUS_TABLE}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.PUT)
      .fetch<AcceptStatusTableViewModel>();
  }

  static async DeleteStatusTable(
    Param: DeleteStatusTableModel & BaseAuthModel,
  ): Promise<DeleteStatusTableViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_STATUS_TABLE}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.PUT)
      .fetch<DeleteStatusTableViewModel>();
  }

  static async ReadOrderTableList(
    Param: ReadOrderTableListModel & BaseAuthModel,
  ): Promise<Array<ReadOrderTableListViewModel>> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(EServerRoute.ORDER_ORDER_TABLE)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadOrderTableListViewModel>>();
  }

  static async ReadOrderTableDetail(
    Param: ReadOrderTableDetailModel & BaseAuthModel,
  ): Promise<ReadOrderTableDetailViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_TABLE}/${Param.AccessToken}`)
      .method(EMethodRequest.GET)
      .fetch<ReadOrderTableDetailViewModel>();
  }

  static async CreateOrderTable(
    Param: CreateOrderTableModel,
  ): Promise<CreateOrderTableViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_TABLE}/${Param.Id}`)
      .bodyParam("Orders", Param.Orders)
      .method(EMethodRequest.POST)
      .fetch<CreateOrderTableViewModel>();
  }

  static async ReadOrderList(
    Param: ReadOrderListModel &
      BaseAuthModel & {
        StartDay?: string;
        EndDay?: string;
        IsPay?: boolean;
      },
  ): Promise<Array<ReadOrderListViewModel>> {
    const fetchRes = ApiOrder.builder()
      .cache("no-store")
      .route(EServerRoute.ORDER_ORDER)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET);

    Param.StartDay !== undefined && fetchRes.param("StartDay", Param.StartDay);
    Param.EndDay !== undefined && fetchRes.param("EndDay", Param.EndDay);
    Param.IsPay !== undefined && fetchRes.param("IsPay", Param.IsPay);

    return fetchRes.fetch<Array<ReadOrderListViewModel>>();
  }

  static async ReadOrderMonthlyList(
    Param: ReadOrderMonthlyListModel & BaseAuthModel,
  ): Promise<Array<ReadOrderMonthlyListViewModel>> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(EServerRoute.ORDER_ORDER_MONTHLY)
      .header("access_token", Param.AccessToken)
      .param("Count", Param.Count)
      .param("Space", Param.Space)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadOrderMonthlyListViewModel>>();
  }

  static async ReadOrderDetail(
    Param: ReadOrderDetailModel & BaseAuthModel,
  ): Promise<ReadOrderDetailViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_ORDER}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<ReadOrderDetailViewModel>();
  }

  static async CreateOrder(
    Param: CreateOrderModel & BaseAuthModel,
  ): Promise<CreateOrderViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(EServerRoute.ORDER_ORDER)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.POST)
      .fetch<CreateOrderViewModel>();
  }

  static async UpdateOrder(
    Param: UpdateOrderModel & BaseAuthModel,
  ): Promise<UpdateOrderViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_ORDER}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("CustomerMobile", Param.CustomerMobile)
      .bodyParam("FactorDate", Param.FactorDate)
      .bodyParam("FactorNumber", Param.FactorNumber)
      .bodyParam("IsPay", Param.IsPay)
      .bodyParam("Location", Param.Location)
      .bodyParam("Tax", Param.Tax)
      .method(EMethodRequest.PUT)
      .fetch<UpdateOrderViewModel>();
  }

  static async UpdatePayStatusOrder(
    Param: UpdatePayStatusOrderModel & BaseAuthModel,
  ): Promise<UpdatePayStatusOrderViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_ORDER_PAY_STATUS}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .param("IsPay", Param.IsPay)
      .method(EMethodRequest.PUT)
      .fetch<UpdatePayStatusOrderViewModel>();
  }

  static async DeleteOrder(
    Param: DeleteOrderModel & BaseAuthModel,
  ): Promise<DeleteOrderViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_ORDER}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteOrderViewModel>();
  }

  static async CreateOrderItem(
    Param: CreateOrderItemModel & BaseAuthModel,
  ): Promise<CreateOrderItemViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_ORDER_ITEM}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.POST)
      .fetch<CreateOrderItemViewModel>();
  }

  static async UpdateOrderItem(
    Param: UpdateOrderItemModel & BaseAuthModel,
  ): Promise<UpdateOrderItemViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_ORDER_ITEM}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("ProductName", Param.ProductName)
      .bodyParam("ProductPrice", Param.ProductPrice)
      .bodyParam("ProductCount", Param.ProductCount)
      .bodyParam("ProductDiscount", Param.ProductDiscount)
      .method(EMethodRequest.PUT)
      .fetch<UpdateOrderItemViewModel>();
  }

  static async DeleteOrderItem(
    Param: DeleteOrderItemModel & BaseAuthModel,
  ): Promise<DeleteOrderItemViewModel> {
    return await ApiOrder.builder()
      .cache("no-store")
      .route(`${EServerRoute.ORDER_ORDER_ITEM}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteOrderItemViewModel>();
  }
}
