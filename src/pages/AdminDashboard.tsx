// src/pages/AdminDashboard.tsx
import React from 'react';
import Layout from '@/components/layout/Layout';
import { AdminSidebar } from '@/components/admin/AdminSidebar';
import ProductsManager from '@/components/admin/ProductsManager';
import StatsCards from '@/components/admin/StatsCards';

export default function AdminDashboard() {
  return (
    <Layout>
      <div className="flex">
        <aside className="w-1/4 p-4">
          <AdminSidebar />
        </aside>
        <main className="w-3/4 p-4 space-y-6">
        
  <h1 className="text-2xl font-bold text-red-500">Dashboard working!</h1>
  <StatsCards />

          <StatsCards />
          <ProductsManager />
        </main>
      </div>
    </Layout>
  );
}
