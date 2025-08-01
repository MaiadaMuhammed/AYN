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

export default function OffersSection() {
  const { language } = useAppContext();
  const { products, loading } = useProducts();
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = language === 'ar';

  // Filter products with discounts for offers
  const offersProducts = products
    .filter(product => product.discountPercentage > 10)
    .slice(0, 8);

  useEffect(() => {
    if (sectionRef.current && !loading) {
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-subtle">
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
    <section ref={sectionRef} className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {isRTL ? ' عروض حصرية' : ' Exclusive Offers'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {isRTL ? 'اكتشف أفضل العروض والخصومات' : 'Discover the best deals and discounts'}
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          navigation={{
            prevEl: '.offers-prev',
            nextEl: '.offers-next',
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          dir={isRTL ? 'rtl' : 'ltr'}
          className="offers-swiper"
        >
          {offersProducts.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation */}
        <div className="flex justify-center items-center gap-4 mt-8">
          <button className="offers-prev w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors" title="Previous Offer">
            <i className={`fas fa-chevron-${isRTL ? 'right' : 'left'}`}></i>
          </button>
          <button className="offers-next w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors" title="Next Offer">
            <i className={`fas fa-chevron-${isRTL ? 'left' : 'right'}`}></i>
          </button>
        </div>
      </div>
    </section>
  );
}