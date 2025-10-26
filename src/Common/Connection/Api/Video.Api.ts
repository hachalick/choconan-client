import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiVideo {
  static async fetchLastVideo({
    category,
  }: {
    category: TCategoryVideo;
  }): Promise<TCardVideo> {
    const res = await fetch(
      ERoute.HOST + ERoute.GET_LAST_VIDEO + `/${category}`,
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
