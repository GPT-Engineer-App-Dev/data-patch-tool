import React from 'react';
import GoogleSheetsClone from '../components/GoogleSheetsClone';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Google Sheets Clone</h1>
        <GoogleSheetsClone />
      </div>
    </div>
  );
};

export default Index;