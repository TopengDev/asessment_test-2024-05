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

const handleSubmit = async (
   formMetadata: TFormMetadata,
   data: any,
   onSubmitCallback: (response?: TResponse) => any,
) => {
   try {
      if (formMetadata.customSubmitCallback)
         formMetadata.customSubmitCallback();
      else {
         const response: TResponse = await (
            await fetch(formMetadata?.apiUrl || '', {
               method: formMetadata?.submitMethod,
               body: JSON.stringify(data),
               headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
               },
            })
         ).json();

         onSubmitCallback(response);
      }
   } catch (e: any) {
      alert(e.toString());
   }
};

export type TFormFields<TData = any> = {
   type: HTMLInputTypeAttribute;
   field: keyof TData;
   placeholder?: string;
};
type TFormProps = {
   formFields: TFormFields[];
};
export function Form(_props: TFormProps) {
   const [initialized, setInitialized] = useState<boolean>(false);

   const { formValuesRef } = useForm();

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
      <form className="flex flex-col">
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
                     (formValuesRef.current[formField.field as string] =
                        e.target.value)
                  }
                  className="px-4 py-2 flex items-center border-solid rounded-md border-[1px] border-black"
                  placeholder={formField.placeholder || ''}
               />
            </div>
         ))}
         {Object.keys(formValuesRef.current as any).map((key, i) => {
            return (
               <div className="flex flex-col gap-y-2 my-4" key={i}>
                  <label>{`${
                     key.split('')[0].toUpperCase() +
                     key.split('').slice(1, key.split('').length).join('')
                  }`}</label>
                  <input
                     type=""
                     onChange={(e) =>
                        ((formValuesRef.current as any)[key] = e.target.value)
                     }
                     className="px-4 py-2 flex items-center border-solid rounded-md border-[1px] border-black"
                     placeholder="youremail@example.com"
                  />
               </div>
            );
         })}
         {}
      </form>
   );
}

export type TFormMetadata<TData = any> = {
   formFields: TFormFields<TData>[];
   submitMethod?: 'POST' | 'PUT' | 'DELETE';
   apiUrl?: string;
   urlQuery?: string[];
   onSubmitCallback?: (props?: any) => any;
   onSuccessCallback?: (props?: any) => any;
   onFailedCallback?: (props?: any) => any;
   customSubmitCallback?: (props?: any) => any;
};
export type TFormContext = {
   response: TResponse | null;
   setResponse: Dispatch<SetStateAction<TResponse | null>>;
   formValuesRef: MutableRefObject<Record<string, any>>;
   formMetadata: TFormMetadata<any>;
   setFormMetadata: Dispatch<SetStateAction<TFormMetadata<any>>>;
   submit: (
      formMetadata: TFormMetadata,
      data: any,
      onSubmitCallback: (props?: any) => any,
   ) => Promise<void>;
};
const initialFormContext: TFormContext = {
   formMetadata: {
      formFields: [],
      apiUrl: '',
   },
   formValuesRef: { current: {} },
   response: null,
   setResponse: () => {},
   setFormMetadata: () => {},
   submit: function () {
      throw new Error('Function not implemented.');
   },
};
const formContext = createContext<TFormContext>(initialFormContext);
export function FormProvider(
   _props: PropsWithChildren & {
      initialFormMetadata: TFormMetadata;
   },
) {
   const [response, setResponse] = useState<TResponse | null>(null);
   const formValuesRef = useRef<Record<string, any>>({});
   const [formMetadata, setFormMetadata] = useState<TFormMetadata>(
      _props.initialFormMetadata,
   );

   useEffect(() => {
      formValuesRef.current = {};
   }, [formMetadata]);

   return (
      <formContext.Provider
         value={{
            formMetadata,
            setFormMetadata,
            formValuesRef,
            response,
            setResponse,
            submit: handleSubmit,
         }}
      >
         {_props.children}
      </formContext.Provider>
   );
}

export default function useForm() {
   return useContext(formContext);
}
