import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/useAppContext';

const sidebarCategories = [
  {
    name: {
      ar: 'الإلكترونيات',
      en: 'Electronics'
    },
    slug: 'electronics',
    icon: 'fas fa-bolt'
  },
  {
    name: {
      ar: 'الجوالات والإكسسوارات',
      en: 'Mobiles & Accessories'
    },
    slug: 'mobiles-accessories',
    icon: 'fas fa-mobile-alt'
  },
  {
    name: {
      ar: 'أجهزة الكمبيوتر والتابلت',
      en: 'Computers & Tablets'
    },
    slug: 'computers-tablets',
    icon: 'fas fa-laptop'
  },
  {
    name: {
      ar: 'المنزل والمطبخ',
      en: 'Home & Kitchen'
    },
    slug: 'home-kitchen',
    icon: 'fas fa-couch'
  },
  {
    name: {
      ar: 'الموضة',
      en: 'Fashion'
    },
    slug: 'fashion',
    icon: 'fas fa-tshirt'
  },
  {
    name: {
      ar: 'الجمال والعطور',
      en: 'Beauty & Fragrances'
    },
    slug: 'beauty-fragrances',
    icon: 'fas fa-heart'
  },
  {
    name: {
      ar: 'السوبرماركت',
      en: 'Supermarket'
    },
    slug: 'supermarket',
    icon: 'fas fa-shopping-basket'
  },
  {
    name: {
      ar: 'الإلكترونيات المنزلية',
      en: 'Home Appliances'
    },
    slug: 'home-appliances',
    icon: 'fas fa-blender'
  },
  {
    name: {
      ar: 'مستلزمات الأطفال',
      en: 'Baby Products'
    },
    slug: 'baby-products',
    icon: 'fas fa-baby'
  },
  {
    name: {
      ar: 'الساعات والنظارات',
      en: 'Watches & Eyewear'
    },
    slug: 'watches-eyewear',
    icon: 'fas fa-glasses'
  },
  {
    name: {
      ar: 'الصحة والعناية الشخصية',
      en: 'Health & Personal Care'
    },
    slug: 'health-personal-care',
    icon: 'fas fa-heartbeat'
  }
];



const SidebarMenu: React.FC = () => {
  const { language } = useAppContext();
  const isRTL = language === 'ar';
  return (
    <aside className="sticky top-24 h-fit bg-white dark:bg-zinc-900 rounded-lg shadow p-4 w-full max-w-xs border mx-auto mb-8">
      <h3 className="text-lg font-bold mb-4 text-center">
        {isRTL ? 'كل الأقسام' : 'All Categories'}
      </h3>
      <ul className="space-y-2">
        {sidebarCategories.map((cat) => (
          <li key={cat.slug}>
            <Link
              to={`/category/${cat.slug}`}
              className="flex items-center gap-3 px-3 py-2 rounded hover:bg-muted transition"
            >
              <i className={`${cat.icon} text-xl text-primary`}></i>
              <span className="font-medium">{isRTL ? cat.name.ar : cat.name.en}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default SidebarMenu;
