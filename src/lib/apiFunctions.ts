
import axios from 'axios';
import Cookies from 'js-cookie';

// API base URL - replace with your actual API base URL
// const API_BASE_URL = 'https://api.binc.pk/api';
const API_BASE_URL = 'https://zakk.finn.fo/api';

// Create axios instance with default config
export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000, // Add timeout for security
});

// Token validation utility
const isTokenValid = (token: string): boolean => {
  try {
    // Basic JWT structure validation
    const parts = token.split('.');
    if (parts.length !== 3) return false;
    
    // Decode payload to check expiration
    const payload = JSON.parse(atob(parts[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    
    return payload.exp && payload.exp > currentTime;
  } catch {
    return false;
  }
};

// Secure token storage with expiration
const setSecureToken = (token: string): void => {
  // Set httpOnly-like behavior by using secure flags
  Cookies.set('auth-token', token, { 
    expires: 7,
    secure: window.location.protocol === 'https:',
    sameSite: 'strict'
  });
};

const getSecureToken = (): string | null => {
  const token = Cookies.get('auth-token');
  if (!token || !isTokenValid(token)) {
    clearSecureToken();
    return null;
  }
  return token;
};

const clearSecureToken = (): void => {
  Cookies.remove('auth-token');
};

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = getSecureToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Add response interceptor for token validation
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearSecureToken();
      // Redirect to login on unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

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

// Input validation for credentials
const validateCredentials = (credentials: LoginCredentials): boolean => {
  const { username, password } = credentials;
  
  // Basic validation
  if (!username || !password) return false;
  if (username.length < 3 || username.length > 50) return false;
  if (password.length < 6 || password.length > 100) return false;
  
  // Prevent common injection patterns
  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /[<>]/
  ];
  
  return !dangerousPatterns.some(pattern => 
    pattern.test(username) || pattern.test(password)
  );
};

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  if (!validateCredentials(credentials)) {
    throw new Error('Invalid credentials format');
  }

  const response = await api.post<AuthResponse>('/auth/login', credentials);
  
  // Validate response token before storing
  if (response.data.token && isTokenValid(response.data.token)) {
    setSecureToken(response.data.token);
  } else {
    throw new Error('Invalid token received');
  }
  
  return response.data;
};

export const logoutUser = () => {
  clearSecureToken();
  // Clear any sensitive data from session/local storage
  sessionStorage.clear();
  // Only clear specific localStorage items to avoid breaking other apps
  const sensitiveKeys = ['pdf-data', 'pdf-url', 'pdf-file-name'];
  sensitiveKeys.forEach(key => localStorage.removeItem(key));
};

// Signup function
interface SignupCredentials extends LoginCredentials {
  confirmPassword?: string;
}

export const signupUser = async (credentials: SignupCredentials): Promise<AuthResponse> => {
  if (!validateCredentials(credentials)) {
    throw new Error('Invalid credentials format');
  }

  // Remove confirmPassword before sending to API
  const { confirmPassword, ...signupData } = credentials;
  const response = await api.post<AuthResponse>('/auth/signup', signupData);
  
  // Validate response token before storing
  if (response.data.token && isTokenValid(response.data.token)) {
    setSecureToken(response.data.token);
  } else {
    throw new Error('Invalid token received');
  }
  
  return response.data;
};

// Helper function to check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = getSecureToken();
  return !!token;
};

// Secure file upload with validation
export const uploadPDF = async (file: File): Promise<any> => {
  // Validate file before upload
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ['application/pdf'];
  
  if (!allowedTypes.includes(file.type)) {
    throw new Error('Only PDF files are allowed');
  }
  
  if (file.size > maxSize) {
    throw new Error('File size must be less than 10MB');
  }

  const formData = new FormData();
  formData.append('file', file);

  const response = await api.post('/invoices', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
