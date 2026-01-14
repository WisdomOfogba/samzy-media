import { AuthState, User } from '../types';

const STORAGE_KEY = 'portfolio_admin_auth';

// Mock user for demonstration
const MOCK_USER: User = {
  id: 'admin-1',
  email: 'admin@example.com',
  name: 'Admin User',
};

const MOCK_TOKEN = 'mock-jwt-token-xyz-123';

export const authService = {
  login: async (email: string, password: string): Promise<AuthState> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'password') {
          const authState: AuthState = {
            isAuthenticated: true,
            user: MOCK_USER,
            token: MOCK_TOKEN,
          };
          localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
          resolve(authState);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.hash = '#/login';
  },

  getAuth: (): AuthState => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return { isAuthenticated: false, user: null, token: null };
  },

  isAuthenticated: (): boolean => {
    const auth = authService.getAuth();
    return auth.isAuthenticated && !!auth.token;
  }
};
