import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppContext } from '@/contexts/useAppContext';
import { useToast } from '@/hooks/use-toast';
import { Button, type ButtonProps } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function Cart() {
  const { cart, updateCartQuantity, removeFromCart, clearCart, language } = useAppContext();
  const { toast } = useToast();
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const isRTL = language === 'ar';
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => {
    const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
    return sum + (discountedPrice * item.quantity);
  }, 0);

  // Coupon logic
  const validCoupon = couponApplied ? 0.2 : 0;
  const couponDiscount = subtotal * validCoupon;
  const tax = (subtotal - couponDiscount) * 0.1; // 10% tax
  const shipping = (subtotal - couponDiscount) > 100 ? 0 : 10; // Free shipping over $100
  const total = subtotal - couponDiscount + tax + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponApplied) {
      toast({
        title: isRTL ? 'تم تطبيق الكوبون بالفعل' : 'Coupon Already Applied',
        description: isRTL ? 'تم تطبيق الكوبون مسبقًا' : 'Coupon has already been applied.',
        variant: 'warning',
      });
      return;
    }
    if (coupon.trim().toUpperCase() === 'AYN20') {
      setCouponApplied(true);
      toast({
        title: isRTL ? 'تم تطبيق الكوبون' : 'Coupon Applied',
        description: isRTL ? 'تم خصم 20% من قيمة الطلب' : '20% discount applied to your order!',
        variant: 'success',
      });
    } else {
      toast({
        title: isRTL ? 'كود غير صحيح' : 'Invalid Code',
        description: isRTL ? 'يرجى إدخال كود كوبون صحيح' : 'Please enter a valid coupon code.',
        variant: 'destructive',
      });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <i className="fas fa-shopping-cart text-6xl text-muted-foreground mb-6"></i>
          <h2 className="text-2xl font-bold mb-4">
            {isRTL ? 'عربة التسوق فارغة' : 'Your cart is empty'}
          </h2>
          <p className="text-muted-foreground mb-6">
            {isRTL 
              ? 'يبدو أنك لم تضف أي منتجات إلى عربة التسوق حتى الآن'
              : 'Looks like you haven\'t added any products to your cart yet'
            }
          </p>
          <Link to="/products">
            <Button size="lg" variant="default" {...({} as ButtonProps)}>
              <i className="fas fa-shopping-bag mr-2"></i>
              {isRTL ? 'تسوق الآن' : 'Start Shopping'}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">
          {isRTL ? 'عربة التسوق' : 'Shopping Cart'}
        </h1>
        <Button variant="outline" onClick={clearCart}>
          <i className="fas fa-trash mr-2"></i>
          {isRTL ? 'مسح السلة' : 'Clear Cart'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const discountedPrice = item.product.price * (1 - item.product.discountPercentage / 100);
            return (
              <Card key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <img
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    
                    <div className="flex-1">
                      <Link 
                        to={`/products/${item.product.id}`}
                        className="font-semibold hover:text-primary transition-colors"
                      >
                        {item.product.title}
                      </Link>
                      
                      <div className="text-sm text-muted-foreground mt-1">
                        {item.selectedSize && (
                          <span className="mr-2">
                            {isRTL ? 'المقاس:' : 'Size:'} {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span>
                            {isRTL ? 'اللون:' : 'Color:'} {item.selectedColor}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-primary">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          {item.product.discountPercentage > 0 && (
                            <span className="text-sm text-muted-foreground line-through">
                              ${item.product.price.toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                          >
                            <i className="fas fa-minus"></i>
                          </Button>
                          
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            disabled={item.quantity >= item.product.stock}
                          >
                            <i className="fas fa-plus"></i>
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <i className="fas fa-trash"></i>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                {isRTL ? 'ملخص الطلب' : 'Order Summary'}
              </h3>
              
              <div className="space-y-3">
                {/* Coupon Code */}
                <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    className="input flex-1"
                    placeholder={isRTL ? 'ادخل كود الكوبون' : 'Enter coupon code'}
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    disabled={couponApplied}
                  />
                  <Button type="submit" variant="secondary" disabled={couponApplied}>
                    {couponApplied ? (isRTL ? 'تم التطبيق' : 'Applied') : (isRTL ? 'تطبيق' : 'Apply')}
                  </Button>
                </form>
                {couponApplied && (
                  <div className="text-green-600 text-sm mb-2">{isRTL ? 'تم تطبيق خصم 20%' : '20% discount applied!'}</div>
                )}
                <div className="flex justify-between">
                  <span>{isRTL ? 'المجموع الفرعي' : 'Subtotal'}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div className="flex justify-between text-green-600">
                    <span>{isRTL ? 'خصم الكوبون' : 'Coupon Discount'}</span>
                    <span>- ${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between">
                  <span>{isRTL ? 'الضريبة' : 'Tax'}</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>{isRTL ? 'الشحن' : 'Shipping'}</span>
                  <span>
                    {shipping === 0 ? (
                      <span className="text-green-600">
                        {isRTL ? 'مجاني' : 'Free'}
                      </span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between font-semibold text-lg">
                  <span>{isRTL ? 'الإجمالي' : 'Total'}</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                variant="default"
                onClick={handleCheckout}
              >
                <i className="fas fa-credit-card mr-2"></i>
                {isRTL ? 'الدفع الآن' : 'Proceed to Checkout'}
              </Button>
              
              <div className="text-center mt-4">
                <Link to="/products">
                  <Button variant="ghost" size="sm">
                    <i className="fas fa-arrow-left mr-2"></i>
                    {isRTL ? 'متابعة التسوق' : 'Continue Shopping'}
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}