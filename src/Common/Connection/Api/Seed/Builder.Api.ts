import { BaseApi } from "./Base.Api";

export class ApiBuilder {
  private api: BaseApi;

  constructor(api: BaseApi) {
    this.api = api;
  }

  route(...route: string[]): ApiBuilder {
    this.api.SetRoute(...route);
    return this;
  }

  method(method: TMethodFetch): ApiBuilder {
    this.api.SetMethod(method);
    return this;
  }

  cache(cacheMode: RequestCache): ApiBuilder {
    this.api.SetCache(cacheMode);
    return this;
  }

  param(name: string, value: string | number | null | boolean): ApiBuilder {
    this.api.AddParameter(name, value);
    return this;
  }

  header(name: string, value: string): ApiBuilder {
    this.api.AddHeader(name, value);
    return this;
  }

  bodyParam(
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
  ): ApiBuilder {
    this.api.AddBody(name, value);
    return this;
  }

  body(data: any): ApiBuilder {
    this.api.SetBody(data);
    return this;
  }

  async fetch<T>(): Promise<T> {
    return this.api.Fetch<T>();
  }

  async get<T>(): Promise<T> {
    return this.api.SetMethod("GET").Fetch<T>();
  }

  async post<T>(): Promise<T> {
    return this.api.SetMethod("POST").Fetch<T>();
  }

  async put<T>(): Promise<T> {
    return this.api.SetMethod("PUT").Fetch<T>();
  }

  async delete<T>(): Promise<T> {
    return this.api.SetMethod("DELETE").Fetch<T>();
  }

  async uploadWithProgress<T>({
    onProgress,
    onSuccess,
    onError,
  }: {
    onProgress?: (percent: number, loaded: number, total: number) => void;
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }): Promise<T> {
    return this.api.Upload<T>({ onProgress, onSuccess, onError });
  }
}
