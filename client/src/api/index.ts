import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
});

// Add a request interceptor to add the Clerk token
api.interceptors.request.use(async (config) => {
  // We need to get the token from Clerk
  // This will be handled in the components usually, 
  // but we can pass it here if we want a global instance.
  return config;
});

export default api;

export const fetchInvoices = async (firmId: string) => {
  const { data } = await api.get(`/invoices/${firmId}`);
  return data;
};

export const fetchClients = async (firmId: string) => {
  const { data } = await api.get(`/clients/${firmId}`);
  return data;
};

export const fetchLogs = async (firmId: string) => {
  const { data } = await api.get(`/logs/${firmId}`);
  return data;
};

export const fetchFirm = async () => {
  const { data } = await api.get('/firms/me');
  return data;
};
