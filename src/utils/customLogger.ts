export let customLogger: CustomLogger;

export class CustomLogger {
   constructor() {
      if (!customLogger) {
         customLogger = this;
         return customLogger;
      } else {
         return customLogger;
      }
   }

   public async error(_params: { errorMsg: string; errorData: any }) {
      console.log(`\n\u001b[31mError: ${_params.errorMsg}\n`);
      console.log(`\n\u001b[31m${_params.errorData}\n`);
   }
}
