import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiMenu {
  static async fetchSearch({
    query,
  }: {
    query: string;
  }): Promise<TIdProductsSearchMenu> {
    const res = await fetch(`${ERoute.HOST}${ERoute.SEARCH_ON_MENU}/${query}`, {
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

  static async fetchAllProductMenu(): Promise<TIdCategoriesMenu> {
    const res = await fetch(ERoute.HOST + ERoute.GET_FULL_MENU, {
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

  static async fetchCategoryMenu({
    category,
  }: {
    category: string;
  }): Promise<TIdCategoryMenu> {
    const res = await fetch(
      ERoute.HOST + ERoute.GET_FULL_MENU + `/${category}`,
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

  static async fetchProductMenu({
    category,
    id,
  }: {
    category: string;
    id: string;
  }): Promise<TIdProductMenu> {
    const res = await fetch(
      ERoute.HOST + ERoute.GET_FULL_MENU + `/${category}/${id}`,
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

  static async fetchCreateCategoryMenu({
    category,
    icon,
    access_token,
  }: {
    category: string;
    icon: string;
    access_token: string;
  }): Promise<{ add: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ADD_CATEGORY_MENU + `?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
        body: JSON.stringify({ category, icon }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchUpdateCategoryMenu({
    category_id,
    category,
    icon,
    access_token,
  }: {
    category_id: string;
    category: string;
    icon: string;
    access_token: string;
  }): Promise<{ update: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.UPDATE_CATEGORY_MENU + `/${category_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({ category, icon }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteCategoryMenu({
    category_id,
    access_token,
  }: {
    category_id: string;
    access_token: string;
  }): Promise<{ delete: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.DELETE_CATEGORY_MENU + `/${category_id}?${query}`,
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
  }: TProductMenu & {
    category_id: string;
    access_token: string;
  }): Promise<{ add: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.ADD_PRODUCT_MENU + `/${category_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.POST,
        body: JSON.stringify({
          id,
          available,
          price,
          waiting,
          description,
          meta_description,
          meta_title,
          name,
          src,
          snap,
          tapsi,
        }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
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
  }: TProductMenu & {
    product_id: string;
    access_token: string;
  }): Promise<{ update: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.UPDATE_PRODUCT_MENU + `/${product_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({
          id,
          available,
          price,
          waiting,
          description,
          meta_description,
          meta_title,
          name,
          src,
          snap,
          tapsi,
        }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }

  static async fetchDeleteProductMenu({
    product_id,
    access_token,
  }: {
    product_id: string;
    access_token: string;
  }): Promise<{ delete: boolean }> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.DELETE_PRODUCT_MENU + `/${product_id}?${query}`,
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
}
