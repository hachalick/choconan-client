import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";
import { BaseApi } from "./SeedWork/Base.Api";
import { ApiBuilder } from "./SeedWork/Builder.Api";

export class ApiFile extends BaseApi {
  constructor() {
    super("/file");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiFile());
  }

  static async fetchGetImages({
    access_token,
  }: {
    access_token: string;
  }): Promise<Array<TGetImageResponseDto>> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(ERoute.IMAGE)
      .header("access_token", access_token)
      .method(EMethodRequest.GET)
      .fetch<Array<TGetImageResponseDto>>();
  }

  static async fetchDeleteImage({
    access_token,
    image_id,
  }: {
    access_token: string;
    image_id: string;
  }): Promise<TDeleteImageResponseDto> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(`${ERoute.IMAGE}/${image_id}`)
      .header("access_token", access_token)
      .method(EMethodRequest.DELETE)
      .fetch<TDeleteImageResponseDto>();
  }

  static async uploadImage({
    access_token,
    newForm,
    setSrcImage,
    setUploadImage,
    setUploadProgress,
  }: {
    access_token: string;
    newForm: FormData;
    setSrcImage: React.Dispatch<React.SetStateAction<string>>;
    setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  }): Promise<void> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(ERoute.IMAGE)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .body(newForm)
      .uploadWithProgress({
        onError: (error) => {
          console.error("Upload error:", error);
        },
        onProgress: (percent, loaded, total) => {
          setUploadProgress(percent);
        },
        onSuccess: () => {
          setSrcImage("/s-logo.jpg");
          setUploadImage(true);
          setUploadProgress(100);
          setTimeout(() => setUploadProgress(0), 1000);
        },
      });
  }

  static async uploadImageProduct({
    access_token,
    newForm,
    setSrcImage,
    setUploadImage,
    setUploadProgress,
  }: {
    access_token: string;
    newForm: FormData;
    setSrcImage: React.Dispatch<React.SetStateAction<string>>;
    setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
  }): Promise<void> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(ERoute.IMAGE_PRODUCT)
      .header("access_token", access_token)
      .method(EMethodRequest.POST)
      .body(newForm)
      .uploadWithProgress({
        onError: (error) => {
          console.error("Upload error:", error);
        },
        onProgress: (percent) => {
          setUploadProgress(percent);
        },
        onSuccess: () => {
          setSrcImage("/s-logo.jpg");
          setUploadImage(true);
          setUploadProgress(100);
          setTimeout(() => setUploadProgress(0), 1000);
        },
      });
  }
}
