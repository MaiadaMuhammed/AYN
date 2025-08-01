export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  sizes?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'pending' | 'completed' | 'shipped' | 'delivered';
  stripeSessionId?: string;
}

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  isAdmin?: boolean;
}

export interface Category {
  name: string;
  icon: string;
  slug: string;
}

export interface Filter {
  category: string;
  priceRange: [number, number];
  rating: number;
  brand: string;
  search: string;
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface AppContextType {
  cart: CartItem[];
  setCart: (cart: CartItem[]) => void;
  favorites: Product[];
  setFavorites: (favorites: Product[]) => void;
  orders: Order[];
  setOrders: (orders: Order[]) => void;
  language: 'en' | 'ar';
  setLanguage: (lang: 'en' | 'ar') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  addToCart: (product: Product, quantity?: number, options?: { size?: string; color?: string }) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  clearCart: () => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}