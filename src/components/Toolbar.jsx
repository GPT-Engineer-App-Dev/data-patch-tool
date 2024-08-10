import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Undo, Redo, PaintBucket, 
  Percent, DollarSign, MoreHorizontal, 
  ChevronDown, Bold, Italic, Underline, 
  AlignLeft, AlignCenter, AlignRight, 
  List, ListOrdered, IndentIncrease, IndentDecrease,
  Link2, Image, Calculator
} from "lucide-react";

const Toolbar = ({ addRow, addColumn, downloadCSV, uploadCSV, applyStyle }) => {
  return (
    <div className="flex items-center space-x-2 p-1 border-b border-gray-200 bg-gray-100">
      <Button variant="ghost" size="icon"><Undo className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><Redo className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><PaintBucket className="h-4 w-4" /></Button>
      <select className="border-none bg-transparent text-sm">
        <option>100%</option>
      </select>
      <select className="border-none bg-transparent font-sans text-sm">
        <option>Arial</option>
      </select>
      <select className="border-none bg-transparent text-sm w-14">
        <option>10</option>
      </select>
      <Button variant="ghost" size="icon"><Bold className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><Italic className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><Underline className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><DollarSign className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><Percent className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button>
      <div className="h-4 w-px bg-gray-300"></div>
      <Button variant="ghost" size="icon"><AlignLeft className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><AlignCenter className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><AlignRight className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><List className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><ListOrdered className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><IndentDecrease className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><IndentIncrease className="h-4 w-4" /></Button>
      <div className="h-4 w-px bg-gray-300"></div>
      <Button variant="ghost" size="icon"><Link2 className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><Image className="h-4 w-4" /></Button>
      <Button variant="ghost" size="icon"><Calculator className="h-4 w-4" /></Button>
    </div>
  );
};

export default Toolbar;