
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import ShipmentManager from '@/components/shipment/ShipmentManager';

const Shipment: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{t('customsShipment')}</h1>
          <p className="text-gray-600 mt-2">{t('customsShipmentDescription')}</p>
        </div>
        <ShipmentManager />
      </div>
    </div>
  );
};

export default Shipment;
