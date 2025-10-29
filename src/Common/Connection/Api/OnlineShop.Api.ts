import { ERoute } from "@/Common/Enums/Routs";

export class ApiOnlineShop {
  static async fetchCrawlerSnap(): Promise<{
    allProduct: Array<{
      id: number;
      title: string;
      price: number;
    }>;
    match: Array<{
      id: number;
      title: string;
      price: number;
      selfPrice: number;
      selfTitle: string;
    }>;
    notMatch: Array<{
      id: number;
      title: string;
      price: number;
      selfPrice: number;
    }>;
  }> {
    const res = await fetch(ERoute.HOST + ERoute.GET_CRAWLER_MENU_SNAP_FOOD);
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return await res.json();
  }

  static async fetchCrawlerTapsi(): Promise<{
    allProduct: Array<{
      id: number;
      title: string;
      price: number;
    }>;
    match: Array<{
      id: number;
      title: string;
      price: number;
      selfPrice: number;
      selfTitle: string;
    }>;
    notMatch: Array<{
      id: number;
      title: string;
      price: number;
      selfPrice: number;
    }>;
  }> {
    const res = await fetch(ERoute.HOST + ERoute.GET_CRAWLER_MENU_TAPSI_FOOD);
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return await res.json();
  }
}
