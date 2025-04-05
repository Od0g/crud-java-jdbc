// src/services/api.ts
import axios, { AxiosError } from 'axios';
import { Machine, ServiceOrder, Labor, Part } from '../types/models';

// Configuração base do Axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptadores de Request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptadores de Response
api.interceptors.response.use(
  response => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Helper Functions
const handleRequest = async <T>(promise: Promise<T>): Promise<T> => {
  try {
    return await promise;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || error.message);
    }
    throw error;
  }
};

// Serviço de Autenticação
export const authService = {
  login: (username: string, password: string) =>
    handleRequest(api.post<{ token: string }>('/api/auth/login', { username, password })),
  
  signup: (userData: { username: string; password: string; name: string; email: string }) =>
    handleRequest(api.post<{ success: boolean; message: string }>('/api/auth/signup', userData)),
  
  logout: () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  },
  
  validateToken: () =>
    handleRequest(api.get<{ valid: boolean }>('/api/auth/validate')),

  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  }
};

// Serviço de Máquinas
export const machineService = {
  getAll: () => handleRequest(api.get<Machine[]>('/machines')),
  getById: (id: number) => handleRequest(api.get<Machine>(`/machines/${id}`)),
  create: (machine: Omit<Machine, 'id'>) => handleRequest(api.post<Machine>('/machines', machine)),
  update: (id: number, machine: Partial<Machine>) => handleRequest(api.put<Machine>(`/machines/${id}`, machine)),
  delete: (id: number) => handleRequest(api.delete(`/machines/${id}`))
};

// Serviço de Ordens de Serviço
export const serviceOrderService = {
  getAll: () => handleRequest(api.get<ServiceOrder[]>('/service-orders')),
  getById: (id: number) => handleRequest(api.get<ServiceOrder>(`/service-orders/${id}`)),
  create: (order: Omit<ServiceOrder, 'id'>) => handleRequest(api.post<ServiceOrder>('/service-orders', order)),
  update: (id: number, order: Partial<ServiceOrder>) => handleRequest(api.put<ServiceOrder>(`/service-orders/${id}`, order)),
  delete: (id: number) => handleRequest(api.delete(`/service-orders/${id}`)),
  updateStatus: (id: number, status: ServiceOrder['status']) =>
    handleRequest(api.patch(`/service-orders/${id}/status`, { status }))
};

// Serviço de Mão de Obra
export const laborService = {
  getAll: () => handleRequest(api.get<Labor[]>('/labor')),
  getByOrder: (orderId: number) => handleRequest(api.get<Labor[]>(`/labor?orderId=${orderId}`)),
  create: (labor: Omit<Labor, 'id'>) => handleRequest(api.post<Labor>('/labor', labor)),
  update: (id: number, labor: Partial<Labor>) => handleRequest(api.put<Labor>(`/labor/${id}`, labor)),
  delete: (id: number) => handleRequest(api.delete(`/labor/${id}`))
};

// Serviço de Peças
export const partService = {
  getAll: () => handleRequest(api.get<Part[]>('/parts')),
  getById: (id: number) => handleRequest(api.get<Part>(`/parts/${id}`)),
  create: (part: Omit<Part, 'id'>) => handleRequest(api.post<Part>('/parts', part)),
  update: (id: number, part: Partial<Part>) => handleRequest(api.put<Part>(`/parts/${id}`, part)),
  delete: (id: number) => handleRequest(api.delete(`/parts/${id}`)),
  updateStock: (id: number, quantity: number) =>
    handleRequest(api.patch<Part>(`/parts/${id}/stock`, { quantity }))
};

// Serviço de Relatórios
export const reportService = {
  getDashboardMetrics: () => handleRequest(api.get('/reports/dashboard')),
  generateMaintenanceReport: (machineId: number) =>
    handleRequest(api.get(`/reports/maintenance/${machineId}`, { responseType: 'blob' })),
  generateCostReport: (params: { startDate: string; endDate: string }) =>
    handleRequest(api.get('/reports/costs', { params }))
};

export default api;
