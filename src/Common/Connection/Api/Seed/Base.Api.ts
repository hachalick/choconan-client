import { EServerRoute } from "@/Common/Enums/ServerRout";

export abstract class BaseApi {
  private _host = EServerRoute.HOST;
  private _base_url = "";
  private _route = "";
  private _parameters: Array<{
    name: string;
    value: string | number | null | boolean;
  }> = [];
  private _headers: Array<{
    name: string;
    value: string;
  }> = [];
  private _body: any = null;
  private _contentType: string = "application/json";
  private _method: TMethodFetch = "GET";
  private _cache: RequestCache = "no-store";

  constructor(base_url: string) {
    this._base_url = base_url;
  }

  public SetCache(cache: RequestCache): this {
    this._cache = cache;
    return this;
  }

  public SetRoute(...route: string[]) {
    this._route = route.join("");
    return this;
  }

  public SetMethod(method: TMethodFetch) {
    this._method = method;
    return this;
  }

  public SetContentType(contentType: string) {
    this._contentType = contentType;
    return this;
  }

  public AddParameter(name: string, value: string | number | null | boolean) {
    this._parameters.push({ name, value });
    return this;
  }

  public AddHeader(name: string, value: string) {
    this._headers.push({ name, value });
    return this;
  }

  public AddBody(
    name: string,
    value:
      | string
      | Array<string>
      | null
      | Array<null>
      | number
      | Array<number>
      | object
      | Array<object>
      | boolean
      | Array<boolean>
  ) {
    if (!this._body || typeof this._body !== "object") {
      this._body = {};
    }
    this._body[name] = value;
    return this;
  }

  public SetBody(body: any): this {
    this._body = body;
    return this;
  }

  public ClearParameters() {
    this._parameters = [];
    return this;
  }

  public ClearHeaders() {
    this._headers = [];
    return this;
  }

  public ClearBody() {
    this._body = null;
    return this;
  }

  public Reset() {
    this.ClearParameters();
    this.ClearHeaders();
    this.ClearBody();
    this._method = "GET";
    this._route = "";
    this._contentType = "application/json";
    return this;
  }

  private buildUrl(): string {
    let url = `${this._host}${this._base_url}${this._route}`;

    if (this._parameters.length > 0) {
      const queryString = this._parameters
        .map((param) => `${param.name}=${param.value}`)
        .join("&");
      url += `?${queryString}`;
    }

    return url;
  }

  private buildHeaders(): HeadersInit {
    const headers: HeadersInit = {};

    if (
      this._body &&
      !this._headers.some((h) => h.name.toLowerCase() === "content-type")
    ) {
      headers["Content-Type"] = this._contentType;
    }

    this._headers.forEach((header) => {
      let headerValue: string;

      if (typeof header.value === "string") {
        headerValue = header.value;
      } else if (
        typeof header.value === "number" ||
        typeof header.value === "boolean"
      ) {
        headerValue = String(header.value);
      } else if (header.value === null || header.value === undefined) {
        headerValue = "";
      } else {
        headerValue = JSON.stringify(header.value);
      }

      headers[header.name] = headerValue;
    });

    return headers;
  }

  // private buildHeaders(): HeadersInit {
  //   const headers: HeadersInit = {};

  //   console.log(this._headers)

  //   if (!this._headers.some((h) => h.name.toLowerCase() === "content-type")) {
  //     headers["Content-Type"] = this._contentType;
  //   }

  //   this._headers.forEach((header) => {
  //     typeof header.value === "string"
  //       ? header.value
  //       : JSON.stringify(header.value);
  //   });

  //   return headers;
  // }

