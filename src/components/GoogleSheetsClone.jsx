import React, { useRef } from 'react';
import Toolbar from './Toolbar';
import SpreadsheetTable from './SpreadsheetTable';
import { useSpreadsheetData } from '../hooks/useSpreadsheetData';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Menu, Star, Share2, MessageCircle, HelpCircle, Settings, User } from 'lucide-react';

const GoogleSheetsClone = () => {
  const {
    data,
    selectedCell,
    setSelectedCell,
    handleCellChange,
    renderCellValue,
    addRow,
    addColumn,
    applyStyle,
  } = useSpreadsheetData();

  const fileInputRef = useRef(null);

  const downloadCSV = () => {
    const csvContent = data.map(row => row.map(cell => cell.value).join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', 'spreadsheet.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const uploadCSV = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split('\n');
      const newData = lines.map(line => 
        line.split(',').map(value => ({ value, style: {} }))
      );
      setData(newData);
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full w-full bg-white">
      <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <Menu className="h-6 w-6 text-gray-500" />
          <img src="/placeholder.svg" alt="Sheets" className="h-8 w-8" />
          <div>
            <Input 
              value="Untitled spreadsheet" 
              className="font-semibold text-lg border-none focus:ring-0"
            />
            <div className="flex space-x-2 text-sm text-gray-600">
              <Button variant="ghost" size="sm" className="p-0 h-auto">File</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">Edit</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">View</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">Insert</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">Format</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">Data</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">Tools</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">Extensions</Button>
              <Button variant="ghost" size="sm" className="p-0 h-auto">Help</Button>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Star className="h-6 w-6 text-gray-500" />
          <Button variant="ghost" className="text-blue-600">
            <MessageCircle className="h-4 w-4 mr-2" />
            Share
          </Button>
          <User className="h-8 w-8 text-gray-500 bg-gray-200 rounded-full p-1" />
        </div>
      </header>
      <Toolbar
        addRow={addRow}
        addColumn={addColumn}
        downloadCSV={downloadCSV}
        uploadCSV={uploadCSV}
        applyStyle={applyStyle}
      />
      <div className="flex-grow overflow-auto">
        <SpreadsheetTable
          data={data}
          handleCellChange={handleCellChange}
          setSelectedCell={setSelectedCell}
          renderCellValue={renderCellValue}
        />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".csv"
      />
    </div>
  );
};

export default GoogleSheetsClone;