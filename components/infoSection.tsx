import React from 'react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react';

const InfoSection = ({ title, content }) => {
  return (
    <>
      <Collapsible>
        <CollapsibleTrigger className='font-medium flex items-center'>{title} <ChevronsUpDown size={15} /></CollapsibleTrigger>
        <CollapsibleContent>
          {content}
        </CollapsibleContent>
      </Collapsible>
    </>
  )
};

export default InfoSection;
