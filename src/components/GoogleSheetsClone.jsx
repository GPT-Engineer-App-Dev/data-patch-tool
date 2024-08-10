import React, { useState, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Download } from "lucide-react";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const GoogleSheetsClone = () => {
  const [data, setData] = useState([Array(26).fill(''), Array(26).fill(''), Array(26).fill('')]);

  const handleCellChange = useCallback((rowIndex, colIndex, value) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = value;
      return newData;
    });
  }, []);

  const addRow = () => {
    setData(prevData => [...prevData, Array(prevData[0].length).fill('')]);
  };

  const addColumn = () => {
    setData(prevData => prevData.map(row => [...row, '']));
  };

  const downloadCSV = () => {
    const csvContent = data.map(row => row.join(',')).join('\n');
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Google Sheets Clone</h1>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              {data[0].map((_, index) => (
                <TableHead key={index}>{ALPHABET[index]}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell>{rowIndex + 1}</TableCell>
                {row.map((cell, colIndex) => (
                  <TableCell key={colIndex}>
                    <Input
                      value={cell}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      className="w-full"
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex space-x-2">
        <Button onClick={addRow}>
          <Plus className="h-4 w-4 mr-2" />
          Add Row
        </Button>
        <Button onClick={addColumn}>
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
        <Button onClick={downloadCSV}>
          <Download className="h-4 w-4 mr-2" />
          Download CSV
        </Button>
      </div>
    </div>
  );
};

export default GoogleSheetsClone;