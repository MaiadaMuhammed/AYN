import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useAppContext } from '@/contexts/useAppContext';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/types';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, loading } = useProducts();
  const { language } = useAppContext();
  const isRTL = language === 'ar';

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('newest');

  // Calculate max price from products
  const maxPrice = useMemo(() => {
    return Math.max(...products.map(p => p.price), 2000);
  }, [products]);

  // Update price range when products change
  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [products, selectedCategory, searchQuery, priceRange, selectedRating, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, maxPrice]);
    setSelectedRating(0);
    setSearchQuery('');
    setSearchParams({});
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <i className="fas fa-spinner fa-spin text-4xl text-primary mb-4"></i>
            <p className="text-muted-foreground">
              {isRTL ? 'جاري تحميل المنتجات...' : 'Loading products...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">
          {isRTL ? 'جميع المنتجات' : 'All Products'}
        </h1>
        
        {/* Search and Sort */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <Input
              type="text"
              placeholder={isRTL ? 'البحث في المنتجات...' : 'Search products...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
          </div>
          
          <div className="flex items-center gap-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder={isRTL ? 'ترتيب حسب' : 'Sort by'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">
                  {isRTL ? 'الأحدث' : 'Newest'}
                </SelectItem>
                <SelectItem value="price-asc">
                  {isRTL ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
                </SelectItem>
                <SelectItem value="price-desc">
                  {isRTL ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
                </SelectItem>
                <SelectItem value="rating">
                  {isRTL ? 'التقييم الأعلى' : 'Highest Rated'}
                </SelectItem>
              </SelectContent>
            </Select>
            
            <span className="text-muted-foreground text-sm">
              {filteredProducts.length} {isRTL ? 'منتج' : 'products'}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <ProductFilter
            categories={categories}
            selectedCategory={selectedCategory}
            priceRange={priceRange}
            maxPrice={maxPrice}
            selectedRating={selectedRating}
            onCategoryChange={setSelectedCategory}
            onPriceRangeChange={setPriceRange}
            onRatingChange={setSelectedRating}
            onClearFilters={clearFilters}
          />
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {isRTL ? 'لم يتم العثور على منتجات' : 'No products found'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {isRTL 
                  ? 'جرب تعديل البحث أو المرشحات للعثور على ما تبحث عنه'
                  : 'Try adjusting your search or filters to find what you\'re looking for'
                }
              </p>
              <Button onClick={clearFilters} variant="outline">
                {isRTL ? 'مسح المرشحات' : 'Clear Filters'}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}