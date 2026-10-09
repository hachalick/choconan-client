export class BaseReadViewModel {
  Id: string = "";
}

export class BaseCreateViewModel {
  Create: boolean = false;
}

export class BaseUpdateViewModel {
  Update: boolean = false;
}

export class BaseDeleteViewModel {
  Delete: boolean = false;
}

export class BaseDownloadViewModel {
  Download: Buffer = Buffer.alloc(0);
}

export class BaseUploadViewModel {
  Upload: boolean = false;
}

export class BaseEmitViewModel {
  Send: boolean = false;
}
