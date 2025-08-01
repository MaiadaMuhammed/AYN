import React from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '@/contexts/useAppContext';

export default function Footer() {
  const { language } = useAppContext();
  const isRTL = language === 'ar';

  return (
    <footer className="bg-card border-t mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-store text-white text-sm"></i>
              </div>
              <span className="font-bold text-xl">
                AYN
              </span>
            </div>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'متجرك الإلكتروني المتميز للحصول على أفضل المنتجات بأسعار تنافسية'
                : 'Your premium e-commerce destination for the best products at competitive prices'
              }
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">
              {isRTL ? 'روابط سريعة' : 'Quick Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  {isRTL ? 'المنتجات' : 'Products'}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  {isRTL ? 'من نحن' : 'About Us'}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  {isRTL ? 'اتصل بنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-semibold mb-4">
              {isRTL ? 'خدمة العملاء' : 'Customer Service'}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cart" className="text-muted-foreground hover:text-foreground transition-colors">
                  {isRTL ? 'عربة التسوق' : 'Shopping Cart'}
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-muted-foreground hover:text-foreground transition-colors">
                  {isRTL ? 'المفضلة' : 'Favorites'}
                </Link>
              </li>
              <li>
                <Link to="/orders" className="text-muted-foreground hover:text-foreground transition-colors">
                  {isRTL ? 'طلباتي' : 'Order History'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">
              {isRTL ? 'تابعنا' : 'Follow Us'}
            </h3>
            <div className="flex space-x-4">
              <a target='_blank'
              
              href="https://github.com/MaiadaMuhammed"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                <i className="fab fa-github"></i>
              </a>
              <a target='_blank'
              
                href="https://www.linkedin.com/in/maiadafsd"

                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <i className="fab fa-linkedin"></i>
              </a>
              <a target='_blank'
                href="#"
                className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 mt-8 text-center text-muted-foreground">
          <p>
            {isRTL 
              ? `© ${new Date().getFullYear()} AYN | ميادة مُحمد | جميع الحقوق محفوظة.`
              : `© ${new Date().getFullYear()} AYN | Maiada Muhammed | All rights reserved.`
            }
          </p>
        </div>
      </div>
    </footer>
  );
}