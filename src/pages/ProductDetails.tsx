import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { Product } from '@/types';
import { useAppContext } from '@/contexts/useAppContext';
import ProductCard from '@/components/products/ProductCard';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { products } = useProducts();
  const { addToCart, addToFavorites, favorites, language } = useAppContext();
  const [product, setProduct] = useState<Product | null>(null);
  const [similar, setSimilar] = useState<Product[]>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const isRTL = language === 'ar';

  useEffect(() => {
    const found = products.find((p) => p.id === Number(id));
    setProduct(found || null);
    if (found) {
      setSimilar(products.filter((p) => p.category === found.category && p.id !== found.id).slice(0, 4));
      setSelectedImage((found.images && found.images.length > 0) ? found.images[0] : found.thumbnail);
      setSelectedColor(found.tags && found.tags.length > 0 ? found.tags[0] : null);
      setSelectedSize(found.sizes && found.sizes.length > 0 ? found.sizes[0] : null);
    }
  }, [id, products]);

  if (!product) {
    return <div className="container mx-auto py-8 text-center text-lg">{isRTL ? 'المنتج غير موجود' : 'Product not found'}</div>;
  }

  const discounted = product.discountPercentage > 0;
  const originalPrice = discounted ? (product.price / (1 - product.discountPercentage / 100)) : product.price;

  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Gallery */}
        <div>
          <div className="relative bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-4 flex flex-col items-center">
            <img
              src={selectedImage || product.thumbnail}
              alt={product.title}
              className="w-full max-w-md h-96 object-contain rounded-xl border mb-4 bg-white"
            />
            <div className="flex gap-2 justify-center">
              {(product.images.length > 0 ? product.images : [product.thumbnail]).map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.title}
                  className={`w-16 h-16 object-cover rounded border cursor-pointer transition-all ${selectedImage === img ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>
        </div>
        {/* Product Info */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold mb-2 text-primary drop-shadow">{product.title}</h1>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-2xl font-bold text-pink-600">${product.price.toFixed(2)}</span>
            {discounted && (
              <>
                <span className="text-lg text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">-{product.discountPercentage}%</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2 text-yellow-500">
            <i className="fas fa-star"></i>
            <span className="font-medium text-base text-foreground">{product.rating}</span>
            <span className="text-muted-foreground text-sm">/ 5</span>
          </div>
          <div className="text-muted-foreground text-sm mb-2">
            <span className="mr-2">{isRTL ? 'العلامة التجارية:' : 'Brand:'} <span className="font-semibold text-foreground">{product.brand}</span></span>
            <span>{isRTL ? 'الفئة:' : 'Category:'} <span className="font-semibold text-foreground">{product.category}</span></span>
          </div>
          <p className="text-base mb-2 text-foreground">{product.description}</p>

          {/* Colors */}
          {product.tags && product.tags.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">{isRTL ? 'الألوان:' : 'Colors:'}</span>
              <div className="flex gap-2 mt-1">
                {product.tags.map((color, i) => (
                  <button
                    key={i}
                    className={`w-7 h-7 rounded-full border-2 ${selectedColor === color ? 'border-primary ring-2 ring-primary' : 'border-gray-300'} transition-all`}
                    style={{ background: color }}
                    title={color}
                    onClick={() => setSelectedColor(color)}
                  />
                ))}
              </div>
            </div>
          )}
          {/* Sizes (if available) */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-2">
              <span className="font-semibold">{isRTL ? 'المقاسات:' : 'Sizes:'}</span>
              <div className="flex gap-2 mt-1">
                {product.sizes.map((size, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 border rounded text-sm font-medium ${selectedSize === size ? 'bg-primary text-white border-primary' : 'bg-white dark:bg-zinc-900 border-gray-300 text-foreground'} transition-all`}
                    onClick={() => setSelectedSize(size)}
                  >{size}</button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => addToCart(product, 1, { size: selectedSize || undefined, color: selectedColor || undefined })}
              className="px-6 py-2 rounded bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-blue-600 transition-colors"
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              {isRTL ? 'أضف للسلة' : 'Add to Cart'}
            </button>
            <button
              onClick={() => addToFavorites(product)}
              className={`px-6 py-2 rounded border-2 font-bold transition-colors ${favorites.some(f => f.id === product.id) ? 'bg-pink-100 border-pink-400 text-pink-700' : 'border-primary text-primary bg-white dark:bg-zinc-900'}`}
            >
              <i className={`fas fa-heart mr-2 ${favorites.some(f => f.id === product.id) ? 'text-pink-500' : ''}`}></i>
              {favorites.some(f => f.id === product.id) ? (isRTL ? 'في المفضلة' : 'In Favorites') : (isRTL ? 'أضف للمفضلة' : 'Add to Favorites')}
            </button>
          </div>
        </div>
      </div>
      {/* Similar products */}
      {similar.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4">{isRTL ? 'منتجات مشابهة' : 'Similar Products'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
