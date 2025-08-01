import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '@/contexts/useAppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import Loading from '@/components/ui/loading';
import UserProfile from '@/components/auth/UserProfile';

export default function Auth() {
  const { language, setUser } = useAppContext();
  const { toast } = useToast();
  const navigate = useNavigate();
  const cardRef = useRef<HTMLDivElement>(null);
  const isRTL = language === 'ar';
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.9, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock authentication - replace with Clerk
    const mockUser = {
      firstName: isLogin ? 'John' : formData.firstName,
      lastName: isLogin ? 'Doe' : formData.lastName,
      email: formData.email,
      isAdmin: ['admin@ecommerce.com', 'owner@shop.com'].includes(formData.email),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.email}`,
    };

    setUserData(mockUser);
    setUser({
      id: 'mock-id',
      ...mockUser
    });
    setIsLoading(false);
    setShowUserProfile(true);
  };

  const handleContinue = () => {
    // Check if admin
    const adminEmails = ['admin@ecommerce.com', 'owner@shop.com'];
    if (adminEmails.includes(formData.email)) {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Show loading screen
  if (isLoading) {
    return (
      <Loading 
        message={isLogin 
          ? (isRTL ? 'جارٍ تسجيل الدخول...' : 'Signing you in...') 
          : (isRTL ? 'جارٍ إنشاء الحساب...' : 'Creating your account...')
        } 
      />
    );
  }

  // Show user profile after successful auth
  if (showUserProfile && userData) {
    return <UserProfile user={userData} onContinue={handleContinue} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-subtle py-12 px-4">
      <Card ref={cardRef} className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLogin 
              ? (isRTL ? 'تسجيل الدخول' : 'Sign In')
              : (isRTL ? 'إنشاء حساب جديد' : 'Create Account')
            }
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin 
              ? (isRTL ? 'أدخل بياناتك للدخول' : 'Enter your credentials to sign in')
              : (isRTL ? 'أنشئ حساباً جديداً للبدء' : 'Create a new account to get started')
            }
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">
                    {isRTL ? 'الاسم الأول' : 'First Name'}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">
                    {isRTL ? 'اسم العائلة' : 'Last Name'}
                  </Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}
            
            <div>
              <Label htmlFor="email">
                {isRTL ? 'البريد الإلكتروني' : 'Email'}
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder={isRTL ? 'name@example.com' : 'name@example.com'}
              />
            </div>
            
            <div>
              <Label htmlFor="password">
                {isRTL ? 'كلمة المرور' : 'Password'}
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            
            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">
                  {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required={!isLogin}
                />
              </div>
            )}
            
            <Button type="submit" className="w-full">
              {isLogin 
                ? (isRTL ? 'تسجيل الدخول' : 'Sign In')
                : (isRTL ? 'إنشاء حساب' : 'Create Account')
              }
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              {isLogin 
                ? (isRTL ? 'ليس لديك حساب؟' : "Don't have an account?")
                : (isRTL ? 'لديك حساب بالفعل؟' : 'Already have an account?')
              }
              <Button
                variant="link"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-1"
              >
                {isLogin 
                  ? (isRTL ? 'إنشاء حساب' : 'Create one')
                  : (isRTL ? 'تسجيل الدخول' : 'Sign in')
                }
              </Button>
            </p>
          </div>
          
          {isLogin && (
            <div className="mt-4 p-3 bg-muted rounded-lg">
              <p className="text-xs text-muted-foreground mb-2">
                {isRTL ? 'حسابات تجريبية:' : 'Demo accounts:'}
              </p>
              <div className="space-y-1 text-xs">
                <div>
                  <strong>{isRTL ? 'مدير:' : 'Admin:'}</strong> admin@ecommerce.com
                </div>
                <div>
                  <strong>{isRTL ? 'مستخدم:' : 'User:'}</strong> user@example.com
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}