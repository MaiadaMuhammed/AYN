import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/contexts/useAppContext';

export default function HeroSection() {
  const { language } = useAppContext();
  const isRTL = language === 'ar';
  
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: isRTL ? 'عروض حصرية على الإلكترونيات' : 'Exclusive Electronics Deals',
      subtitle: isRTL ? 'وفر حتى 50% على أحدث الأجهزة' : 'Save up to 50% on latest devices',
      image: '/images/ExclusiveElectronicsDeals.avif',
      cta: isRTL ? 'تسوق الآن' : 'Shop Now',
      link: '/products?category=smartphones'
    },
    {
      title: isRTL ? 'أزياء العصر الحديث' : 'Modern Fashion Trends',
      subtitle: isRTL ? 'اكتشف أحدث صيحات الموضة' : 'Discover the latest fashion trends',
      image: '/images/ModernFashionTrends.jpg',
      cta: isRTL ? 'استكشف المجموعة' : 'Explore Collection',
      link: '/products?category=womens-dresses'
    },
    {
      title: isRTL ? 'منتجات التجميل الفاخرة' : 'Luxury Beauty Products',
      subtitle: isRTL ? 'جمالك يستحق الأفضل' : 'Your beauty deserves the best',
      image: '/images/LuxuryBeautyProducts.jpg',
      cta: isRTL ? 'تسوق الجمال' : 'Shop Beauty',
      link: '/products?category=fragrances'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative h-[40vh] md:h-[55vh] lg:h-[60vh] overflow-hidden rounded-xl shadow mb-6">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-105 md:scale-100"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white max-w-2xl px-2 md:px-4">
              <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 animate-slide-up drop-shadow">
                {slide.title}
              </h1>
              <p className="text-base md:text-xl mb-6 animate-fade-in drop-shadow">
                {slide.subtitle}
              </p>
              <Link to={slide.link}>
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 text-base md:text-lg animate-scale-in shadow-lg"
                >
                  {slide.cta}
                  <i className="fas fa-arrow-right ml-2"></i>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            title={`Go to slide ${index + 1}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors"
        title="Previous slide"
        aria-label="Previous slide"
      >
        <i className="fas fa-chevron-left text-2xl"></i>
      </button>
      <button
        onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-primary transition-colors"
        title="Next slide"
        aria-label="Next slide"
      >
        <i className="fas fa-chevron-right text-2xl"></i>
      </button>
    </section>
  );
}