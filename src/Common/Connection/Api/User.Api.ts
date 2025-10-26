import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiUser {
  static async fetchGetAccount({
    access_token,
  }: {
    access_token: string;
  }): Promise<TProfile> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.GET_ACCOUNT + `?${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchUpdateProfile({
    name,
    family,
    access_token,
  }: {
    name: string;
    family: string;
    access_token: string;
  }): Promise<{ update: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.UPDATE_ACCOUNT + `?${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.PUT,
      body: JSON.stringify({ name, family }),
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchGetUser({
    access_token,
  }: {
    access_token: string;
  }): Promise<TAllUserAccessId> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.GET_USER + `?${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchGetUserById({
    access_token,
    user_id,
  }: {
    access_token: string;
    user_id: string;
  }): Promise<TUserAccessId> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.GET_USER + `/${user_id}` + `?${query}`,
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

  static async fetchCreateUser({
    access_token,
    national_code,
    phone,
    name,
    family,
  }: {
    access_token: string;
    phone: string;
    national_code: string;
    name: string;
    family: string;
  }): Promise<{ create: boolean, user_id: string }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.CREATE_USER + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
        body: JSON.stringify({ national_code, phone, name, family }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchUpdateUser({
    access_token,
    user_id,
    family,
    name,
    national_code,
    phone,
  }: {
    access_token: string;
    user_id: string;
    phone: string;
    national_code: string;
    name: string;
    family: string;
  }): Promise<{ update: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.UPDATE_USER + `/${user_id}` + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({ family, name, national_code, phone }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteUser({
    access_token,
    user_id,
  }: {
    access_token: string;
    user_id: string;
  }): Promise<{ delete: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.DELETE_USER + `/${user_id}` + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.DELETE,
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchGetDashboardCapability({
    access_token,
  }: {
    access_token: string;
  }): Promise<Array<string>> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.GET_DASHBOARD_CAPABILITY_USER + `?${query}`,
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

  static async fetchAddDashboardCapabilityToUser({
    access_token,
    dashboard_capability,
    user_id,
  }: {
    access_token: string;
    user_id: string;
    dashboard_capability: string;
  }): Promise<{ add: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ADD_DASHBOARD_CAPABILITY_USER + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
        body: JSON.stringify({ dashboard_capability, user_id }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchRemoveDashboardCapabilityToUser({
    access_token,
    dashboard_capability,
    user_id,
  }: {
    access_token: string;
    user_id: string;
    dashboard_capability: string;
  }): Promise<{ add: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.REMOVE_DASHBOARD_CAPABILITY_USER + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.DELETE,
        body: JSON.stringify({ dashboard_capability, user_id }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchGetRole({
    access_token,
  }: {
    access_token: string;
  }): Promise<TAllRoleAccessId> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.GET_ROLE + `?${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchGetRoleById({
    access_token,
    role_id,
  }: {
    access_token: string;
    role_id: string;
  }): Promise<TRoleAccessId> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.GET_ROLE + `/${role_id}` + `?${query}`,
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

  static async fetchCreateRole({
    access_token,
    role_name,
  }: {
    access_token: string;
    role_name: string;
  }): Promise<{ create: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.CREATE_ROLE + `?${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
      body: JSON.stringify({ role_name }),
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchUpdateRole({
    access_token,
    role_id,
    role_name,
  }: {
    access_token: string;
    role_id: string;
    role_name: string;
  }): Promise<{ update: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.UPDATE_ROLE + `/${role_id}` + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({ role_name }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteRole({
    access_token,
    role_id,
  }: {
    access_token: string;
    role_id: string;
  }): Promise<{ delete: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.DELETE_ROLE + `/${role_id}` + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.DELETE,
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchGetAccess({
    access_token,
  }: {
    access_token: string;
  }): Promise<TAllUserAccessId> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.GET_ACCESS + `?${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.GET,
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }
}
