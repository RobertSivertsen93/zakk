import axios from 'axios';
import Cookies from 'js-cookie';


// API base URL - replace with your actual API base URL
// const API_BASE_URL = 'https://api.binc.pk/api';
const API_BASE_URL = 'https://zakk.finn.fo/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  // headers: {
  //   'Content-Type': 'application/json',
  // },
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = Cookies.get('auth-token');
  if (token) {
    console.log('tokenfrom api', token)
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth related API functions
interface LoginCredentials {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    email: string;
    id: string;
  };
}

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  const response:any = await api.post<AuthResponse>('/auth/login', credentials);
  // Store the token in cookies
  if (response.data.token) {
    Cookies.set('auth-token', response.data.token, { expires: 7 }); // Token expires in 7 days
  }
  return response.data;
};

export const logoutUser = () => {
  Cookies.remove('auth-token');
};

// Signup function
interface SignupCredentials extends LoginCredentials {
  confirmPassword?: string;
}

export const signupUser = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  // Remove confirmPassword before sending to API
  const { confirmPassword, ...signupData } = credentials;
  const response = await api.post<AuthResponse>('/auth/signup', signupData);
  // Store the token in cookies
  if (response.data.token) {
    Cookies.set('auth-token', response.data.token, { expires: 7 }); // Token expires in 7 days
  }
  return response.data;
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = Cookies.get('auth-token');
  console.log('Auth token:', token); // Debug log
  return !!token;
};



export const uploadPDF = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/invoices', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};