import React, { useState, useCallback, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Download, Upload, Bold, Italic, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { evaluate } from 'mathjs';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const GoogleSheetsClone = () => {
  const [data, setData] = useState([Array(26).fill({ value: '', style: {} }), Array(26).fill({ value: '', style: {} }), Array(26).fill({ value: '', style: {} })]);
  const [selectedCell, setSelectedCell] = useState(null);
  const fileInputRef = useRef(null);

  const handleCellChange = useCallback((rowIndex, colIndex, value) => {
    setData(prevData => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = { ...newData[rowIndex][colIndex], value };
      return newData;
    });
  }, []);

  const evaluateFormula = (formula, rowIndex, colIndex) => {
    try {
      const cellRegex = /([A-Z])(\d+)/g;
      const evaluatedFormula = formula.replace(cellRegex, (match, col, row) => {
        const colIndex = ALPHABET.indexOf(col);
        const rowIndex = parseInt(row) - 1;
        return data[rowIndex][colIndex].value;
      });
      return evaluate(evaluatedFormula);
    } catch (error) {
      console.error('Formula evaluation error:', error);
      return '#ERROR';
    }
  };

  const renderCellValue = (cell, rowIndex, colIndex) => {
    if (cell.value.startsWith('=')) {
      return evaluateFormula(cell.value.slice(1), rowIndex, colIndex);
    }
    return cell.value;
  };

  const addRow = () => {
    setData(prevData => [...prevData, Array(prevData[0].length).fill({ value: '', style: {} })]);
  };

  const addColumn = () => {
    setData(prevData => prevData.map(row => [...row, { value: '', style: {} }]));
  };

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

  const applyStyle = (style) => {
    if (!selectedCell) return;
    const [rowIndex, colIndex] = selectedCell;
    setData(prevData => {
      const newData = [...prevData];
      newData[rowIndex][colIndex] = {
        ...newData[rowIndex][colIndex],
        style: { ...newData[rowIndex][colIndex].style, ...style }
      };
      return newData;
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enhanced Google Sheets Clone</h1>
      <div className="mb-4 flex space-x-2">
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
        <Button onClick={() => fileInputRef.current.click()}>
          <Upload className="h-4 w-4 mr-2" />
          Upload CSV
        </Button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          accept=".csv"
        />
        <Button onClick={() => applyStyle({ fontWeight: 'bold' })}>
          <Bold className="h-4 w-4" />
        </Button>
        <Button onClick={() => applyStyle({ fontStyle: 'italic' })}>
          <Italic className="h-4 w-4" />
        </Button>
        <Button onClick={() => applyStyle({ textAlign: 'left' })}>
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button onClick={() => applyStyle({ textAlign: 'center' })}>
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button onClick={() => applyStyle({ textAlign: 'right' })}>
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
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
                  <TableCell key={colIndex} style={cell.style}>
                    <Input
                      value={cell.value}
                      onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                      onFocus={() => setSelectedCell([rowIndex, colIndex])}
                      className="w-full"
                    />
                    {cell.value.startsWith('=') && (
                      <div className="text-xs text-gray-500">
                        {renderCellValue(cell, rowIndex, colIndex)}
                      </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default GoogleSheetsClone;