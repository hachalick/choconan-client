import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { BaseApi } from "./Seed/Base.Api";
import { ApiBuilder } from "./Seed/Builder.Api";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import {
  CreateRefreshTokenViewModel,
  LoginUserOtpViewModel,
  LoginUserPasswordViewModel,
  UpdatePasswordUserViewModel,
} from "./ViewModels/Auth.Service.ViewModel";
import {
  CreateRefreshTokenModel,
  LoginUserOtpModel,
  LoginUserPasswordModel,
  UpdatePasswordUserModel,
} from "./Models/Auth.Service.Model";

export class ApiAuth extends BaseApi {
  constructor() {
    super("/auth");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiAuth());
  }

  static async LoginUserPassword(
    Param: LoginUserPasswordModel,
  ): Promise<LoginUserPasswordViewModel> {
    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.POST)
      .route(EServerRoute.AUTH_LOGIN_PASSWORD)
      .bodyParam("NationalCode", Param.NationalCode)
      .bodyParam("Phone", Param.Phone)
      .bodyParam("Password", Param.Password)
      .fetch<LoginUserPasswordViewModel>();
  }

  static async LoginUserOtp(
    Param: LoginUserOtpModel,
  ): Promise<LoginUserOtpViewModel> {
    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.POST)
      .route(EServerRoute.AUTH_LOGIN_OTP)
      .bodyParam("NationalCode", Param.NationalCode)
      .bodyParam("Phone", Param.Phone)
      .bodyParam("Otp", Param.Otp)
      .fetch<LoginUserOtpViewModel>();
  }

  static async UpdatePasswordUser(
    Param: UpdatePasswordUserModel,
  ): Promise<UpdatePasswordUserViewModel> {
    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.PUT)
      .route(EServerRoute.AUTH_UPDATE_PASSWORD)
      .header("access_token", Param.AccessToken)
      .bodyParam("Password", Param.Password)
      .fetch<UpdatePasswordUserViewModel>();
  }

  static async CreateRefreshToken(
    Param: CreateRefreshTokenModel,
  ): Promise<CreateRefreshTokenViewModel> {
    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.PUT)
      .route(`${EServerRoute.AUTH_REFRESH_TOKEN}`)
      .bodyParam("RefreshToken", Param.RefreshToken)
      .fetch<CreateRefreshTokenViewModel>();
  }
}
