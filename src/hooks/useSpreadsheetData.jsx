import { useState, useCallback } from 'react';
import { evaluate } from 'mathjs';

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

export const useSpreadsheetData = () => {
  const [data, setData] = useState([Array(26).fill({ value: '', style: {} }), Array(26).fill({ value: '', style: {} }), Array(26).fill({ value: '', style: {} })]);
  const [selectedCell, setSelectedCell] = useState(null);

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

  return {
    data,
    selectedCell,
    setSelectedCell,
    handleCellChange,
    renderCellValue,
    addRow,
    addColumn,
    applyStyle,
  };
};