
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Package, Upload, Ship, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Navigation from '@/components/Navigation';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSingleUpload = () => {
    navigate('/upload');
  };

  const handleBulkProcessing = () => {
    navigate('/shipment');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 page-container">
        <div className="max-w-3xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Welcome to Zakk
            </h1>
            <p className="text-muted-foreground">
              Choose how you'd like to process your invoices
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Single Invoice Processing */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleSingleUpload}>
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                  <Upload className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-lg">Process Single Invoice</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  Upload and extract data from a single PDF invoice quickly and easily.
                </p>
                <Button className="w-full">
                  Start Processing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Bulk Processing */}
            <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={handleBulkProcessing}>
              <CardHeader className="text-center pb-3">
                <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                  <Ship className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">{t('customsShipment')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground text-sm mb-4">
                  {t('customsShipmentDescription')}
                </p>
                <Button variant="outline" className="w-full">
                  Start Bulk Processing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
