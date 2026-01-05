import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { BaseApi } from "./SeedWork/Base.Api";
import { ApiBuilder } from "./SeedWork/Builder.Api";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiAuth extends BaseApi {
  constructor() {
    super("/auth");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiAuth());
  }

  static async fetchLoginOtp({
    national_code,
    phone,
    otp,
  }: TCreateLoginOtpDto): Promise<TGetLoginOtpResponseDto> {
    console.log(otp, phone, national_code);

    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.POST)
      .route(ERoute.LOGIN_OTP)
      .bodyParam("national_code", national_code)
      .bodyParam("phone", phone)
      .bodyParam("otp", otp)
      .fetch<TGetLoginOtpResponseDto>();
  }

  static async fetchLoginPassword({
    national_code,
    password,
    phone,
  }: TCreateLoginPasswordDto): Promise<TGetLoginPasswordResponseDto> {
    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.POST)
      .route(ERoute.LOGIN_PASSWORD)
      .bodyParam("national_code", national_code)
      .bodyParam("phone", phone)
      .bodyParam("password", password)
      .fetch<TGetLoginPasswordResponseDto>();
  }

  static async fetchUpdatePassword({
    access_token,
    new_password,
    old_password,
  }: TUpdatePasswordDto): Promise<TUpdatePasswordResponseDto> {
    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.PUT)
      .route(ERoute.UPDATE_PASSWORD)
      .header("access_token", access_token)
      .bodyParam("new_password", new_password)
      .bodyParam("old_password", old_password)
      .fetch<TUpdatePasswordResponseDto>();
  }

  static async fetchRefreshToken({
    refresh_token,
  }: TCreateRefreshTokenDto): Promise<TGetRefreshTokenResponseDto> {
    return await ApiAuth.builder()
      .cache("no-store")
      .method(EMethodRequest.GET)
      .route(`${ERoute.REFRESH_TOKEN}/${refresh_token}`)
      .fetch<TGetRefreshTokenResponseDto>();
  }
}
