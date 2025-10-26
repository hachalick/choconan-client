import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiAuth {
  static async fetchLoginOtp({
    national_code,
    phone,
    otp,
  }: TLoginOtp): Promise<TLogin> {
    const res = await fetch(ERoute.HOST + ERoute.LOGIN_OTP, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
      body: JSON.stringify({ national_code, phone, otp }),
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchLoginPassword({
    national_code,
    password,
    phone,
  }: TLoginPassword): Promise<{ login: boolean }> {
    const res = await fetch(ERoute.HOST + ERoute.LOGIN_PASSWORD, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
      body: JSON.stringify({ national_code, password, phone }),
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchUpdatePassword({
    access_token,
    new_password,
    old_password,
  }: {
    old_password: string;
    new_password: string;
    access_token: string;
  }): Promise<{ update: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.UPDATE_PASSWORD + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({ new_password, old_password }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchRefreshToken({
    refresh_token,
  }: {
    refresh_token: string;
  }): Promise<TRefresh> {
    const res = await fetch(
      ERoute.HOST + ERoute.REFRESH_TOKEN + `/${refresh_token}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.GET,
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }
}
