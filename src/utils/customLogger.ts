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
   public async logReq(_params: { req: any }) {
      console.log('\n\n\n\n\n');
      console.log(
         `\n\u001b[33mStart Request========================================\n`,
      );
      console.log(`\u001b[32m${'Request: \n' + JSON.stringify(_params.req)}`);
      console.log(`\n\u001b[33mEnd Request===================`);
   }
   public async logRes(_params: { res: any }) {
      console.log(`\n\u001b[33mStart Response================\n`);
      console.log(`\u001b[32m${'Response: \n' + JSON.stringify(_params.res)}`);
      console.log(
         `\n\u001b[33mEnd Response========================================\n`,
      );
   }
}
