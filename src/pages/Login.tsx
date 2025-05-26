import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
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
import { toast } from "sonner";
import AnimatedTransition from '@/components/AnimatedTransition';
import { loginUser, signupUser } from '@/lib/apiFunctions';

const Login = () => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = React.useState(true);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      // console.log('data', data)
      if (data.token) {
      toast.success('Logged in successfully');
      navigate('/upload');
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Login failed');
    }
  });

  const signupMutation = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      toast.success('Account created successfully');
      navigate('/upload');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Signup failed');
    }
  });
  
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    // Reset form data when switching views
    setFormData({
      username: '',
      password: '',
      confirmPassword: ''
    });
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
    
    if (!formData.username || !formData.password) {
      toast.error('Please enter both username and password');
      return;
    }

    if (!isLoginView) {
      if (formData.password !== formData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
      signupMutation.mutate(formData);
    } else {
      loginMutation.mutate({
        username: formData.username,
        password: formData.password
      });
    }
  };
  
  const isLoading = loginMutation.isPending || signupMutation.isPending;
  
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
                ? 'Enter your username and password to access your account' 
                : 'Fill in the form below to create your account'
              }
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">username</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    id="username"
                    name="username"
                    type="username"
                    placeholder="Enter your username"
                    className="pl-10"
                    value={formData.username}
                    onChange={handleInputChange}
                    required
                    autoComplete="username"
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
                    autoComplete="password"
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
              {!isLoginView && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="confirmPassword"
                      name="confirmPassword"
                      type={isPasswordVisible ? 'text' : 'password'}
                      placeholder="Confirm your password"
                      className="pl-10"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              )}
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
