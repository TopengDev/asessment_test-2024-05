import { globalConst } from '@/constants';
import { CustomLogger } from './customLogger';
import { TResponse } from '@/types';

export class ApiAsyncRunner {
   private callbackProps: any;
   private callback: (props?: typeof this.callbackProps) => any;
   private errorMessage: string;
   private customLogger: CustomLogger;

   constructor(_params: {
      callback: any;
      errorMessage?: string;
      callbackProps?: any;
   }) {
      this.customLogger = new CustomLogger();
      this.callbackProps = _params.callbackProps;
      this.callback = _params.callback;
      this.errorMessage =
         _params.errorMessage || globalConst.genericErrorMessage;
   }

   public async execute() {
      try {
         const response = await this.callback(this.callbackProps);
         return response;
      } catch (error: any) {
         this.customLogger.error({
            errorMsg: this.errorMessage,
            errorData: error,
         });
         return Response.json(
            { isSuccess: false, msg: this.errorMessage } as TResponse,
            { status: 500 },
         );
      }
   }
}
