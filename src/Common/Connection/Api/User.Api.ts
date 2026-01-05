import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";
import { ApiBuilder } from "./SeedWork/Builder.Api";
import { BaseApi } from "./SeedWork/Base.Api";

export class ApiUser extends BaseApi {
  constructor() {
    super("/user");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiUser());
  }

  static async fetchGetAccount({
    access_token,
  }: TGetAccountDto): Promise<TGetProfileResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.GET_ACCOUNT)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<TGetProfileResponseDto>();
  }

  static async fetchUpdateProfile({
    name,
    family,
    access_token,
  }: TUpdateProfileDto): Promise<TUpdateProfileResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.UPDATE_ACCOUNT)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("name", name)
      .bodyParam("family", family)
      .fetch<TUpdateProfileResponseDto>();
  }

  static async fetchGetUser({
    access_token,
  }: TGetUsersDto): Promise<Array<TGetUserAccessResponseDto>> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.GET_USER)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetUserAccessResponseDto>>();
  }

  static async fetchGetUserById({
    access_token,
    user_id,
  }: TGetUserDto): Promise<TGetUserAccessResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${ERoute.GET_USER}/${user_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<TGetUserAccessResponseDto>();
  }

  static async fetchCreateUser({
    access_token,
    national_code,
    phone,
    name,
    family,
  }: TCreateUserAccessDto): Promise<TCreateUserResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.CREATE_USER)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("family", family)
      .bodyParam("name", name)
      .bodyParam("national_code", national_code)
      .bodyParam("phone", phone)
      .fetch<TCreateUserResponseDto>();
  }

  static async fetchUpdateUser({
    access_token,
    user_id,
    family,
    name,
    national_code,
    phone,
  }: TUpdateUserDto): Promise<TUpdateUserResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${ERoute.UPDATE_USER}/${user_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("family", family)
      .bodyParam("name", name)
      .bodyParam("national_code", national_code)
      .bodyParam("phone", phone)
      .fetch<TUpdateUserResponseDto>();
  }

  static async fetchDeleteUser({
    access_token,
    user_id,
  }: TDeleteUserDto): Promise<TDeleteUserResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_USER}/${user_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteUserResponseDto>();
  }

  static async fetchGetDashboardCapability({
    access_token,
  }: TGetDashboardCapabilityDto): Promise<Array<string>> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.GET_DASHBOARD_CAPABILITY_USER)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<Array<string>>();
  }

  static async fetchCreateDashboardCapabilityToUser({
    access_token,
    dashboard_capability,
    user_id,
  }: TCreateDashboardCapabilityToUserDto): Promise<TDeleteDashboardCapabilityToUserResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.CREATE_DASHBOARD_CAPABILITY_USER)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("user_id", user_id)
      .bodyParam("dashboard_capability", dashboard_capability)
      .fetch<TDeleteDashboardCapabilityToUserResponseDto>();
  }

  static async fetchDeleteDashboardCapabilityToUser({
    access_token,
    dashboard_capability,
    user_id,
  }: TDeleteDashboardCapabilityToUserDto): Promise<TDeleteDashboardCapabilityToUserResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.DELETE_DASHBOARD_CAPABILITY_USER)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .bodyParam("user_id", user_id)
      .bodyParam("dashboard_capability", dashboard_capability)
      .fetch<TDeleteDashboardCapabilityToUserResponseDto>();
  }

  static async fetchGetRoleAccess({
    access_token,
  }: TGetRoleAccessDto): Promise<Array<TGetRoleAccessResponseDto>> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.GET_ROLE)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetRoleAccessResponseDto>>();
  }

  static async fetchGetRoleAccessById({
    access_token,
    role_id,
  }: TGetRolesAccessDto): Promise<TGetRoleAccessResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${ERoute.GET_ROLE}/${role_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<TGetRoleAccessResponseDto>();
  }

  static async fetchCreateRole({
    access_token,
    role_name,
  }: TCreateRoleDto): Promise<TCreateRoleResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.CREATE_ROLE)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .bodyParam("role_name", role_name)
      .fetch<TCreateRoleResponseDto>();
  }

  static async fetchUpdateRole({
    access_token,
    role_id,
    role_name,
  }: TUpdateRoleDto): Promise<TUpdateRoleResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${ERoute.UPDATE_ROLE}/${role_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.PUT)
      .bodyParam("role_name", role_name)
      .fetch<TUpdateRoleResponseDto>();
  }

  static async fetchDeleteRole({
    access_token,
    role_id,
  }: TDeleteRoleDto): Promise<TDeleteRoleResponseDto> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(`${ERoute.DELETE_ROLE}/${role_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteRoleResponseDto>();
  }

  static async fetchGetUsersAccess({
    access_token,
  }: TGetUsersAccessDto): Promise<Array<TGetUserAccessResponseDto>> {
    return await ApiUser.builder()
      .cache("no-store")
      .route(ERoute.GET_ACCESS)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetUserAccessResponseDto>>();
  }
}
