import { sqlDb } from './sqlDatabase.ts';
import { UltrabookProduct, TechArticle } from '../types.ts';

// Re-export sqlDb as db for seamless backwards compatibility
export const db = {
  getProducts: (): UltrabookProduct[] => sqlDb.getProducts(),
  getProductById: (id: string): UltrabookProduct | undefined => sqlDb.getProductById(id),
  createProduct: (data: Partial<UltrabookProduct>): UltrabookProduct => sqlDb.createProduct(data),
  updateProduct: (id: string, updates: Partial<UltrabookProduct>): UltrabookProduct | null => sqlDb.updateProduct(id, updates),
  deleteProduct: (id: string): boolean => sqlDb.deleteProduct(id),
  resetProducts: (): UltrabookProduct[] => sqlDb.resetProducts(),

  getArticles: (): TechArticle[] => sqlDb.getArticles(),
  getArticleById: (id: string): TechArticle | undefined => sqlDb.getArticleById(id),
  createArticle: (data: Partial<TechArticle>): TechArticle => sqlDb.createArticle(data),
  updateArticle: (id: string, updates: Partial<TechArticle>): TechArticle | null => sqlDb.updateArticle(id, updates),
  deleteArticle: (id: string): boolean => sqlDb.deleteArticle(id),
  resetArticles: (): TechArticle[] => sqlDb.resetArticles(),

  getStats: () => sqlDb.getStats(),
  ready: () => sqlDb.ready(),
};
