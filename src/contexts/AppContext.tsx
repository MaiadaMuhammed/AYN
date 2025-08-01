import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Product, CartItem, Order, AppContextType, User } from '@/types';
import { useToast } from '@/hooks/use-toast';


export const AppContext = createContext<AppContextType | undefined>(undefined);


interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  const [cart, setCart] = useLocalStorage<CartItem[]>("cart", []);
  const [favorites, setFavorites] = useLocalStorage<Product[]>("favorites", []);
  const [orders, setOrders] = useLocalStorage<Order[]>("orders", []);
  const [language, setLanguage] = useLocalStorage<'en' | 'ar'>("language", "en");
  const [theme, setTheme] = useLocalStorage<'light' | 'dark'>("theme", "light");
  const [user, setUser] = React.useState<User | null>(null); // mock user state
  const { toast } = useToast();

  
  // Apply theme and language to document
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
    document.documentElement.setAttribute('lang', language);
  }, [theme, language]);

  const addToCart = (product: Product, quantity: number = 1, options?: { size?: string; color?: string }) => {
    if (!user) {
      toast({
        title: language === 'ar' ? 'تنبيه' : 'Login Required',
        description: language === 'ar'
          ? 'من فضلك قم بتسجيل الدخول أولاً لتتمكن من اضافة المنتجات للسله'
          : 'Please sign in to add products to your cart.',
        variant: 'destructive',
      });
      return;
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(
        item => item.product.id === product.id && 
                 item.selectedSize === options?.size && 
                 item.selectedColor === options?.color
      );
      if (existingItem) {
        toast({
          title: language === 'ar' ? 'تم تحديث السلة' : 'Cart Updated',
          description: language === 'ar' ? 'تم زيادة الكمية' : 'Quantity increased',
          variant: 'success',
        });
        return prevCart.map(item =>
          item === existingItem
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: language === 'ar' ? 'تم إضافة المنتج' : 'Product Added',
          description: language === 'ar' ? 'تم إضافة المنتج إلى السلة' : 'Product added to cart',
          variant: 'success',
        });
        return [...prevCart, { 
          product, 
          quantity, 
          selectedSize: options?.size,
          selectedColor: options?.color 
        }];
      }
    });
  };

  const addToFavorites = (product: Product) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(fav => fav.id === product.id)) {
        toast({
          title: language === 'ar' ? 'المنتج موجود بالفعل' : 'Already in Favorites',
          description: language === 'ar' ? 'هذا المنتج موجود بالفعل في المفضلة' : 'This product is already in your favorites',
          variant: 'warning',
        });
        return prevFavorites;
      }
      toast({
        title: language === 'ar' ? 'تم إضافة للمفضلة' : 'Added to Favorites',
        description: language === 'ar' ? 'تم إضافة المنتج للمفضلة' : 'Product added to favorites',
        variant: 'success',
      });
      return [...prevFavorites, product];
    });
  };

  const removeFromFavorites = (productId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== productId));
    toast({
      title: language === 'ar' ? 'تم إزالة من المفضلة' : 'Removed from Favorites',
      description: language === 'ar' ? 'تم إزالة المنتج من المفضلة' : 'Product removed from favorites',
      variant: 'success',
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // Dummy implementations for missing context functions
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: number, quantity: number) => {
    setCart(prevCart => prevCart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  return (
    <AppContext.Provider
      value={{
        cart,
        setCart,
        favorites,
        setFavorites,
        orders,
        setOrders,
        language,
        setLanguage,
        theme,
        setTheme,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        addToFavorites,
        removeFromFavorites,
        clearCart,
        toggleLanguage,
        toggleTheme,
        user,
        setUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
