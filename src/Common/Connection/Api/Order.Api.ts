import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiOrder {
  static async fetchTables(): Promise<{ table_id: string; table: number }[]> {
    const res = await fetch(ERoute.HOST + ERoute.GET_TABLES, {
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

  static async fetchOrderPanel(): Promise<TIdPresentOrdersTable> {
    const res = await fetch(ERoute.HOST + ERoute.GET_ORDER_TABLES, {
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

  static async fetchOrderTablePanel({
    table_id,
  }: {
    table_id: string;
  }): Promise<TIdPresentOrderTable> {
    const res = await fetch(
      ERoute.HOST + ERoute.GET_ORDER_TABLES + `/${table_id}`,
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

  static async fetchOrderTable({
    table_id,
    list_order,
  }: {
    table_id: string;
    list_order: { count: number; product_id: string }[];
  }): Promise<{ submit: boolean }> {
    const res = await fetch(ERoute.HOST + ERoute.ORDER_TABLE + `/${table_id}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
      body: JSON.stringify({ list_order }),
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchCreateTable({
    table_number,
    access_token,
  }: {
    table_number: number;
    access_token: string;
  }): Promise<{ create: boolean; table_id: string }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.CREATE_TABLE + `/${table_number}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteTable({
    table_id,
    access_token,
  }: {
    table_id: string;
    access_token: string;
  }): Promise<{ delete: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.DELETE_TABLE + `/${table_id}?${query}`,
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

  static async fetchStatusTable({
    table_id,
    access_token,
  }: {
    table_id: string;
    access_token: string;
  }): Promise<{ can_order: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.GET_STATUS_TABLE + `/${table_id}?${query}`,
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

  static async fetchAcceptStatusTable({
    table_id,
    access_token,
  }: {
    table_id: string;
    access_token: string;
  }): Promise<{ delete: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ACCEPT_STATUS_TABLE + `/${table_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteStatusTable({
    table_id,
    access_token,
  }: {
    table_id: string;
    access_token: string;
  }): Promise<{ delete: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.DELETE_STATUS_TABLE + `/${table_id}?${query}`,
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

  static async fetchEditableStatusTable({
    table_id,
    access_token,
  }: {
    table_id: string;
    access_token: string;
  }): Promise<{ change: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.EDITABLE_STATUS_TABLE + `/${table_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchGetEconomicPackage({
    access_token,
  }: {
    access_token: string;
  }): Promise<TGetEconomicPackage> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.GET_ECONOMIC_PACKAGES + `/?${query}`,
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

  static async fetchGetEconomicPackages({
    all,
  }: {
    all?: string | undefined;
  }): Promise<TGetEconomicPackages> {
    let url = ERoute.HOST + ERoute.GET_ECONOMIC_PACKAGES;
    if (all) {
      url += "?all=" + all;
    }
    const res = await fetch(url, {
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

  static async fetchAddEconomicPackage({
    economic_package,
    access_token,
  }: {
    economic_package: TEconomicPackage;
    access_token: string;
  }): Promise<TGetEconomicPackage> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ADD_ECONOMIC_PACKAGE + `/?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
        body: JSON.stringify({ ...economic_package }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchUpdateEconomicPackage({
    economic_package,
    access_token,
    economic_package_id,
  }: {
    economic_package: TEconomicPackage;
    access_token: string;
    economic_package_id: string;
  }): Promise<{ change: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST +
        ERoute.UPDATE_ECONOMIC_PACKAGE +
        `/${economic_package_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({ ...economic_package }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteEconomicPackage({
    economic_package_id,
    access_token,
  }: {
    economic_package_id: string;
    access_token: string;
  }): Promise<{ change: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST +
        ERoute.DELETE_ECONOMIC_PACKAGE +
        `/${economic_package_id}?${query}`,
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

  static async fetchAddContentEconomicPackage({
    economic_package_id,
    product_id,
    access_token,
    count,
  }: {
    economic_package_id: string;
    product_id: string;
    count: number;
    access_token: string;
  }): Promise<{
    content_economic_package_id: string;
    count: number;
    productMenu: TIdProductMenu;
  }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ADD_CONTENT_ECONOMIC_PACKAGE + `/?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
        body: JSON.stringify({ economic_package_id, product_id, count }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteContentEconomicPackage({
    content_economic_package_id,
    access_token,
  }: {
    content_economic_package_id: string;
    access_token: string;
  }): Promise<{ change: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST +
        ERoute.DELETE_CONTENT_ECONOMIC_PACKAGE +
        `/${content_economic_package_id}?${query}`,
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

  static async fetchGetOrders({
    access_token,
    start_day,
    end_day,
    pay_status,
  }: {
    access_token: string;
    start_day?: string;
    end_day?: string;
    pay_status?: boolean;
  }): Promise<TGetFactors> {
    let query = `token=${access_token}`;
    start_day && (query += `&start_day=${start_day}`);
    end_day && (query += `&end_day=${end_day}`);
    pay_status !== undefined && (query += `&pay_status=${pay_status}`);
    const res = await fetch(ERoute.HOST + ERoute.ORDER + `/?${query}`, {
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

  static async fetchGetOrder({
    order_id,
    access_token,
  }: {
    order_id: string;
    access_token: string;
  }): Promise<TGetFactor> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ORDER + `/${order_id}?${query}`,
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

  static async fetchCreateOrder({
    access_token,
  }: {
    access_token: string;
  }): Promise<TFactor & { factor_id: string }> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.ORDER + `/?${query}`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      cache: "no-store",
      method: EMethodRequest.POST,
    });
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteOrder({
    access_token,
    order_id,
  }: {
    access_token: string;
    order_id: string;
  }): Promise<TFactor> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ORDER + `/${order_id}?${query}`,
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

  static async fetchUpdateOrder({
    order_id,
    access_token,
    customer_mobile,
    factor_number,
    location,
    pay_status,
    tax,
  }: {
    order_id: string;
    access_token: string;
  } & Omit<TFactor, "update_at" | "create_at" | "factor_items">): Promise<{
    update: boolean;
  }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ORDER + `/${order_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({
          customer_mobile,
          factor_number,
          location,
          pay_status,
          tax,
        }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchCreateOrderItem({
    access_token,
    order_id,
  }: {
    access_token: string;
    order_id: string;
  }): Promise<TGetFactorItem> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ORDER_ITEM + `/${order_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteOrderItem({
    access_token,
    order_item_id,
  }: {
    access_token: string;
    order_item_id: string;
  }): Promise<TFactor> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ORDER_ITEM + `/${order_item_id}?${query}`,
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

  static async fetchUpdateOrderItem({
    order_item_id,
    access_token,
    product_count,
    product_discount,
    product_name,
    product_price,
  }: {
    order_item_id: string;
    access_token: string;
  } & TFactorItem): Promise<{ update: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ORDER_ITEM + `/${order_item_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({
          product_count,
          product_discount,
          product_name,
          product_price,
        }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }
}
