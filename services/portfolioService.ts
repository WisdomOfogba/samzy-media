import { PortfolioWork } from '../types';
import { API_DELAY } from '../constants';

const STORAGE_KEY = 'portfolio_works_db';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStoredWorks = (): PortfolioWork[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const setStoredWorks = (works: PortfolioWork[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(works));
};

export const portfolioService = {
  getAll: async (): Promise<PortfolioWork[]> => {
    await delay(API_DELAY);
    return getStoredWorks().sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  },

  getById: async (id: string): Promise<PortfolioWork | undefined> => {
    await delay(API_DELAY);
    const works = getStoredWorks();
    return works.find(w => w.id === id);
  },

  create: async (work: Omit<PortfolioWork, 'id' | 'createdAt'>): Promise<PortfolioWork> => {
    await delay(API_DELAY);
    const works = getStoredWorks();
    const newWork: PortfolioWork = {
      ...work,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    works.push(newWork);
    setStoredWorks(works);
    return newWork;
  },

  update: async (id: string, updates: Partial<PortfolioWork>): Promise<PortfolioWork> => {
    await delay(API_DELAY);
    const works = getStoredWorks();
    const index = works.findIndex(w => w.id === id);
    
    if (index === -1) throw new Error('Work not found');
    
    const updatedWork = { ...works[index], ...updates };
    works[index] = updatedWork;
    setStoredWorks(works);
    return updatedWork;
  },

  delete: async (id: string): Promise<void> => {
    await delay(API_DELAY);
    const works = getStoredWorks();
    const filtered = works.filter(w => w.id !== id);
    setStoredWorks(filtered);
  }
};
