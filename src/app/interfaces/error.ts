export interface IErrorSources {
  path: string;
  message: string;
}

export interface IResponseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}

export interface IJwtPayload {
  email: string;
  role: string;
}
