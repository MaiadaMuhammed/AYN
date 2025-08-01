import React from 'react';
import { useAppContext } from '@/contexts/useAppContext';
import ProductCard from '@/components/products/ProductCard';

const Favorites: React.FC = () => {
  const { favorites, language } = useAppContext();
  const isRTL = language === 'ar';
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">
        {isRTL ? 'المنتجات المفضلة' : 'Favorite Products'}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.length === 0 ? (
          <p className="text-gray-500 col-span-full text-center">
            {isRTL ? 'لا توجد منتجات مفضلة بعد.' : 'No favorite products yet.'}
          </p>
        ) : (
          favorites.map(product => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </div>
  );
};

export default Favorites;
