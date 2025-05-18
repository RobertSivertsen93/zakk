
import React from 'react';
import Dashboard from '../Dashboard';
import ExtractContent from './ExtractContent';

const Extract = () => {
  return (
    <Dashboard 
      title="Extract Data"
      description="Upload a PDF and review the extracted information"
    >
      <ExtractContent />
    </Dashboard>
  );
};

export default Extract;
