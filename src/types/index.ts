export type TResponse<TData = any> = {
   isSuccess: boolean;
   msg: string;
   data?: TData;
};
