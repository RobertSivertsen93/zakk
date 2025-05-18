
import React from 'react';
import Dashboard from '../Dashboard';
import ExtractContent from './ExtractContent';

const Extract = () => {
  return (
    <Dashboard 
      title="Extract Invoice Data"
      description="Review, validate and export the extracted information from your invoice"
    >
      <ExtractContent />
    </Dashboard>
  );
};

export default Extract;
