import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { useAppContext } from '@/contexts/useAppContext';

export default function CategoriesSection() {
  const { language } = useAppContext();
  const isRTL = language === 'ar';

  const categories = [
        {
      name: isRTL ? 'جميع الفئات ': 'All Categories',
      icon: 'fas fa-heartbeat',
      slug: 'health-personal-care',
      image: '/public/images/health-personal-care.jpg',
      color: 'from-blue-200 to-blue-600'
    },
    {
      name: isRTL ? 'الإلكترونيات' : 'Electronics',
      icon: 'fas fa-bolt',
      slug: 'electronics',
      image: '/public/images/electronics.jfif',
      color: 'from-blue-200 to-blue-600'
    },
    {
      name: isRTL ? 'الجوالات والإكسسوارات' : 'Mobiles & Accessories',
      icon: 'fas fa-mobile-alt',
      slug: 'mobiles-accessories',
      image: '/public/images/mobiles-accessories.webp',
      color: 'from-cyan-200 to-cyan-600'
    },
    {
      name: isRTL ? 'أجهزة الكمبيوتر والتابلت' : 'Computers & Tablets',
      icon: 'fas fa-laptop',
      slug: 'computers-tablets',
      image: '/public/images/computers-tablets.jfif',
      color: 'from-green-200 to-green-600'
    },
    {
      name: isRTL ? 'المنزل والمطبخ' : 'Home & Kitchen',
      icon: 'fas fa-couch',
      slug: 'home-kitchen',
      image: '/public/images/Home&Kitchen.webp',
      color: 'from-yellow-200 to-yellow-600'
    },
    {
      name: isRTL ? 'الموضة' : 'Fashion',
      icon: 'fas fa-tshirt',
      slug: 'fashion',
      image: '/public/images/tshirt.jfif',
      color: 'from-pink-200 to-pink-600'
    },
    {
      name: isRTL ? 'الجمال والعطور' : 'Beauty & Fragrances',
      icon: 'fas fa-heart',
      slug: 'beauty-fragrances',
      image: '/public/images/ChanelNo.5EaudeParfum.webp',
      color: 'from-purple-200 to-purple-600'
    },
    {
      name: isRTL ? 'السوبرماركت' : 'Supermarket',
      icon: 'fas fa-shopping-basket',
      slug: 'supermarket',
      image: '/public/images/OrganicAvocado.jpg',
      color: 'from-lime-200 to-lime-600'
    },
    {
      name: isRTL ? 'الإلكترونيات المنزلية' : 'Home Appliances',
      icon: 'fas fa-blender',
      slug: 'home-appliances',
      image: '/public/images/home-appliances.jfif',
      color: 'from-indigo-200 to-indigo-600'
    },
    {
      name: isRTL ? 'مستلزمات الأطفال' : 'Baby Products',
      icon: 'fas fa-baby',
      slug: 'baby-products',
      image: '/public/images/baby-products.webp',
      color: 'from-orange-200 to-orange-600'
    },
    {
      name: isRTL ? 'الساعات والنظارات' : 'Watches & Eyewear',
      icon: 'fas fa-glasses',
      slug: 'watches-eyewear',
      image: '/public/images/watches-eyewear.jpg',
      color: 'from-gray-500 to-gray-600'
    },
    {
      name: isRTL ? 'الصحة والعناية الشخصية' : 'Health & Personal Care',
      icon: 'fas fa-heartbeat',
      slug: 'health-personal-care',
      image: '/public/images/health-personal-care.jpg',
      color: 'from-red-200 to-red-600'
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'تسوق حسب الفئة' : 'Shop by Category'}
          </h2>
          <p className="text-muted-foreground text-lg">
            {isRTL 
              ? 'اكتشف مجموعة واسعة من المنتجات في فئات مختلفة'
              : 'Discover a wide range of products across different categories'
            }
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {categories.map((category, index) => (
    <Link
      key={category.slug}
      to={`/category/${category.slug}`}
      className="group"
    >
              <Card className="overflow-hidden hover-lift border-0 shadow-card">
                <CardContent className="p-0">
                  <div className="relative h-32 md:h-40 overflow-hidden rounded-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70`} />
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <i className={`${category.icon} text-2xl md:text-3xl mb-2`}></i>
                      <h3 className="text-base md:text-lg font-semibold text-center leading-tight">{category.name}</h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}