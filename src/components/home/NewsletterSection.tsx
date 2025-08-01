import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppContext } from '@/contexts/useAppContext';
import { useToast } from '@/hooks/use-toast';

export default function NewsletterSection() {
  const { language } = useAppContext();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const isRTL = language === 'ar';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: isRTL ? 'تم الاشتراك بنجاح!' : 'Successfully Subscribed!',
        description: isRTL 
          ? 'سنبلغك بأحدث العروض والمنتجات الجديدة'
          : 'We\'ll notify you about latest offers and new products',
      });
      setEmail('');
    }
  };

  return (
    <section className="py-16 bg-gradient-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {isRTL ? 'اشترك في نشرتنا الإخبارية' : 'Subscribe to Our Newsletter'}
          </h2>
          <p className="text-lg mb-8 opacity-90">
            {isRTL 
              ? 'احصل على آخر العروض والمنتجات الجديدة مباشرة في بريدك الإلكتروني'
              : 'Get the latest offers and new products delivered straight to your inbox'
            }
          </p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              placeholder={isRTL ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/70 focus:border-white/40"
              dir={isRTL ? 'rtl' : 'ltr'}
            />
            <Button
              type="submit"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90"
            >
              <i className="fas fa-envelope mr-2"></i>
              {isRTL ? 'اشترك' : 'Subscribe'}
            </Button>
          </form>

          <p className="text-sm mt-4 opacity-75">
            {isRTL 
              ? 'نحن نحترم خصوصيتك ولن نشارك بياناتك مع أطراف ثالثة'
              : 'We respect your privacy and will never share your data with third parties'
            }
          </p>
        </div>
      </div>
    </section>
  );
}