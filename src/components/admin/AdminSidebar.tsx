import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

const menuItems = [
  { 
    title: 'Dashboard', 
    titleAr: 'لوحة التحكم',
    url: '/admin', 
    icon: 'fas fa-tachometer-alt',
    exact: true
  },
  { 
    title: 'Products', 
    titleAr: 'المنتجات',
    url: '/admin/products', 
    icon: 'fas fa-box'
  },
  { 
    title: 'Orders', 
    titleAr: 'الطلبات',
    url: '/admin/orders', 
    icon: 'fas fa-shopping-bag'
  },
  { 
    title: 'Users', 
    titleAr: 'المستخدمين',
    url: '/admin/users', 
    icon: 'fas fa-users'
  },
  { 
    title: 'Analytics', 
    titleAr: 'التحليلات',
    url: '/admin/analytics', 
    icon: 'fas fa-chart-line'
  },
];

export function AdminSidebar() {
  const { state } = useSidebar();
  const { language } = useAppContext();
  const location = useLocation();
  const isRTL = language === 'ar';
  const collapsed = state === 'collapsed';
  
  const isActive = (path: string, exact?: boolean) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <Sidebar
      className={`${collapsed ? 'w-16' : 'w-64'} bg-gradient-to-b from-primary/10 to-brand-blue/5 border-r border-border/50`}
      collapsible="icon"
    >
      <SidebarContent>
        {/* Logo Section */}
        <div className="p-4 border-b border-border/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <i className="fas fa-store text-white text-lg"></i>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-xl bg-gradient-primary bg-clip-text text-transparent">
                  AYN.
                </h1>
                <p className="text-xs text-muted-foreground">
                  {isRTL ? 'لوحة الإدارة' : 'Admin Panel'}
                </p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup className="px-2 py-4">
          <SidebarGroupLabel className={`${collapsed ? 'sr-only' : ''} text-brand-blue font-semibold`}>
            {isRTL ? 'القائمة الرئيسية' : 'Main Menu'}
          </SidebarGroupLabel>
          
          <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.exact}
                      className={({ isActive: active }) => `
                        flex items-center px-3 py-2.5 rounded-xl transition-all duration-200
                        ${active 
                          ? 'bg-gradient-primary text-white shadow-lg transform scale-105' 
                          : 'text-foreground hover:bg-primary/10 hover:text-primary hover:scale-105'
                        }
                        ${collapsed ? 'justify-center' : 'justify-start'}
                      `}
                    >
                      <i className={`${item.icon} ${collapsed ? 'text-lg' : 'text-base mr-3'}`}></i>
                      {!collapsed && (
                        <span className="font-medium">
                          {isRTL ? item.titleAr : item.title}
                        </span>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Stats Section */}
        {!collapsed && (
          <div className="p-4 mt-auto">
            <div className="bg-gradient-to-r from-success/10 to-brand-green/10 rounded-xl p-4 border border-success/20">
              <div className="flex items-center space-x-2 mb-2">
                <i className="fas fa-crown text-success"></i>
                <span className="text-sm font-semibold text-success">
                  {isRTL ? 'مدير النظام' : 'Admin Access'}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {isRTL ? 'مرحباً بك في لوحة التحكم' : 'Welcome to dashboard'}
              </p>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
  );
}