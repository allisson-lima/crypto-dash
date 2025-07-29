// Função para obter variável de ambiente com fallback
function getEnvVar(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) {
    console.warn(`⚠️  Environment variable ${key} is not set`);
    return '';
  }
  return value;
}

// Configuração com fallbacks para desenvolvimento
export const config = {
  // API Configuration
  coingecko: {
    apiKey: getEnvVar('NEXT_PUBLIC_API_KEY', 'CG-4CkXcUqowTRH1ZG63yVY5YYj'),
    baseUrl: getEnvVar(
      'NEXT_PUBLIC_API_URL',
      'https://api.coingecko.com/api/v3',
    ),
    timeout: 15000,
  },

  // App Configuration
  app: {
    name: getEnvVar('NEXT_PUBLIC_APP_NAME', 'CryptoDash'),
    version: getEnvVar('NEXT_PUBLIC_APP_VERSION', '1.0.0'),
  },

  // Cache Configuration
  cache: {
    coins: {
      staleTime: 30 * 1000, // 30 segundos
      refetchInterval: 60 * 1000, // 1 minuto
    },
    coinDetail: {
      staleTime: 2 * 60 * 1000, // 2 minutos
      refetchInterval: 5 * 60 * 1000, // 5 minutos
    },
    search: {
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
    global: {
      staleTime: 2 * 60 * 1000, // 2 minutos
      refetchInterval: 5 * 60 * 1000, // 5 minutos
    },
  },

  // Rate Limiting
  rateLimit: {
    windowMs: 60 * 1000, // 1 minuto
    maxRequests: 100, // máximo 100 requests por minuto
  },
} as const;

// Validação apenas em produção ou quando explicitamente solicitado
export function validateConfig() {
  const requiredVars = [
    { key: 'COINGECKO_API_KEY', value: config.coingecko.apiKey },
    { key: 'COINGECKO_BASE_URL', value: config.coingecko.baseUrl },
  ];

  const missing = requiredVars.filter(({ value }) => !value);

  if (missing.length > 0 && process.env.NODE_ENV === 'production') {
    throw new Error(
      `Missing required environment variables: ${missing
        .map(({ key }) => key)
        .join(', ')}`,
    );
  }

  return config;
}

// Log da configuração atual (sem expor a API key)
if (process.env.NODE_ENV === 'development') {
  console.log('🔧 Config loaded:', {
    coingecko: {
      baseUrl: config.coingecko.baseUrl,
      apiKey: config.coingecko.apiKey
        ? '***' + config.coingecko.apiKey.slice(-4)
        : 'NOT_SET',
    },
    app: config.app,
  });
}

// Type para autocompletar
export type Config = typeof config;
