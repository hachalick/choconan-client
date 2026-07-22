import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";
import { BaseApi } from "./SeedWork/Base.Api";
import { ApiBuilder } from "./SeedWork/Builder.Api";

export class ApiBlog extends BaseApi {
  constructor() {
    super("/blog");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiBlog());
  }

  static async fetchCreateBlogPanel({
    access_token,
  }: TCreateBlogDto): Promise<TCreateBlogResponseDto> {
    return await ApiBlog.builder()
      .cache("no-store")
      .method("POST")
      .route(ERoute.BLOG)
      .header("access_token", access_token)
      .fetch();
  }

  static async fetchListBlogs(): Promise<TGetBlogItemResponseDto> {
    return await ApiBlog.builder()
      .cache("no-store")
      .method("GET")
      .route(ERoute.BLOG)
      .fetch();
  }

  static async fetchGetBLog({
    blog_id,
  }: {
    blog_id: string;
  }): Promise<TGetBlogResponseDto> {
    return await ApiBlog.builder()
      .cache("no-store")
      .method("GET")
      .route(`${ERoute.BLOG}/${blog_id}`)
      .fetch();
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
  }: TUpdateBlogDto): Promise<TUpdateBlogResponseDto> {
    return await ApiBlog.builder()
      .cache("no-store")
      .method("PUT")
      .route(`${ERoute.BLOG}/${blog_id}`)
      .header("access_token", access_token)
      .bodyParam("blog", blog)
      .bodyParam("meta_title", meta_title)
      .bodyParam("publish", publish)
      .bodyParam("short_description", short_description)
      .bodyParam("src_banner", src_banner)
      .bodyParam("title", title)
      .fetch();
  }
}
