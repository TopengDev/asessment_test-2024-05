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
} & (
   | {
        isHiddenField: false;
     }
   | {
        isHiddenField: true;
        value: any;
     }
);
type TFormProps = {
   formFields: TFormFields[];
   colMode?: 'row' | 'col';
   formValues: any;
   setFormValues: Dispatch<SetStateAction<any>>;
};
export function Form(_props: TFormProps) {
   const initFormValues = useCallback(() => {
      _props.formFields.map((formField): undefined => {
         if (formField.isHiddenField) {
            _props.setFormValues({
               ..._props.formValues,
               [formField.field]: formField.value,
            });
         } else {
            switch (formField.type) {
               case 'string':
                  Object.keys(_props.setFormValues).includes(
                     formField.field as string,
                  )
                     ? _props.setFormValues({
                          ..._props.formValues,
                          [formField.field]: '',
                       })
                     : '';
               case 'number':
                  Object.keys(_props.setFormValues).includes(
                     formField.field as string,
                  )
                     ? _props.setFormValues({
                          ..._props.formValues,
                          [formField.field]: 0,
                       })
                     : '';
               case 'email':
                  Object.keys(_props.setFormValues).includes(
                     formField.field as string,
                  )
                     ? _props.setFormValues({
                          ..._props.formValues,
                          [formField.field]: '',
                       })
                     : '';
               case 'password':
                  Object.keys(_props.setFormValues).includes(
                     formField.field as string,
                  )
                     ? _props.setFormValues({
                          ..._props.formValues,
                          [formField.field]: '',
                       })
                     : '';
            }
         }
      });
   }, [_props.formFields]);

   useEffect(() => {
      if (_props.formFields.length) {
         initFormValues();
      }
   }, [_props.formFields.length]);

   return (
      <div className="w-full flex justify-center items-center">
         <form
            className={`grid-flow-col flex flex-${
               _props.colMode === 'row' ? 'row' : 'col'
            } gap-2 w-full`}
         >
            {_props.formFields.map((formField, i) => {
               return (
                  !formField.isHiddenField && (
                     <div key={i} className="w-full ">
                        <div
                           className="flex flex-col gap-y-2 mb-4 w-full"
                           key={i}
                        >
                           <label>{`${
                              (formField.field as string)
                                 .split('')[0]
                                 .toUpperCase() +
                              (formField.field as string)
                                 .split('')
                                 .slice(
                                    1,
                                    (formField.field as string).split('')
                                       .length,
                                 )
                                 .join('')
                           }`}</label>
                           <input
                              type={formField.type}
                              onChange={(e) =>
                                 _props.setFormValues({
                                    ..._props.formValues,
                                    [formField.field as string]: e.target.value,
                                 })
                              }
                              className="px-4 py-2 flex items-center border-solid rounded-md border-[1px] border-black"
                              placeholder={formField.placeholder || ''}
                              value={
                                 _props.formValues[formField.field as string]
                              }
                           />
                        </div>
                     </div>
                  )
               );
            })}
         </form>
      </div>
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
   formValues: any;
   setFormValues: Dispatch<SetStateAction<any>>;
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
   formValues: {},
   setFormValues: () => {},
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
   const [formValues, setFormValues] = useState<any>({});
   const [formMetadata, setFormMetadata] = useState<TFormMetadata>(
      _props.initialFormMetadata,
   );

   useEffect(() => {
      console.log({ formMetadata });
   }, [formMetadata]);

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

   return (
      <formContext.Provider
         value={{
            formMetadata,
            setFormMetadata,
            formValues,
            setFormValues,
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
