import React from 'react';
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const SpreadsheetTable = ({ data, handleCellChange, setSelectedCell, renderCellValue }) => {
  return (
    <div className="relative">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-gray-100">
          <TableRow>
            <TableHead className="w-10 bg-gray-100 border-b border-r border-gray-300"></TableHead>
            {ALPHABET.split('').map((letter, index) => (
              <TableHead key={index} className="bg-gray-100 text-gray-700 font-normal text-center w-24 border-b border-r border-gray-300">
                {letter}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell className="sticky left-0 z-20 font-normal text-gray-700 text-center bg-gray-100 border-r border-b border-gray-300">
                {rowIndex + 1}
              </TableCell>
              {row.map((cell, colIndex) => (
                <TableCell key={colIndex} className="p-0 border-r border-b border-gray-200">
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