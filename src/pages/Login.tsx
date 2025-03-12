
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { FileText, Lock, Mail, Eye, EyeOff } from "lucide-react";
import { toast } from "@/lib/toast";
import AnimatedTransition from '@/components/AnimatedTransition';

const Login = () => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = React.useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: ''
  });
  
  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };
  
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      // For demo purposes, accept any non-empty email/password
      if (formData.email && formData.password) {
        // Store token in localStorage
        localStorage.setItem('pdf-extractor-auth', 'demo-token');
        
        // Success message
        toast.success(isLoginView ? 'Logged in successfully' : 'Account created successfully');
        
        // Redirect to upload page
        navigate('/upload');
      } else {
        toast.error('Please enter both email and password');
      }
      
      setIsLoading(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary/30 p-4">
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <FileText className="h-6 w-6 text-primary" />
        <span className="font-medium text-lg">PDF Extractor</span>
      </div>
      
      <AnimatedTransition show={true} animation="scale" className="w-full max-w-md">
        <Card className="glass-panel border-none shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-semibold text-center">
              {isLoginView ? 'Sign in to your account' : 'Create an account'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLoginView 
                ? 'Enter your email and password to access your account' 
                : 'Fill in the form below to create your account'
              }
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="password"
                    name="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pl-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground hover:text-foreground"
                    onClick={togglePasswordVisibility}
                  >
                    {isPasswordVisible ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></div>
                    <span>{isLoginView ? 'Signing in' : 'Creating account'}</span>
                  </div>
                ) : (
                  isLoginView ? 'Sign in' : 'Create account'
                )}
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                {isLoginView ? 'Don\'t have an account?' : 'Already have an account?'}
                <Button 
                  variant="link" 
                  className="text-primary font-normal p-0 h-auto ml-1"
                  onClick={toggleView}
                  type="button"
                >
                  {isLoginView ? 'Sign up' : 'Sign in'}
                </Button>
              </p>
            </CardFooter>
          </form>
        </Card>
      </AnimatedTransition>
    </div>
  );
};

export default Login;
