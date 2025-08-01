import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/AppContext';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import StatsCards from '@/components/admin/StatsCards';
import ProductsManager from '@/components/admin/ProductsManager';
import { Card, CardContent } from '@/components/ui/card';

// Mock admin check - replace with actual Clerk role checking
const ADMIN_EMAILS = ['admin@ecommerce.com', 'owner@shop.com'];
// Dashboard Component
export default function Admin() {
  const { language } = useAppContext();
  const isRTL = language === 'ar';
function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary/10 via-brand-blue/10 to-brand-purple/10 rounded-2xl p-6 border border-primary/20">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg">
            <i className="fas fa-crown text-white text-2xl"></i>
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {isRTL ? 'مرحباً بك في لوحة التحكم' : 'Welcome to Admin Dashboard'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL ? 'إدارة متجرك الإلكتروني بسهولة وفعالية' : 'Manage your online store with ease and efficiency'}
            </p>
          </div>
        </div>
      </div>
      {/* Stats Cards */}
      <StatsCards />


      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-primary/5 to-brand-blue/5 border-primary/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-brand-blue rounded-xl mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-plus text-white text-xl"></i>
            </div>
            <h3 className="font-semibold mb-2">{isRTL ? 'إضافة منتج جديد' : 'Add New Product'}</h3>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'أضف منتجات جديدة للمتجر' : 'Add new products to your store'}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-success/5 to-brand-green/5 border-success/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-success to-brand-green rounded-xl mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-chart-line text-white text-xl"></i>
            </div>
            <h3 className="font-semibold mb-2">{isRTL ? 'عرض التقارير' : 'View Reports'}</h3>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'تحليل مبيعاتك وأرباحك' : 'Analyze your sales and profits'}
            </p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105 bg-gradient-to-br from-warning/5 to-brand-orange/5 border-warning/20">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-warning to-brand-orange rounded-xl mx-auto mb-4 flex items-center justify-center">
              <i className="fas fa-cog text-white text-xl"></i>
            </div>
            <h3 className="font-semibold mb-2">{isRTL ? 'إعدادات المتجر' : 'Store Settings'}</h3>
            <p className="text-sm text-muted-foreground">
              {isRTL ? 'تخصيص إعدادات متجرك' : 'Customize your store settings'}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


  // Mock user - replace with Clerk user
  const [user] = useState({ email: 'admin@ecommerce.com' });
  const isAdmin = ADMIN_EMAILS.includes(user?.email || '');
  if (!isAdmin) {
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20">
    <Card>
    <CardContent>

        <Card className="max-w-md mx-auto shadow-2xl border-0"></Card>
       

        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-destructive/20 to-destructive/10 rounded-full flex items-center justify-center">
          <i className="fas fa-shield-alt text-4xl text-destructive"></i>
        </div>
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-destructive to-destructive/80 bg-clip-text text-transparent">
          {isRTL ? 'وصول محظور' : 'Access Denied'}
        </h2>
        <p className="text-muted-foreground mb-6">
          {isRTL ? 'ليس لديك صلاحية للوصول لهذه الصفحة. يتطلب حساب مدير.' : 'You do not have permission to access this page. Admin account required.'}
        </p>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            {isRTL ? 'للوصول للوحة التحكم، يرجى تسجيل الدخول بحساب:' : 'To access admin dashboard, please login with:'}
          </p>
          <code className="text-xs bg-background/50 px-2 py-1 rounded mt-2 block">
            admin@ecommerce.com
          </code>
        </div>
      </CardContent>
        </Card >
      </div >
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-background to-muted/10">
        <AdminSidebar />

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/50">
            <div className="flex h-16 items-center px-6">
              <SidebarTrigger className="mr-4" />
              <div className="flex-1">
                <h1 className="text-xl font-semibold bg-gradient-primary bg-clip-text text-transparent">
                  {isRTL ? 'لوحة التحكم الإدارية' : 'Admin Dashboard'}
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm font-medium">{isRTL ? 'مرحباً، مدير' : 'Welcome, Admin'}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                  <i className="fas fa-user-shield text-white"></i>
                </div>
              </div>
            </div>
          </header>
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="container mx-auto p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/products" element={<ProductsManager />} />
                <Route path="/orders" element={
                  <div className="text-center py-16">
                    <i className="fas fa-shopping-bag text-6xl text-muted-foreground mb-4"></i>
                    <h2 className="text-2xl font-semibold mb-2">
                      {isRTL ? 'إدارة الطلبات' : 'Orders Management'}
                    </h2>
                    <p className="text-muted-foreground">
                      {isRTL ? 'قريباً...' : 'Coming soon...'}
                    </p>
                  </div>
                } />
                <Route path="/users" element={
                  <div className="text-center py-16">
                    <i className="fas fa-users text-6xl text-muted-foreground mb-4"></i>
                    <h2 className="text-2xl font-semibold mb-2">
                      {isRTL ? 'إدارة المستخدمين' : 'Users Management'}
                    </h2>
                    <p className="text-muted-foreground">
                      {isRTL ? 'قريباً...' : 'Coming soon...'}
                    </p>
                  </div>
                } />
                <Route path="/analytics" element={
                  <div className="text-center py-16">
                    <i className="fas fa-chart-line text-6xl text-muted-foreground mb-4"></i>
                    <h2 className="text-2xl font-semibold mb-2">
                      {isRTL ? 'التحليلات والتقارير' : 'Analytics & Reports'}
                    </h2>
                    <p className="text-muted-foreground">
                      {isRTL ? 'قريباً...' : 'Coming soon...'}
                    </p>
                  </div>
                } />
                <Route path="*" element={<Navigate to="/admin" replace />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>


    </SidebarProvider>
  );
}