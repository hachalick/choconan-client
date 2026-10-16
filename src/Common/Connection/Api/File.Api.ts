import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { EServerRoute } from "@/Common/Enums/ServerRout";
import { BaseApi } from "./Seed/Base.Api";
import { ApiBuilder } from "./Seed/Builder.Api";
import {
  DeleteFileImageViewModel,
  ReadFileImageListViewModel,
  UploadFileImageViewModel,
} from "./ViewModels/File.Service.ViewModel";
import {
  DeleteFileImageModel,
  DownloadBackupModel,
  ReadFileImageListModel,
} from "./Models/File.Service.Model";
import { BaseAuthModel } from "./Models/Seed/Base.Service.Model";

export class ApiFile extends BaseApi {
  constructor() {
    super("/file");
  }

  static builder(): ApiBuilder {
    return new ApiBuilder(new ApiFile());
  }

  static async ReadFileImageList(
    Param: ReadFileImageListModel & BaseAuthModel,
  ): Promise<Array<ReadFileImageListViewModel>> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(EServerRoute.FILE_IMAGE)
      .method(EMethodRequest.GET)
      .header("access_token", Param.AccessToken)
      .fetch<Array<ReadFileImageListViewModel>>();
  }

  static async DownloadBackup(
    Param: DownloadBackupModel & BaseAuthModel,
  ): Promise<Blob> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(EServerRoute.FILE_DOWNLOAD_EXCEL_BACKUP)
      .method(EMethodRequest.GET)
      .header("access_token", Param.AccessToken)
      .fetch<Blob>();
  }

  static async DeleteFileImage(
    Param: DeleteFileImageModel & BaseAuthModel,
  ): Promise<DeleteFileImageViewModel> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(`${EServerRoute.FILE_IMAGE}/${Param.Id}`)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.DELETE)
      .fetch<DeleteFileImageViewModel>();
  }

  static async UploadFileImage(
    Param: {
      newForm: FormData;
      setSrcImage: React.Dispatch<React.SetStateAction<string>>;
      setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
      setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    } & BaseAuthModel,
  ): Promise<void> {
    return await ApiFile.builder()
      .cache("no-store")
      .route(EServerRoute.FILE_IMAGE)
      .header("access_token", Param.AccessToken)
      .method(EMethodRequest.POST)
      .body(Param.newForm)
      .uploadWithProgress({
        onError: (error) => {
          console.error("Upload error:", error);
        },
        onProgress: (percent, loaded, total) => {
          Param.setUploadProgress(percent);
        },
        onSuccess: () => {
          Param.setSrcImage("/s-logo.jpg");
          Param.setUploadImage(true);
          Param.setUploadProgress(100);
          setTimeout(() => Param.setUploadProgress(0), 1000);
        },
      });
  }
}
