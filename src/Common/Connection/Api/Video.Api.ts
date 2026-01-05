import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";
import { ApiBuilder } from "./SeedWork/Builder.Api";
import { BaseApi } from "./SeedWork/Base.Api";

export class ApiVideo extends BaseApi {
  constructor() {
    super("");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiVideo());
  }

  static async fetchLastVideo({
    category,
  }: TCategoryVideoDto): Promise<TGetVideoDto> {
    return await ApiVideo.builder()
      .cache("no-store")
      .route(`${ERoute.GET_LAST_VIDEO}/${category}`)
      .method(EMethodRequest.GET)
      .fetch<TGetVideoDto>();
  }
}
