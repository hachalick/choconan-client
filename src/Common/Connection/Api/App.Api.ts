import { EMethodRequest } from '@/Common/Enums/MethodReq.enum'
import { EServerRoute } from '@/Common/Enums/ServerRout'
import { ApiBuilder } from './Seed/Builder.Api'
import { BaseApi } from './Seed/Base.Api'
import { ReadLastVideoCategoryDetailViewModel } from './ViewModels/App.Service.ViewModel'
import { ReadLastVideoCategoryDetailModel } from './Models/App.Service.Model'

export class ApiVideo extends BaseApi {
  constructor () {
    super('/app')
  }

  static builder (): ApiBuilder {
    return new ApiBuilder(new ApiVideo())
  }

  static async ReadLastVideoCategoryDetail (
    Param: ReadLastVideoCategoryDetailModel
  ): Promise<ReadLastVideoCategoryDetailViewModel> {
    return await ApiVideo.builder()
      .cache('no-store')
      .route(`${EServerRoute.VIDEO_LAST}/${Param.Id}`)
      .method(EMethodRequest.GET)
      .fetch<ReadLastVideoCategoryDetailViewModel>()
  }
}
