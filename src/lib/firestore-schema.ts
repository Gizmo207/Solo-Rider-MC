// Firestore get all products
import { collection, getDocs } from 'firebase/firestore';

export async function getProducts(): Promise<Product[]> {
  const productsCol = collection(db, 'products');
  const productsSnap = await getDocs(productsCol);
  return productsSnap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
}
// firestore-schema.ts - Firestore schema definitions and Firestore helpers

// Product type
export interface Product {
  id?: string;
  title: string;
  price: number;
  description: string;
  sizes: string[];
  imageUrl: string;
  category: string;
  active: boolean;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
  imagesByColor?: { [color: string]: string[] };
}

// BlogPost type
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  author: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  category: string;
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Spotlight type
export interface Spotlight {
  id?: string;
  riderName: string;
  location: string;
  bikeModel: string;
  bikeYear: number;
  imageUrl: string;
  story: string;
  approved: boolean;
  featured: boolean;
  submittedAt: Date;
  approvedAt: Date;
}

// Firestore add stubs
export async function addProduct(product: Omit<Product, 'id'>) {
  // TODO: Implement Firestore add logic
  return Promise.resolve();
}
export async function addBlogPost(post: Omit<BlogPost, 'id'>) {
  // TODO: Implement Firestore add logic
  return Promise.resolve();
}
export async function addSpotlight(spotlight: Omit<Spotlight, 'id'>) {
  // TODO: Implement Firestore add logic
  return Promise.resolve();
}

// Firestore get product by ID
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getProductById(productId: string): Promise<Product | null> {
  const docRef = doc(db, 'products', productId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Product;
  }
  return null;
}
