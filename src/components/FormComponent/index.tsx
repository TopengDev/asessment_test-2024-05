'use client';

import { TResponse } from '@/types';
import {
   Dispatch,
   FormEvent,
   HTMLInputTypeAttribute,
   MutableRefObject,
   PropsWithChildren,
   SetStateAction,
   createContext,
   useCallback,
   useContext,
   useEffect,
   useRef,
   useState,
} from 'react';

export type TFormFields<TData = any> = {
   type: HTMLInputTypeAttribute;
   field: keyof TData;
   placeholder?: string;
};

export const FormFieldsComponent = (_props: {
   formFields: TFormFields[];
   formValuesRef: MutableRefObject<Record<string, any>> | { current: any };
}) => {
   const [initialized, setInitialized] = useState<boolean>(false);

   const initFormValues = useCallback(() => {
      if (!initialized)
         _props.formFields.map((formField): undefined => {
            switch (formField.type) {
               case 'string':
                  Object.keys(_props.formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (_props.formValuesRef.current = {
                          ..._props.formValuesRef.current,
                          [formField.field]: '',
                       })
                     : '';
               case 'number':
                  Object.keys(_props.formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (_props.formValuesRef.current = {
                          ..._props.formValuesRef.current,
                          [formField.field]: 0,
                       })
                     : '';
               case 'email':
                  Object.keys(_props.formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (_props.formValuesRef.current = {
                          ..._props.formValuesRef.current,
                          [formField.field]: '',
                       })
                     : '';
               case 'password':
                  Object.keys(_props.formValuesRef.current).includes(
                     formField.field as string,
                  )
                     ? (_props.formValuesRef.current = {
                          ..._props.formValuesRef.current,
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
                     (_props.formValuesRef.current[formField.field as string] =
                        e.target.value)
                  }
                  className="px-4 py-2 flex items-center border-solid rounded-md border-[1px] border-black"
                  placeholder={formField.placeholder || ''}
               />
            </div>
         ))}
         {Object.keys(_props.formValuesRef.current as any).map((key, i) => {
            return (
               <div className="flex flex-col gap-y-2 my-4" key={i}>
                  <label>{`${
                     key.split('')[0].toUpperCase() +
                     key.split('').slice(1, key.split('').length).join('')
                  }`}</label>
                  <input
                     type=""
                     onChange={(e) =>
                        ((_props.formValuesRef.current as any)[key] =
                           e.target.value)
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

export type TFormMetadata<TData = any> = {
   formFields: TFormFields<TData>[];
   submitMethod?: 'POST' | 'PUT' | 'DELETE';
   apiUrl?: string;
   urlQuery?: string[];
   onSubmitCallback?: (props?: any) => any;
   onSuccessCallback?: (props?: any) => any;
   onFailedCallback?: (props?: any) => any;
};
export type TFormContext = {
   response: null | TResponse;
   formValuesRef: MutableRefObject<Record<string, any>>;
   formMetadata: TFormMetadata<any>;
   setCurrentFormMetadata: Dispatch<SetStateAction<TFormMetadata<any>>>;
};
const formContext = createContext<TFormContext>({
   response: null,
   formValuesRef: { current: {} },
   formMetadata: {
      formFields: [],
      apiUrl: '',
      submitMethod: 'POST',
   },
   setCurrentFormMetadata: () => {},
});
export const FormProvider = (
   _props: TFormMetadata &
      PropsWithChildren & {
         setCurrentFormMetadata: Dispatch<SetStateAction<TFormMetadata<any>>>;
      },
) => {
   const formValuesRef = useRef<Record<string, any>>({});
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
         const response = await (
            await fetch(_props.apiUrl || '', {
               method: _props.submitMethod,
               body: JSON.stringify(formValuesRef.current),
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
            })
         ).json();

         setResponse(response);
      } catch (e: any) {}
   };
   const [response, setResponse] = useState<TResponse | null>(null);

   return (
      <formContext.Provider
         value={{
            response,
            formValuesRef,
            formMetadata: { ..._props },
            setCurrentFormMetadata: _props.setCurrentFormMetadata,
         }}
      >
         <form
            onSubmit={(e) => {
               _props.onSubmitCallback
                  ? _props.onSubmitCallback()
                  : handleSubmit(e);
            }}
         >
            {_props.children}
         </form>
      </formContext.Provider>
   );
};

const useFormContext = () => useContext(formContext);
export default useFormContext;
