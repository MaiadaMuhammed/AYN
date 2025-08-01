import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useAppContext } from '@/contexts/useAppContext';

interface ProductFilterProps {
  categories: string[];
  selectedCategory: string;
  priceRange: [number, number];
  maxPrice: number;
  selectedRating: number;
  onCategoryChange: (category: string) => void;
  onPriceRangeChange: (range: [number, number]) => void;
  onRatingChange: (rating: number) => void;
  onClearFilters: () => void;
}

export default function ProductFilter({
  categories,
  selectedCategory,
  priceRange,
  maxPrice,
  selectedRating,
  onCategoryChange,
  onPriceRangeChange,
  onRatingChange,
  onClearFilters,
}: ProductFilterProps) {
  const { language } = useAppContext();
  const isRTL = language === 'ar';

  return (
    <Card className="sticky top-24">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            {isRTL ? 'تصفية المنتجات' : 'Filter Products'}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClearFilters}>
            <i className="fas fa-times mr-1"></i>
            {isRTL ? 'مسح' : 'Clear'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="font-semibold mb-3">
            {isRTL ? 'الفئات' : 'Categories'}
          </h3>
          <div className="space-y-2">
            <Button
              variant={selectedCategory === '' ? 'default' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => onCategoryChange('')}
            >
              {isRTL ? 'جميع الفئات' : 'All Categories'}
            </Button>
            {categories.filter(category => category && typeof category === 'string').map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => onCategoryChange(category)}
              >
                <span className="capitalize">
                  {typeof category === 'string' ? category.replace(/-/g, ' ') : category}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Price Range */}
        <div>
          <h3 className="font-semibold mb-3">
            {isRTL ? 'نطاق السعر' : 'Price Range'}
          </h3>
          <div className="space-y-4">
            <Slider
              value={priceRange}
              onValueChange={(value) => onPriceRangeChange(value as [number, number])}
              max={maxPrice}
              min={0}
              step={10}
              className="w-full"
            />
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div>
          <h3 className="font-semibold mb-3">
            {isRTL ? 'التقييم' : 'Rating'}
          </h3>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <Button
                key={rating}
                variant={selectedRating === rating ? 'default' : 'ghost'}
                size="sm"
                className="w-full justify-start"
                onClick={() => onRatingChange(rating)}
              >
                <div className="flex items-center">
                  <div className="flex text-yellow-400 mr-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i
                        key={star}
                        className={`fas fa-star text-xs ${
                          star <= rating ? '' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm">
                    {isRTL ? 'و أكثر' : '& up'}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Active Filters */}
        {(selectedCategory || selectedRating > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
          <div>
            <h3 className="font-semibold mb-3">
              {isRTL ? 'المرشحات النشطة' : 'Active Filters'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => onCategoryChange('')}>
                  {typeof selectedCategory === 'string' ? selectedCategory.replace(/-/g, ' ') : selectedCategory}
                  <i className="fas fa-times ml-1 text-xs"></i>
                </Badge>
              )}
              {selectedRating > 0 && (
                <Badge variant="secondary" className="cursor-pointer" onClick={() => onRatingChange(0)}>
                  {selectedRating}+ ⭐
                  <i className="fas fa-times ml-1 text-xs"></i>
                </Badge>
              )}
              {(priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                <Badge 
                  variant="secondary" 
                  className="cursor-pointer" 
                  onClick={() => onPriceRangeChange([0, maxPrice])}
                >
                  ${priceRange[0]} - ${priceRange[1]}
                  <i className="fas fa-times ml-1 text-xs"></i>
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}