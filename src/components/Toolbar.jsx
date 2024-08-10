import React from 'react';
import { Button } from "@/components/ui/button";
import { Plus, Download, Upload, Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react";

const Toolbar = ({ addRow, addColumn, downloadCSV, uploadCSV, applyStyle }) => {
  return (
    <div className="mb-4 flex space-x-2 bg-gray-50 p-2 rounded-md">
      <Button onClick={addRow} variant="outline" className="bg-white hover:bg-gray-100">
        <Plus className="h-4 w-4 mr-2" />
        Add Row
      </Button>
      <Button onClick={addColumn} variant="outline" className="bg-white hover:bg-gray-100">
        <Plus className="h-4 w-4 mr-2" />
        Add Column
      </Button>
      <Button onClick={downloadCSV} variant="outline" className="bg-white hover:bg-gray-100">
        <Download className="h-4 w-4 mr-2" />
        Download CSV
      </Button>
      <Button onClick={uploadCSV} variant="outline" className="bg-white hover:bg-gray-100">
        <Upload className="h-4 w-4 mr-2" />
        Upload CSV
      </Button>
      <Button onClick={() => applyStyle({ fontWeight: 'bold' })} variant="outline" className="bg-white hover:bg-gray-100 px-3">
        <Bold className="h-4 w-4" />
      </Button>
      <Button onClick={() => applyStyle({ fontStyle: 'italic' })} variant="outline" className="bg-white hover:bg-gray-100 px-3">
        <Italic className="h-4 w-4" />
      </Button>
      <Button onClick={() => applyStyle({ textAlign: 'left' })} variant="outline" className="bg-white hover:bg-gray-100 px-3">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button onClick={() => applyStyle({ textAlign: 'center' })} variant="outline" className="bg-white hover:bg-gray-100 px-3">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button onClick={() => applyStyle({ textAlign: 'right' })} variant="outline" className="bg-white hover:bg-gray-100 px-3">
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Toolbar;