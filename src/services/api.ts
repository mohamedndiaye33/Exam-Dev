import axios, { type InternalAxiosRequestConfig } from 'axios';

const API_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
});

// Intercepteur avec typage TypeScript pour Axios
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Typage des structures de données
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  displayPrice?: number; // Optionnel, utilisé pour la conversion
  stock: number;
  category: string;
}

export interface ConversionResult {
  originalAmount: number;
  currencyFrom: string;
  currencyTo: string;
  convertedAmount: number;
}

// 🎮 SERVICES PRODUITS
export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get<Product[]>('/products');
  return response.data;
};

// 🔐 SERVICES AUTHENTIFICATION
export const loginUser = async (email: string, password: string): Promise<{ access_token: string }> => {
  const response = await api.post<{ access_token: string }>('/auth/login', { email, password });
  if (response.data.access_token) {
    localStorage.setItem('token', response.data.access_token);
  }
  return response.data;
};

// 💶 SERVICES API EXTERNE (Conversion)
export const getConvertedPrice = async (amount: number, targetCurrency: string): Promise<ConversionResult> => {
  const response = await api.get<ConversionResult>('/currencies/convert', {
    params: { amount, to: targetCurrency },
  });
  return response.data;
};