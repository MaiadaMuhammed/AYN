import React, { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '@/hooks/useProducts';
import { useAppContext } from '@/contexts/useAppContext';
import ProductCard from '@/components/products/ProductCard';
import ProductFilter from '@/components/products/ProductFilter';
import { Button } from '@/components/ui/button';

const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products, categories, loading } = useProducts();
  const { language } = useAppContext();
  const isRTL = language === 'ar';
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  console.log("slug:", slug);
console.log("categories:", categories);
console.log("products:", products.map(p => p.category));

  // Get max price for slider
const maxPrice = useMemo(() => {
  const filtered = products.filter(p => p.category.toLowerCase() === slug?.toLowerCase());
  return Math.max(...filtered.map(p => p.price), 2000);
}, [products, slug]);


  

  // Filter products by category and filters
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.category.toLowerCase() === slug?.toLowerCase());
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    filtered = filtered.filter(product =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }
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
  }, [products, slug, searchQuery, priceRange, selectedRating, sortBy]);

  const clearFilters = () => {
    setPriceRange([0, maxPrice]);
    setSelectedRating(0);
    setSearchQuery('');
  };

  if (loading) {
    return <div className="container mx-auto py-12 text-center text-lg">{isRTL ? 'جاري التحميل...' : 'Loading...'}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 capitalize">{slug?.replace(/-/g, ' ')}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters */}
        <div className="lg:col-span-1">
          <ProductFilter
            categories={categories}
            selectedCategory={slug || ''}
            priceRange={priceRange}
            maxPrice={maxPrice}
            selectedRating={selectedRating}
            onCategoryChange={() => {}}
            onPriceRangeChange={setPriceRange}
            onRatingChange={setSelectedRating}
            onClearFilters={clearFilters}
          />
        </div>
        {/* Products Grid */}
        <div className="lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              placeholder={isRTL ? 'بحث عن منتج...' : 'Search products...'}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="input input-bordered w-full max-w-xs"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="select select-bordered ml-2"
              aria-label={isRTL ? 'ترتيب المنتجات' : 'Sort products'}
            >
              <option value="newest">{isRTL ? 'الأحدث' : 'Newest'}</option>
              <option value="price-asc">{isRTL ? 'السعر: الأقل للأعلى' : 'Price: Low to High'}</option>
              <option value="price-desc">{isRTL ? 'السعر: الأعلى للأقل' : 'Price: High to Low'}</option>
              <option value="rating">{isRTL ? 'الأعلى تقييماً' : 'Highest Rated'}</option>
            </select>
          </div>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-search text-4xl text-muted-foreground mb-4"></i>
              <h3 className="text-xl font-semibold mb-2">
                {isRTL ? 'لم يتم العثور على منتجات' : 'No products found'}
              </h3>
              <Button onClick={clearFilters} variant="outline">
                {isRTL ? 'مسح المرشحات' : 'Clear Filters'}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
