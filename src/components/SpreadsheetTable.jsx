import React from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const SpreadsheetTable = ({ data, handleCellChange, setSelectedCell, renderCellValue }) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-12 bg-white"></TableHead>
            {ALPHABET.split('').map((letter, index) => (
              <TableHead key={index} className="bg-gray-50 text-gray-500 font-normal text-center w-24 border-b border-gray-200">
                {letter}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-gray-50">
              <TableCell className="font-normal text-gray-500 text-center bg-gray-50 border-r border-gray-200">{rowIndex + 1}</TableCell>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex} className="p-0 border border-gray-200">
                  <Input
                    value={cell.value}
                    onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                    onFocus={() => setSelectedCell([rowIndex, colIndex])}
                    className="w-full h-full border-none focus:ring-2 focus:ring-blue-500"
                    style={cell.style}
                  />
                  {cell.value.startsWith('=') && (
                    <div className="text-xs text-gray-500 absolute bottom-0 right-0 pr-1">
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
  );
};

export default SpreadsheetTable;