import React from 'react';
import GoogleSheetsClone from '../components/GoogleSheetsClone';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Google Sheets Clone</h1>
        <GoogleSheetsClone />
      </div>
    </div>
  );
};

export default Index;