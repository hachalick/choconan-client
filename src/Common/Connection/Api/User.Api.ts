import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import { ApiBuilder } from "./Seed/Builder.Api";
import { BaseApi } from "./Seed/Base.Api";
import {
  CreateDashboardCapabilityUserModel,
  CreateRoleModel,
  CreateRoleUserModel,
  CreateUserModel,
  DeleteDashboardCapabilityUserModel,
  DeleteRoleModel,
  DeleteUserModel,
  ReadAccountDetailModel,
  ReadDashboardCapabilityListModel,
  ReadRoleDetailModel,
  ReadRoleListModel,
  ReadUserDetailModel,
  ReadUserListModel,
  UpdateRoleModel,
  UpdateUserModel,
  UpdateUserProfileModel,
} from "./Models/User.Service.Model";
import { BaseAuthModel } from "./Models/Seed/Base.Service.Model";
import {
  CreateDashboardCapabilityUserViewModel,
  CreateUserViewModel,
  DeleteDashboardCapabilityUserViewModel,
  DeleteRoleViewModel,
  DeleteUserViewModel,
  ReadAccountDetailViewModel,
  ReadDashboardCapabilityListViewModel,
  ReadRoleDetailViewModel,
  ReadRoleListViewModel,
  ReadUserDetailViewModel,
  ReadUserListViewModel,
  UpdateRoleViewModel,
  UpdateUserProfileViewModel,
  UpdateUserViewModel,
} from "./ViewModels/User.Service.ViewModel";

export class ApiUser extends BaseApi {
  constructor() {
    super("/user");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiUser());
  }

  static async ReadUserList(
    Param: ReadUserListModel & BaseAuthModel,
  ): Promise<Array<ReadUserListViewModel>> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_USER)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadUserListViewModel>>();
  }

  static async ReadUserDetail(
    Param: ReadUserDetailModel & BaseAuthModel,
  ): Promise<ReadUserDetailViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${EServerRoute.USER_USER}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<ReadUserDetailViewModel>();
  }

  static async ReadAccountDetail(
    Param: ReadAccountDetailModel,
  ): Promise<ReadAccountDetailViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_ACCOUNT)
      .header("access_token", Param.Token)
      .method(EMethodRequest.GET)
      .fetch<ReadAccountDetailViewModel>();
  }

  static async UpdateUserProfile(
    Param: UpdateUserProfileModel & BaseAuthModel,
  ): Promise<UpdateUserProfileViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_ACCOUNT)
      .header("access_token", Param.AccessToken)
      .bodyParam("Name", Param.Name)
      .bodyParam("Family", Param.Family)
      .method(EMethodRequest.PUT)
      .fetch<UpdateUserProfileViewModel>();
  }

  static async CreateUser(
    Param: CreateUserModel & BaseAuthModel,
  ): Promise<CreateUserViewModel> {
    const fetchRes = ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_USER)
      .header("access_token", Param.AccessToken)
      .bodyParam("NationalCode", Param.NationalCode)
      .bodyParam("Phone", Param.Phone)
      .method(EMethodRequest.POST);

    Param.Name !== undefined && fetchRes.bodyParam("Name", Param.Name);
    Param.Family !== undefined && fetchRes.bodyParam("Family", Param.Family);

    return fetchRes.fetch<CreateUserViewModel>();
  }

  static async UpdateUser(
    Param: UpdateUserModel & BaseAuthModel,
  ): Promise<UpdateUserViewModel> {
    const fetchRes = ApiUser.builder()
      .cache("no-store")
      .route(`${EServerRoute.USER_USER}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("NationalCode", Param.NationalCode)
      .bodyParam("Phone", Param.Phone)
      .bodyParam("Profile", Param.Profile)
      .method(EMethodRequest.POST);

    Param.Name !== undefined && fetchRes.bodyParam("Name", Param.Name);
    Param.Family !== undefined && fetchRes.bodyParam("Family", Param.Family);

    return fetchRes.fetch<UpdateUserViewModel>();
  }

  static async DeleteUser(
    Param: DeleteUserModel & BaseAuthModel,
  ): Promise<DeleteUserViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${EServerRoute.USER_USER}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteUserViewModel>();
  }

  static async ReadDashboardCapabilityList(
    Param: ReadDashboardCapabilityListModel & BaseAuthModel,
  ): Promise<Array<ReadDashboardCapabilityListViewModel>> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_DASHBOARD_CAPABILITY)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadDashboardCapabilityListViewModel>>();
  }

  static async CreateDashboardCapabilityUser(
    Param: CreateDashboardCapabilityUserModel & BaseAuthModel,
  ): Promise<CreateDashboardCapabilityUserViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_DASHBOARD_CAPABILITY_USER)
      .header("access_token", Param.AccessToken)
      .bodyParam("UserId", Param.UserId)
      .bodyParam("DashboardCapabilityId", Param.DashboardCapabilityId)
      .method(EMethodRequest.POST)
      .fetch<CreateDashboardCapabilityUserViewModel>();
  }

  static async DeleteDashboardCapabilityUser(
    Param: DeleteDashboardCapabilityUserModel & BaseAuthModel,
  ): Promise<DeleteDashboardCapabilityUserViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_DASHBOARD_CAPABILITY_USER)
      .header("access_token", Param.AccessToken)
      .bodyParam("UserId", Param.UserId)
      .bodyParam("DashboardCapabilityId", Param.DashboardCapabilityId)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteDashboardCapabilityUserViewModel>();
  }

  static async ReadRoleList(
    Param: ReadRoleListModel & BaseAuthModel,
  ): Promise<Array<ReadRoleListViewModel>> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_ROLE)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<Array<ReadRoleListViewModel>>();
  }

  static async ReadRoleDetail(
    Param: ReadRoleDetailModel & BaseAuthModel,
  ): Promise<ReadRoleDetailViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${EServerRoute.USER_ROLE}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.GET)
      .fetch<ReadRoleDetailViewModel>();
  }

  static async CreateRole(
    Param: CreateRoleModel & BaseAuthModel,
  ): Promise<CreateRoleUserModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(EServerRoute.USER_ROLE)
      .header("access_token", Param.AccessToken)
      .bodyParam("Name", Param.Name)
      .method(EMethodRequest.POST)
      .fetch<CreateRoleUserModel>();
  }

  static async UpdateRole(
    Param: UpdateRoleModel & BaseAuthModel,
  ): Promise<UpdateRoleViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${EServerRoute.USER_ROLE}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .bodyParam("Name", Param.Name)
      .method(EMethodRequest.PUT)
      .fetch<UpdateRoleViewModel>();
  }

  static async DeleteRole(
    Param: DeleteRoleModel & BaseAuthModel,
  ): Promise<DeleteRoleViewModel> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${EServerRoute.USER_ROLE}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteRoleViewModel>();
  }
}
