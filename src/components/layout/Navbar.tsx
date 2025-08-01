import React, { useState } from 'react';
import sidebarCategories from '@/components/home/categoriesData';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/useAppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Navbar() {
  const { cart, favorites, language, theme, toggleLanguage, toggleTheme, user, setUser } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isRTL = language === 'ar';

  const handleLogout = () => setUser(null);
  const [showLoginOptions, setShowLoginOptions] = useState(false);
const handleMockLogin = (isAdmin = false) => {
  setUser({
    id: isAdmin ? 'admin-id' : 'user-id', 
    email: isAdmin ? 'admin@ecommerce.com' : 'demo@user.com',
    isAdmin,
  });
  setShowLoginOptions(false);
  navigate('/orders');
};


  return (
    <nav className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <i className="fas fa-store text-white text-sm"></i>
            </div>
            <span className="font-bold text-xl text-foreground">
              AYN.
            </span>
          </Link>
          {/* حذف زر الدخول/الخروج المنفرد */}

          {/* Main Navigation Links */}
          <div className="flex items-center gap-4 mr-4">
            <Link to="/about" className="font-medium text-muted-foreground hover:text-foreground transition">{isRTL ? 'عن الموقع' : 'About'}</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium text-muted-foreground hover:text-foreground transition px-2">
                  {isRTL ? 'المتجر' : 'Shop'} <i className="fas fa-chevron-down ml-1"></i>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isRTL ? 'end' : 'start'} className="w-56 max-h-96 overflow-y-auto">
                {sidebarCategories.map((cat) => (
                  <DropdownMenuItem asChild key={cat.slug}>
                    <Link to={`/category/${cat.slug}`} className="flex items-center gap-2 py-2">
                      <i className={`${cat.icon} text-primary`}></i>
                      <span>{isRTL ? cat.name.ar : cat.name.en}</span>
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/offers" className="font-medium text-muted-foreground hover:text-foreground transition">{isRTL ? 'العروض' : 'Offers'}</Link>
          </div>
          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder={isRTL ? 'البحث عن المنتجات...' : 'Search products...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4"
                dir={isRTL ? 'rtl' : 'ltr'}
              />
              <button
                type="submit"
                title={isRTL ? 'بحث' : 'Search'}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <i className="fas fa-search"></i>
              </button>
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="text-muted-foreground hover:text-foreground"
            >
              <i className="fas fa-globe mr-1"></i>
              {language === 'en' ? 'عربي' : 'EN'}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            </Button>

            {/* Favorites */}
            <Link to="/favorites">
              <Button variant="ghost" size="sm" className="relative">
                <i className="fas fa-heart text-lg"></i>
                {favorites.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                  >
                    {favorites.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="relative">
                <i className="fas fa-shopping-cart text-lg"></i>
                {cart.length > 0 && (
                  <Badge 
                    variant="destructive" 
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs"
                  >
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <i className="fas fa-user text-lg mr-2"></i>
                  {user ? user.email : (isRTL ? 'حسابي' : 'Account')}
                  <i className="fas fa-chevron-down ml-2 text-xs"></i>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user && (
                  <div className="px-4 py-2 text-xs text-muted-foreground border-b mb-1">
                    <div className="font-semibold">{user.email}</div>
                    <div>{user.email}</div>
                  </div>
                )}
                {!user && (
                <DropdownMenuItem asChild>
                  <div className="relative cursor-pointer">
                    <div
                      onClick={() => setShowLoginOptions((v) => !v)}
                      className="flex items-center"
                    >
                      <i className="fas fa-sign-in-alt mr-2"></i>
                      {isRTL ? 'تسجيل الدخول' : 'Sign In'}
                      <i className="fas fa-caret-down ml-2 text-xs"></i>
                    </div>
                    {showLoginOptions && (
                      <div className="absolute left-0 mt-2 w-40 bg-popover border rounded shadow z-50">
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-accent"
                          onClick={() => handleMockLogin(false)}
                        >
                          {isRTL ? 'مستخدم عادي' : 'Normal User'}
                        </button>
                        <button
                          className="block w-full text-left px-4 py-2 hover:bg-accent"
                          onClick={() => handleMockLogin(true)}
                        >
                          {isRTL ? 'أدمن' : 'Admin'}
                        </button>
                      </div>
                    )}
                  </div>
                </DropdownMenuItem>
                )}
                {user && (
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive">
                    <i className="fas fa-sign-out-alt mr-2"></i>
                    {isRTL ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link to="/orders" className="w-full">
                    <i className="fas fa-box mr-2"></i>
                    {isRTL ? 'طلباتي' : 'My Orders'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/admin" className="w-full">
                    <i className="fas fa-cog mr-2"></i>
                    {isRTL ? 'لوحة التحكم' : 'Admin Dashboard'}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}