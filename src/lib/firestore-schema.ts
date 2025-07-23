// src/lib/firestore-schema.ts
import { 
  collection, 
  doc, 
  addDoc, 
  getDocs, 
  getDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  orderBy,
  limit 
} from 'firebase/firestore';
import { db } from './firebase';

// 🛍️ PRODUCTS COLLECTION
export interface Product {
  id?: string;
  title: string;
  price: number;
  description: string;
  sizes: string[];
  // New: color to image URL mapping for Printful variants
  imagesByColor?: { [color: string]: string };
  imageUrl: string; // fallback/default image
  category: 'patches' | 'tees' | 'bundles' | 'accessories';
  active: boolean;
  inventory: number;
  createdAt: Date;
  updatedAt: Date;
}

// 📝 BLOG POSTS COLLECTION
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  author: string;
  content: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  category: 'routes' | 'builds' | 'community' | 'guides';
  published: boolean;
  publishedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// 🏍️ SOLO SPOTLIGHT COLLECTION
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
  approvedAt?: Date;
}

// 🏆 MILE CHALLENGE COLLECTION
export interface MileChallenge {
  id?: string;
  riderName: string;
  email: string;
  currentMiles: number;
  targetMiles: number;
  completedRoutes: string[];
  joinedAt: Date;
  completedAt?: Date;
  badgeEarned: boolean;
}

// 📧 NEWSLETTER SUBSCRIBERS
export interface NewsletterSubscriber {
  id?: string;
  email: string;
  subscribedAt: Date;
  active: boolean;
}

// 🛒 ORDERS COLLECTION
export interface Order {
  id?: string;
  customerEmail: string;
  customerName: string;
  items: {
    productId: string;
    productTitle: string;
    price: number;
    quantity: number;
    size?: string;
  }[];
  total: number;
  stripePaymentId: string;
  status: 'pending' | 'completed' | 'cancelled' | 'refunded';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// 🔥 FIRESTORE HELPER FUNCTIONS

// Products
export const productsCollection = collection(db, 'products');

export const getProducts = async () => {
  const querySnapshot = await getDocs(query(productsCollection, where('active', '==', true)));
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
};

export const getProduct = async (id: string) => {
  const docRef = doc(db, 'products', id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Product : null;
};

export const addProduct = async (product: Omit<Product, 'id'>) => {
  return await addDoc(productsCollection, {
    ...product,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

// Blog Posts
export const blogPostsCollection = collection(db, 'blogPosts');

export const getBlogPosts = async (limitCount = 10) => {
  const querySnapshot = await getDocs(
    query(blogPostsCollection, 
      where('published', '==', true), 
      orderBy('publishedAt', 'desc'), 
      limit(limitCount)
    )
  );
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as BlogPost[];
};

export const getBlogPost = async (slug: string) => {
  const querySnapshot = await getDocs(
    query(blogPostsCollection, where('slug', '==', slug), where('published', '==', true))
  );
  return querySnapshot.docs.length > 0 
    ? { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() } as BlogPost 
    : null;
};

export const addBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  return await addDoc(blogPostsCollection, {
    ...post,
    createdAt: new Date(),
    updatedAt: new Date()
  });
};

// Solo Spotlight
export const spotlightCollection = collection(db, 'spotlights');

export const getSpotlights = async (limitCount = 6) => {
  const querySnapshot = await getDocs(
    query(spotlightCollection, 
      where('approved', '==', true), 
      orderBy('approvedAt', 'desc'), 
      limit(limitCount)
    )
  );
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Spotlight[];
};

export const addSpotlight = async (spotlight: Omit<Spotlight, 'id'>) => {
  return await addDoc(spotlightCollection, {
    ...spotlight,
    submittedAt: new Date()
  });
};

// Newsletter
export const newsletterCollection = collection(db, 'newsletter');

export const addNewsletterSubscriber = async (email: string) => {
  return await addDoc(newsletterCollection, {
    email,
    subscribedAt: new Date(),
    active: true
  });
};

// Mile Challenge
export const mileChallengeCollection = collection(db, 'mileChallenge');

export const addChallengeParticipant = async (participant: Omit<MileChallenge, 'id'>) => {
  return await addDoc(mileChallengeCollection, {
    ...participant,
    joinedAt: new Date()
  });
};

export const getChallengeLeaderboard = async (limitCount = 10) => {
  const querySnapshot = await getDocs(
    query(mileChallengeCollection, 
      orderBy('currentMiles', 'desc'), 
      limit(limitCount)
    )
  );
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MileChallenge[];
};
