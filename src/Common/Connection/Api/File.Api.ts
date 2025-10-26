import { EMethodRequest } from "@/Common/Enums/MethodReq.enum";
import { ERoute } from "@/Common/Enums/Routs";

export class ApiFile {
  static async fetchGetImages({
    access_token,
  }: {
    access_token: string;
  }): Promise<TIdImages> {
    const query = `token=${access_token}`;
    const res = await fetch(ERoute.HOST + ERoute.GET_IMAGES + `?${query}`, {
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

  static async fetchDeleteImage({
    access_token,
    image_id,
  }: {
    access_token: string;
    image_id: string;
  }): Promise<TIdImages> {
    const query = `token=${access_token}`;
    const res = await fetch(
      ERoute.HOST + ERoute.DELETE_IMAGE + `/${image_id}` + `?${query}`,
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

  static async fetchImageProduct({
    access_token,
    newForm,
    setUploadProgress,
    setSrcImage,
    setUploadImage,
  }: {
    access_token: string;
    newForm: FormData;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    setSrcImage: React.Dispatch<React.SetStateAction<string>>;
    setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    const xhr = new XMLHttpRequest();

    xhr.open(
      EMethodRequest.POST,
      ERoute.HOST + ERoute.UPLOAD_IMAGE_PRODUCT + `?token=${access_token}`,
      true
    );

    xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setSrcImage("/s-logo.jpg");
        setUploadImage(true);
        setUploadProgress(100);
        setUploadProgress(0);
      } else {
        // setMessage("آپلود با خطا مواجه شد.");
      }
    };

    xhr.onerror = () => {
      // setMessage("خطا در آپلود فایل.");
    };

    xhr.send(newForm);
  }

  static async fetchImage({
    access_token,
    newForm,
    setUploadProgress,
    setSrcImage,
    setUploadImage,
  }: {
    access_token: string;
    newForm: FormData;
    setUploadProgress: React.Dispatch<React.SetStateAction<number>>;
    setSrcImage: React.Dispatch<React.SetStateAction<string>>;
    setUploadImage: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    const xhr = new XMLHttpRequest();

    xhr.open(
      EMethodRequest.POST,
      ERoute.HOST + ERoute.UPLOAD_IMAGE + `?token=${access_token}`,
      true
    );

    xhr.setRequestHeader("Authorization", `Bearer ${access_token}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percentComplete);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        setSrcImage("/s-logo.jpg");
        setUploadImage(true);
        setUploadProgress(100);
        setUploadProgress(0);
      } else {
        // setMessage("آپلود با خطا مواجه شد.");
      }
    };

    xhr.onerror = () => {
      // setMessage("خطا در آپلود فایل.");
    };

    xhr.send(newForm);
  }
}
