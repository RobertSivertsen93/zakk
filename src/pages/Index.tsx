
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { PersonStanding, Upload, Edit3, Download, ArrowRight } from "lucide-react";
import AnimatedTransition from '@/components/AnimatedTransition';

const Index = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = React.useState(false);
  
  React.useEffect(() => {
    // Animate content in after mount
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const features = [
    {
      icon: <Upload className="h-12 w-12 text-primary" />,
      title: "Upload PDFs",
      description: "Drag and drop your PDF invoices for instant processing"
    },
    {
      icon: <Edit3 className="h-12 w-12 text-primary" />,
      title: "Extract Data",
      description: "Automatically extract and edit invoice information"
    },
    {
      icon: <Download className="h-12 w-12 text-primary" />,
      title: "Export Results",
      description: "Export to JSON, CSV, or plain text formats"
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full border-b bg-background/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <PersonStanding className="h-6 w-6 text-primary" />
            <span className="font-medium text-lg">Zacchaeus</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
            <Button onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="py-20 px-4">
          <AnimatedTransition show={showContent} animation="scale" className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight mb-6">
              Extract Data from PDF Invoices
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-10">
              Transform your invoice PDFs into structured data with precision and ease
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button 
                size="lg" 
                className="rounded-full gap-2"
                onClick={() => navigate('/login')}
              >
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </AnimatedTransition>
        </section>
        
        {/* Features section */}
        <section className="py-20 px-4 bg-secondary/50">
          <div className="max-w-6xl mx-auto">
            <AnimatedTransition show={showContent} animation="fade" className="text-center mb-16">
              <h2 className="text-3xl font-semibold tracking-tight mb-4">
                Streamline Your Invoice Processing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Extract, validate, and organize your invoice data in just a few clicks
              </p>
            </AnimatedTransition>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <AnimatedTransition 
                  key={index} 
                  show={showContent} 
                  animation="blur" 
                  className="glass-card flex flex-col items-center text-center p-8"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </AnimatedTransition>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 px-4">
          <AnimatedTransition show={showContent} animation="fade" className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-semibold tracking-tight mb-4">
              Ready to Automate Your Invoice Processing?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Sign up now and start extracting data from your PDF invoices
            </p>
            <Button 
              size="lg" 
              className="rounded-full"
              onClick={() => navigate('/login')}
            >
              Get Started
            </Button>
          </AnimatedTransition>
        </section>
      </main>
      
      <footer className="py-8 px-4 border-t">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <PersonStanding className="h-5 w-5 text-primary" />
            <span className="font-medium">Zacchaeus</span>
          </div>
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Zacchaeus. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
