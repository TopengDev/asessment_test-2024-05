'use client';

import {
   FormEvent,
   HTMLInputTypeAttribute,
   InputHTMLAttributes,
   MutableRefObject,
   PropsWithChildren,
   ReactNode,
   useCallback,
   useEffect,
   useRef,
   useState,
} from 'react';

export type TFormFields<TData = any> = {
   type: HTMLInputTypeAttribute;
   field: keyof TData;
   placeholder?: string;
};

export type TFormMetadata<TData = any> = {
   formFields: TFormFields<TData>[];
   submitMethod: 'POST' | 'GET' | 'PUT' | 'DELETE';
   apiUrl: string;
   urlQuery?: string[];
   onSuccessCallback?: (props?: any) => any;
   onFailedCallback?: (props?: any) => any;
};

const FormFieldsComponent = (_props: {
   formFields: TFormFields[];
   formRef: MutableRefObject<any>;
}) => {
   return (
      <div className="flex flex-col">
         {_props.formFields.map((formField, i) => (
            <div className="flex flex-col gap-y-2 mb-4" key={i}>
               <label>{`${
                  (formField.field as string).split('')[0].toUpperCase() +
                  (formField.field as string)
                     .split('')
                     .slice(1, (formField.field as string).split('').length)
                     .join('')
               }`}</label>
               <input
                  type={formField.type}
                  onChange={(e) =>
                     (_props.formRef.current[formField.field as string] =
                        e.target.value)
                  }
                  className="px-4 py-2 flex items-center border-solid rounded-md border-[1px] border-black"
                  placeholder={formField.placeholder || ''}
               />
            </div>
         ))}
         {Object.keys(_props.formRef.current as any).map((key, i) => {
            return (
               <div className="flex flex-col gap-y-2 my-4" key={i}>
                  <label>{`${
                     key.split('')[0].toUpperCase() +
                     key.split('').slice(1, key.split('').length).join('')
                  }`}</label>
                  <input
                     type=""
                     onChange={(e) =>
                        ((_props.formRef.current as any)[key] = e.target.value)
                     }
                     className="px-4 py-2 flex items-center border-solid rounded-md border-[1px] border-black"
                     placeholder="youremail@example.com"
                  />
               </div>
            );
         })}
         {}
      </div>
   );
};

export const Form = (_props: TFormMetadata & PropsWithChildren) => {
   const [initialized, setInitialized] = useState<boolean>(false);

   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         const response = await (
            await fetch(_props.apiUrl, {
               method: _props.submitMethod,
               body: JSON.stringify(formValuesRef.current),
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
            })
         ).json();

         console.log({ response });
      } catch (e: any) {}
   };

   const formValuesRef = useRef<Record<string, any>>({});
   const initFormValues = useCallback(() => {
      if (!initialized)
         _props.formFields.map((formField): undefined => {
            switch (formField.type) {
               case 'string':
                  Object.keys(formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (formValuesRef.current = {
                          ...formValuesRef.current,
                          [formField.field]: '',
                       })
                     : '';
               case 'number':
                  Object.keys(formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (formValuesRef.current = {
                          ...formValuesRef.current,
                          [formField.field]: 0,
                       })
                     : '';
               case 'email':
                  Object.keys(formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (formValuesRef.current = {
                          ...formValuesRef.current,
                          [formField.field]: '',
                       })
                     : '';
               case 'password':
                  Object.keys(formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (formValuesRef.current = {
                          ...formValuesRef.current,
                          [formField.field]: '',
                       })
                     : '';
            }
         });
   }, [initialized, _props.formFields]);
   useEffect(() => {
      if (!initialized) {
         initFormValues();
         setInitialized(true);
      }
   }, [initialized, initFormValues]);

   return (
      <form onSubmit={(e) => handleSubmit(e)}>
         <FormFieldsComponent
            formRef={formValuesRef}
            formFields={_props.formFields}
         />
         {_props.children}
      </form>
   );
};
