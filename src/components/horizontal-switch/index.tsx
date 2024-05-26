'use client';

import { Dispatch, SetStateAction } from 'react';

type THorizontalSwitchProps = {
   itemList: {
      id: number;
      title: string;
   }[];
   activeState: number;
   setActiveState: Dispatch<SetStateAction<number>>;
   onChoice?: (props?: any) => any;
};

export function HorizontalSwitch(_props: THorizontalSwitchProps) {
   return (
      <div className="flex items-center xl:rounded-xl md:rounded-md rounded-sm border-solid border-[2px] border-black bg-white overflow-hidden justify-center">
         {_props.itemList.map((item, i) => (
            <div
               className={`flex items-center justify-center py-1 px-8 border-solid ${
                  i === 0
                     ? 'border-r-[1px]'
                     : i === _props.itemList.length - 1
                     ? 'border-l-[1px]'
                     : 'border-x-1px'
               } border-black ${
                  _props.activeState === item.id ? 'bg-[#6FCBFF]' : 'bg-white'
               } hover:cursor-pointer hover:bg-sky-200 transition-all duration-150 w-full`}
               key={i}
               onClick={() => _props.setActiveState(item.id)}
            >
               {item.title}
            </div>
         ))}
      </div>
   );
}
