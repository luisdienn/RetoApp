import React from "react";
import { ChevronDownIcon } from "lucide-react";
import { Accordion as AccordionPrimitive } from "radix-ui";
import CalendarComp from "./CalendarComp";

import { Accordion, AccordionContent, AccordionItem } from "../../ui/accordion";


export default function AccordionComp({ fields }: any) {
  return (
    <div className="space-y-4 text-white">
      <h2 className="text-2xl font-bold text-[#f9e7b8]">Fields</h2>
      <Accordion type="single" collapsible className="w-full " defaultValue="3">
        {fields.map((field: any) => (
          <AccordionItem value={field.id} key={field.id} className="py-2 ">
            <AccordionPrimitive.Header className="flex">
              <AccordionPrimitive.Trigger className="hover:cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-center justify-between rounded-md py-2 text-left text-[15px] leading-6 font-semibold transition-all outline-none focus-visible:ring-[3px] [&[data-state=open]>svg]:rotate-180">
                <span className="flex flex-col space-y-1" >
                  <span className="text-lg">{field.name}</span>

                  <div className="flex gap-4">
                    <span className="flex text-sm font-normal text-gray-300">
                      <p className="font-bold pr-1">Size: </p>
                      {field.size}
                    </span>
                    <span className="flex text-sm font-normal text-gray-300">
                      <p className="font-bold pr-1">Price: </p> ${field.price}
                    </span>
                  </div>
                </span>
                <ChevronDownIcon
                  size={16}
                  className="pointer-events-none shrink-0 opacity-60 transition-transform duration-200"
                  aria-hidden="true"
                />
              </AccordionPrimitive.Trigger>
            </AccordionPrimitive.Header>
            <AccordionContent className="text-muted-foreground py-6">

              {/* CALENDAR */}
              <CalendarComp field={field}/>
            
            
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
