import React, { useEffect, useRef } from 'react';
import { useAppContext } from '@/contexts/useAppContext';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    avatar?: string;
  };
  onContinue: () => void;
}

export default function UserProfile({ user, onContinue }: UserProfileProps) {
  const { language } = useAppContext();
  const cardRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const isRTL = language === 'ar';

  useEffect(() => {
    if (cardRef.current && avatarRef.current) {
      const tl = gsap.timeline();
      
      // Card entrance
      tl.fromTo(cardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );

      // Avatar pop effect
      tl.fromTo(avatarRef.current,
        { scale: 0 },
        { scale: 1, duration: 0.4, ease: "back.out(1.7)" },
        "-=0.3"
      );
    }
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle py-12 px-4">
      <Card ref={cardRef} className="w-full max-w-md">
        <CardContent className="pt-8 text-center space-y-6">
          {/* Avatar */}
          <div ref={avatarRef} className="flex justify-center">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Welcome Message */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">
              {isRTL ? 'مرحباً' : 'Welcome'}
            </h2>
            <h3 className="text-xl text-foreground">
              {user.name}
            </h3>
            <p className="text-muted-foreground">
              {user.email}
            </p>
          </div>

          {/* Success Message */}
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-2">
              <i className="fas fa-check-circle text-green-600 dark:text-green-400"></i>
              <span className="text-green-700 dark:text-green-300 font-medium">
                {isRTL ? 'تم تسجيل الدخول بنجاح' : 'Successfully signed in'}
              </span>
            </div>
          </div>

          {/* Continue Button */}
          <Button onClick={onContinue} className="w-full">
            <i className="fas fa-arrow-right mr-2"></i>
            {isRTL ? 'متابعة للمتجر' : 'Continue to Store'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}