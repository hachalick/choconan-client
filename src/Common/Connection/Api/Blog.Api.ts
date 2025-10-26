import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiBlog {
  static async fetchCreateBlogPanel({
    access_token,
  }: {
    access_token: string;
  }): Promise<TCreateBlog> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.CREATE_BLOG + `?${query}`, {
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

  static async fetchBlogsPanel(): Promise<TGetIdBlogs> {
    const res = await fetch(ERoute.HOST + ERoute.GET_LIST_BLOG, {
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

  static async fetchBLog({
    blog_id,
  }: {
    blog_id: string;
  }): Promise<TGetIdBlog> {
    const res = await fetch(ERoute.HOST + ERoute.GET_BLOG + `/${blog_id}`, {
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

  static async fetchUpdateBlogPanel({
    blog_id,
    blog,
    meta_title,
    publish,
    short_description,
    src_banner,
    title,
    access_token,
  }: TIdBlog & { access_token: string }): Promise<TGetIdBlogs> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.UPDATE_BLOG + `/${blog_id}?${query}`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        cache: "no-store",
        method: EMethodRequest.PUT,
        body: JSON.stringify({
          blog,
          meta_title,
          publish,
          short_description,
          src_banner,
          title,
        }),
      }
    );
    if (!res.ok) {
      throw new Error((await res.json())?.message || "Failed to fetch data");
    }
    return res.json();
  }
}
