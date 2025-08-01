// ...existing code...
import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AppProvider } from "@/contexts/AppContext";
import { useAppContext } from "@/contexts/useAppContext";
import Layout from "@/components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Favorites from "./Favorites";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Offers from "./pages/Offers";
import ProductDetails from "./pages/ProductDetails";
import CategoryPage from "./pages/CategoryPage";
import AdminDashboard from '@/pages/AdminDashboard';

// import { AdminSidebar } from "./components/admin/AdminSidebar"; 
// import ManageProducts from "./pages/ManageProducts";
// import StatsCards from "./components/admin/StatsCards";

const queryClient = new QueryClient();


function AppRoutes() {
  const { user } = useAppContext();
  const location = useLocation();
  // Detect if running in VSCode/dev (localhost)
  const isDev = typeof window !== 'undefined' && window.location.hostname === 'localhost';
  // If not dev, clear localStorage on first load (simulate new session)
  useEffect(() => {
    if (!isDev) {
      localStorage.clear();
    }
  }, [isDev]);

  // If admin and not on /auth routes, redirect to sign in
  const isAuthRoute = location.pathname.startsWith('/auth');
  if (isDev && !user && !isAuthRoute) {
    return <Navigate to="/auth" replace />;
  }
  // If user is logged in and on an auth route, redirect to home
  if (isDev && user && isAuthRoute) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/auth/signin" element={<Auth />} />
        <Route path="/auth/signup" element={<Auth />} />
 <Route path="*" element={<Navigate to="/admin" replace />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/offers" element={<Offers />} />
        
<Route path="/admin/dashboard" element={<AdminDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
