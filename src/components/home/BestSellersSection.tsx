import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/contexts/useAppContext';
import { useProducts } from '@/hooks/useProducts';
import ProductCard from '@/components/products/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import gsap from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BestSellersSection() {
  const { language } = useAppContext();
  const { products, loading } = useProducts();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = language === 'ar';

  // Filter products with high ratings for best sellers
  const bestSellers = products
    .filter(product => product.rating >= 4.5)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  useEffect(() => {
    if (sectionRef.current && !loading) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power3.out" }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mx-auto mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-64 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={sectionRef} className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {isRTL ? ' الأكثر مبيعاً' : ' Best Sellers'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isRTL ? 'المنتجات الأعلى تقييماً والأكثر طلباً' : 'Top-rated and most popular products'}
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: '.bestsellers-prev',
            nextEl: '.bestsellers-next',
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="bestsellers-swiper"
        >
          {bestSellers.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="bestsellers-prev w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors" title="Previous Best Seller">
            <i className={`fas fa-chevron-${isRTL ? 'right' : 'left'}`}></i>
          </button>
          <button className="bestsellers-next w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors" title="Next Best Seller">
            <i className={`fas fa-chevron-${isRTL ? 'left' : 'right'}`}></i>
          </button>
        </div>
      </div>
    </section>
  );
}