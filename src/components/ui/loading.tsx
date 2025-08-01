import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/contexts/useAppContext';
import gsap from 'gsap';

interface LoadingProps {
  message?: string;
}

export default function Loading({ message }: LoadingProps) {
  const { language } = useAppContext();
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const isRTL = language === 'ar';

  useEffect(() => {
    if (logoRef.current && textRef.current) {
      const tl = gsap.timeline({ repeat: -1 });
      
      // Logo animation
      tl.fromTo(logoRef.current, 
        { scale: 0.8, opacity: 0.7 },
        { scale: 1.2, opacity: 1, duration: 1, ease: "power2.inOut" }
      )
      .to(logoRef.current, 
        { scale: 0.8, opacity: 0.7, duration: 1, ease: "power2.inOut" }
      );

      // Text fade animation
      gsap.fromTo(textRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-subtle">
      <div className="text-center space-y-8">
        {/* Logo */}
        <div ref={logoRef} className="flex justify-center">
          <div className="w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-elegant">
            <span className="text-3xl font-bold text-white">AYN</span>
          </div>
        </div>

        {/* Brand Name */}
        <div ref={textRef} className="space-y-2">
          <h1 className="text-4xl font-bold text-foreground">
            AYN.
          </h1>
          <p className="text-muted-foreground">
            {message || (isRTL ? 'جارٍ التحميل...' : 'Loading...')}
          </p>
        </div>

        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    </div>
  );
}