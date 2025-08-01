import React, { ReactNode, useState, useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [showButton, setShowButton] = useState(false);
  const location = typeof window !== 'undefined' ? window.location : { pathname: '' };
  const hideNavFooter = /\/auth(\/|$)/.test(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      
      {!hideNavFooter && <Navbar />}
      <main className="flex-1">{children}
        <h1>hello</h1>
      </main>
      {!hideNavFooter && <Footer />}
      {showButton && !hideNavFooter && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 bg-primary text-white rounded-full shadow-lg p-3 hover:bg-primary/90 transition-colors"
          aria-label="Back to top"
        >
          <i className="fas fa-arrow-up"></i>
        </button>
      )}
    </div>
  );
}