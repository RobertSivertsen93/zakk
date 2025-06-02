
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
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Welcome to Zacchaeus
            </h1>
            <p className="text-lg text-muted-foreground">
              Choose how you'd like to process your invoices
            </p>
          </header>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Single Invoice Processing */}
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={handleSingleUpload}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="text-xl">Process Single Invoice</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  Upload and extract data from a single PDF invoice quickly and easily.
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>PDF upload and OCR extraction</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>Edit and validate extracted data</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <FileText className="h-4 w-4 mr-2 text-primary" />
                    <span>Export in multiple formats</span>
                  </div>
                </div>
                <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Start Single Processing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>

            {/* Bulk Processing */}
            <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer group" onClick={handleBulkProcessing}>
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <Ship className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl">{t('customsShipment')}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground mb-6">
                  {t('customsShipmentDescription')}
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Package className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Batch upload multiple invoices</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Package className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Review and approve in bulk</span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Package className="h-4 w-4 mr-2 text-blue-600" />
                    <span>Export customs declaration</span>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-colors"
                >
                  Start Bulk Processing
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats or Additional Info */}
          <div className="mt-12 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <div className="text-2xl font-bold text-primary">Fast</div>
                <div className="text-sm text-muted-foreground">OCR extraction in seconds</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary">Accurate</div>
                <div className="text-sm text-muted-foreground">AI-powered data validation</div>
              </div>
              <div className="p-4">
                <div className="text-2xl font-bold text-primary">Flexible</div>
                <div className="text-sm text-muted-foreground">Multiple export formats</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardHome;