  private buildBody(): BodyInit | null {
    if (!this._body) return null;

    if (this._contentType.includes("application/json")) {
      return JSON.stringify(this._body);
    } else if (
      this._contentType.includes("application/x-www-form-urlencoded")
    ) {
      return new URLSearchParams(
        this._body as Record<string, string>
      ).toString();
    } else if (this._contentType.includes("multipart/form-data")) {
      const formData = new FormData();
      Object.entries(this._body).forEach(([key, value]) => {
        if (value instanceof File || value instanceof Blob) {
          formData.append(key, value);
        } else {
          formData.append(key, String(value));
        }
      });
      return formData;
    }

    return String(this._body);
  }

  public async Fetch<T>(): Promise<T> {
    const url = this.buildUrl();
    const headers = this.buildHeaders();
    const body = this.buildBody();

    const fetchOptions: RequestInit = {
      method: this._method,
      headers,
      // credentials: "include",
      // mode: "cors",
      cache: this._cache,
    };

    if (body && this._method !== "GET") {
      fetchOptions.body = body;
    }

    try {
      const response = await fetch(url, fetchOptions);

      if (!response.ok) {
        const errorText = await response.text();
        let errorMessage = `HTTP Error ${response.status}: ${response.statusText}`;

        try {
          const errorJson = JSON.parse(errorText);
          errorMessage = errorJson?.message || errorJson?.error || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }

        throw new Error(errorMessage);
      }

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        return (await response.json()) as T;
      } else if (contentType && contentType.includes("text/")) {
        return (await response.text()) as T;
      } else if (
        contentType &&
        contentType.includes("application/octet-stream")
      ) {
        return (await response.blob()) as T;
      } else {
        return (await response.text()) as T;
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        throw new Error(`Fetch failed: ${error.message}`);
      }
      throw new Error("Unknown fetch error occurred");
    } finally {
      this.Reset();
    }
  }

  public async Upload<T>({
    onProgress,
    onSuccess,
    onError,
  }: {
    onProgress?: (percent: number, loaded: number, total: number) => void;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }): Promise<T> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const url = this.buildUrl();

      xhr.open(this._method, url, true);

      // ✅ اگر body از نوع FormData است، Content-Type را دستی ست نکن
      const isFormData =
        typeof FormData !== "undefined" && this._body instanceof FormData;
      const isMultipart =
        !!this._contentType &&
        this._contentType.toLowerCase().includes("multipart/form-data");

      // ✅ فقط برای non-multipart/non-FormData Content-Type بگذار
      if (!isFormData && !isMultipart && this._contentType) {
        xhr.setRequestHeader("Content-Type", this._contentType);
      }

      // سایر هدرها
      this._headers.forEach((header) => {
        let headerValue: string;

        if (typeof header.value === "string") headerValue = header.value;
        else if (
          typeof header.value === "number" ||
          typeof header.value === "boolean"
        )
          headerValue = String(header.value);
        else if (header.value == null) headerValue = "";
        else headerValue = JSON.stringify(header.value);

        // اگر کسی اشتباهی Content-Type را برای FormData فرستاده، می‌تونی اینجا هم فیلتر کنی:
        if (isFormData && header.name.toLowerCase() === "content-type") return;

        xhr.setRequestHeader(header.name, headerValue);
      });

      if (onProgress) {
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percentComplete = Math.round(
              (event.loaded / event.total) * 100
            );
            onProgress(percentComplete, event.loaded, event.total);
          }
        };
      }

      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          onSuccess?.();

          const text = xhr.responseText ?? "";
          try {
            resolve(JSON.parse(text) as T);
          } catch {
            // اگر واقعاً می‌خوای متن خام هم ممکن باشه:
            resolve(text as unknown as T);
          }
        } else {
          const errorMsg = `Upload failed with status ${xhr.status}`;
          onError?.(errorMsg);
          reject(new Error(errorMsg));
        }
      };

      xhr.onerror = () => {
        const errorMsg = "Network error during upload";
        onError?.(errorMsg);
        reject(new Error(errorMsg));
      };

      const bodyToSend = isFormData ? this._body : this.buildBody();
      xhr.send(bodyToSend);
    });
  }
}
