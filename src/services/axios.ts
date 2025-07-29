import axios from 'axios';

export const apiClient = axios.create({
  baseURL: '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      console.error('API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        data: error.response?.data,
      });

      throw error;
    }

    throw error;
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error.config;

    // Retry apenas para erros de rede ou 5xx
    if (
      !config._retry &&
      (error.code === 'NETWORK_ERROR' ||
        (error.response?.status >= 500 && error.response?.status < 600))
    ) {
      config._retry = true;

      await new Promise((resolve) => setTimeout(resolve, 1000));

      return apiClient(config);
    }

    return Promise.reject(error);
  },
);
