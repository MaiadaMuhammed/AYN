import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import OffersSection from '@/components/home/OffersSection';
import BestSellersSection from '@/components/home/BestSellersSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import SidebarMenu from '@/components/home/SidebarMenu';

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-muted/30 animate-fade-in">
      <div className="container mx-auto px-2 md:px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="hidden lg:block col-span-1">
            <SidebarMenu />
          </aside>
          {/* Main Content */}
          <section className="col-span-1 lg:col-span-3 flex flex-col gap-8">
            <HeroSection />
            <OffersSection />
            <BestSellersSection />
            <CategoriesSection />
            <NewsletterSection />
          </section>
        </div>
      </div>
    </main>
  );
}