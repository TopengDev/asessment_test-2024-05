export function validateFields<TData = any>(initialData: TData, data: TData) {
   const invalidFields: (keyof TData)[] = [];
   for (let key in initialData) {
      if (!data[key]) invalidFields.push(key);
   }

   return invalidFields;
}
