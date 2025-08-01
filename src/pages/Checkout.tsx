
import React, { useState, useRef } from 'react';
import { useAppContext } from '@/contexts/useAppContext';
import { useToast } from '@/hooks/use-toast';
import siteLogo from '/public/placeholder.svg';

const Checkout: React.FC = () => {
  const { cart, language } = useAppContext();
  const isRTL = language === 'ar';
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    payment: 'card',
  });
  const [submitted, setSubmitted] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const receiptRef = useRef<HTMLDivElement>(null);
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const validCoupon = couponApplied ? 0.2 : 0;
  const couponDiscount = subtotal * validCoupon;
  const total = subtotal - couponDiscount;

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setStep(3);
  };

  if (cart.length === 0) {
    return <div className="container mx-auto py-8 text-center text-lg">{isRTL ? 'سلة التسوق فارغة' : 'Your cart is empty'}</div>;
  }

  // PDF generation logic
  const generatePDF = async (preview = false) => {
    const mod = await import('jspdf');
    const jsPDF = mod.jsPDF || mod.default;
    const doc = new jsPDF();
    // Logo
    doc.setFontSize(18);
    doc.text(isRTL ? 'إيصال الطلب' : 'Order Receipt', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`${isRTL ? 'الاسم' : 'Name'}: ${form.name}`, 20, 35);
    doc.text(`${isRTL ? 'البريد الإلكتروني' : 'Email'}: ${form.email}`, 20, 45);
    doc.text(`${isRTL ? 'العنوان' : 'Address'}: ${form.address}`, 20, 55);
    doc.text(`${isRTL ? 'طريقة الدفع' : 'Payment'}: ${form.payment === 'card' ? (isRTL ? 'بطاقة ائتمان' : 'Credit Card') : (isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery')}`, 20, 65);
    doc.text(`${isRTL ? 'التاريخ' : 'Date'}: ${new Date().toLocaleString()}`, 20, 75);
    doc.text(isRTL ? 'تفاصيل المنتجات:' : 'Products:', 20, 90);
    let y = 100;
    cart.forEach(item => {
      doc.text(`- ${item.product.title} x${item.quantity} = $${(item.product.price * item.quantity).toFixed(2)}`, 25, y);
      y += 8;
    });
    doc.setFontSize(14);
    doc.text(`${isRTL ? 'الإجمالي' : 'Total'}: $${total.toFixed(2)}`, 20, y + 5);
    if (preview) {
      window.open(doc.output('bloburl'), '_blank');
    } else {
      doc.save('receipt.pdf');
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-2xl bg-gradient-to-br from-blue-50 via-white to-pink-50 rounded-2xl shadow-lg border border-blue-100">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-blue-700 drop-shadow">{isRTL ? 'إتمام الشراء' : 'Checkout'}</h1>
      {step === 1 && (
        <form onSubmit={() => setStep(2)} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'الاسم الكامل' : 'Full Name'}</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder={isRTL ? 'اكتب اسمك الكامل' : 'Enter your full name'}
              title={isRTL ? 'الاسم الكامل' : 'Full Name'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'البريد الإلكتروني' : 'Email'}</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder={isRTL ? 'اكتب بريدك الإلكتروني' : 'Enter your email'}
              title={isRTL ? 'البريد الإلكتروني' : 'Email'}
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'العنوان' : 'Address'}</label>
            <textarea
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="input w-full"
              placeholder={isRTL ? 'اكتب عنوانك بالتفصيل' : 'Enter your address'}
              title={isRTL ? 'العنوان' : 'Address'}
            />
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4">{isRTL ? 'التالي' : 'Next'}</button>
        </form>
      )}
      {step === 2 && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Coupon Code */}
          <div className="mb-2">
            <label className="block font-semibold mb-1 text-pink-700">{isRTL ? 'كود الكوبون' : 'Coupon Code'}</label>
            <div className="flex gap-2">
              <input
                type="text"
                className="input flex-1 border-pink-300 focus:border-pink-500"
                placeholder={isRTL ? 'ادخل كود الكوبون' : 'Enter coupon code'}
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
                disabled={couponApplied}
              />
              <button
                type="button"
                className={`btn ${couponApplied ? 'bg-green-500 text-white' : 'bg-pink-500 text-white'} px-4 rounded`}
                onClick={handleApplyCoupon}
                disabled={couponApplied}
              >
                {couponApplied ? (isRTL ? 'تم التطبيق' : 'Applied') : (isRTL ? 'تطبيق' : 'Apply')}
              </button>
            </div>
            {couponApplied && (
              <div className="text-green-600 text-sm mt-1">{isRTL ? 'تم تطبيق خصم 20%' : '20% discount applied!'}</div>
            )}
          </div>
          <div>
            <label className="block font-semibold mb-1">{isRTL ? 'طريقة الدفع' : 'Payment Method'}</label>
            <div className="flex gap-4">
              <label><input type="radio" name="payment" value="card" checked={form.payment === 'card'} onChange={handleChange} /> {isRTL ? 'بطاقة ائتمان' : 'Credit Card'}</label>
              <label><input type="radio" name="payment" value="cod" checked={form.payment === 'cod'} onChange={handleChange} /> {isRTL ? 'الدفع عند الاستلام' : 'Cash on Delivery'}</label>
            </div>
          </div>
          <div className="border-t pt-4">
            <h2 className="font-bold mb-2">{isRTL ? 'ملخص الطلب' : 'Order Summary'}</h2>
            <ul className="mb-2">
              {cart.map(item => (
                <li key={item.product.id} className="flex justify-between">
                  <span>{item.product.title} x{item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            {couponApplied && (
              <div className="flex justify-between text-green-600 font-semibold">
                <span>{isRTL ? 'خصم الكوبون' : 'Coupon Discount'}</span>
                <span>- ${couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-lg mt-2">
              <span>{isRTL ? 'الإجمالي' : 'Total'}:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button type="submit" className="btn btn-primary w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold shadow">
            <i className="fas fa-check mr-2"></i>
            {isRTL ? 'تأكيد الطلب' : 'Confirm Order'}
          </button>
        </form>
      )}
      {step === 3 && submitted && (
        <div className="text-center py-12 bg-gradient-to-br from-green-50 via-white to-blue-50 rounded-xl shadow-lg border border-green-100">
          <div className="text-5xl mb-4 text-green-600">✔️</div>
          <h2 className="text-3xl font-extrabold mb-2 text-green-700">{isRTL ? 'تم استلام طلبك!' : 'Order Received!'}</h2>
          <p className="mb-4 text-lg text-muted-foreground">{isRTL ? 'شكراً لشرائك. سنقوم بمعالجة طلبك قريباً.' : 'Thank you for your purchase. We will process your order soon.'}</p>
          <div className="flex flex-col gap-4 items-center mt-8">
            <button
              className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-bold shadow"
              onClick={() => generatePDF(false)}
            >
              <i className="fas fa-download mr-2"></i>
              {isRTL ? 'تحميل الإيصال' : 'Download Receipt'}
            </button>
            <button
              className="btn bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded font-bold shadow"
              onClick={() => generatePDF(true)}
            >
              <i className="fas fa-eye mr-2"></i>
              {isRTL ? 'عرض الإيصال' : 'Show Receipt'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
