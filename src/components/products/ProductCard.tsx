import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/types';
import { useAppContext } from '@/contexts/useAppContext';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, addToFavorites, removeFromFavorites, favorites, language } = useAppContext();
  const isRTL = language === 'ar';
  const isFavorite = favorites.some(fav => fav.id === product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const discountedPrice = product.price * (1 - product.discountPercentage / 100);

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group overflow-hidden hover-lift border-0 shadow-card h-full">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Discount Badge */}
            {product.discountPercentage > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute top-2 left-2 z-10"
              >
                -{Math.round(product.discountPercentage)}%
              </Badge>
            )}

            {/* Favorite Button */}
            <button
              onClick={handleToggleFavorite}
              className={`absolute top-2 right-2 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                isFavorite 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
              }`}
            >
              <i className={`fas fa-heart text-sm ${isFavorite ? '' : 'far'}`}></i>
            </button>

            {/* Stock Status */}
            {product.stock < 5 && (
              <Badge 
                variant="secondary" 
                className="absolute bottom-2 left-2 bg-orange-500 text-white"
              >
                {isRTL ? `باقي ${product.stock}` : `Only ${product.stock} left`}
              </Badge>
            )}
          </div>

          <div className="p-4">
            <div className="mb-2">
              <Badge variant="secondary" className="text-xs">
                {product.category}
              </Badge>
            </div>
            
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {product.title}
            </h3>
            
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {product.description}
            </p>

            {/* Rating */}
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <i
                    key={star}
                    className={`fas fa-star text-xs ${
                      star <= Math.round(product.rating) ? '' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground ml-1">
                ({product.rating.toFixed(1)})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-primary">
                  ${discountedPrice.toFixed(2)}
                </span>
                {product.discountPercentage > 0 && (
                  <span className="text-sm text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            onClick={handleAddToCart}
            className="w-full group-hover:bg-primary group-hover:text-primary-foreground"
            variant="outline"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? (
              <>
                <i className="fas fa-times mr-2"></i>
                {isRTL ? 'نفذ المخزون' : 'Out of Stock'}
              </>
            ) : (
              <>
                <i className="fas fa-cart-plus mr-2"></i>
                {isRTL ? 'أضف للسلة' : 'Add to Cart'}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}