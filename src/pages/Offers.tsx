import React from 'react';

const Offers: React.FC = () => (
  <div className="container mx-auto px-4 py-16 text-center">
    <h1 className="text-3xl font-bold mb-4">العروض / Offers</h1>
    <p className="text-muted-foreground max-w-xl mx-auto mb-8">
      استمتع بأفضل العروض والخصومات على منتجاتنا المختارة! تابعنا باستمرار لمزيد من التخفيضات.
      <br />
      Enjoy the best deals and discounts on our selected products! Check back often for more offers.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {/* ممكن لاحقاً أضيف منتجات عليها خصم هنا */}
      <div className="p-6 border rounded shadow bg-background">🎉 خصم 20% على جميع المنتجات باستخدام كود: <b>AYN20</b></div>
      <div className="p-6 border rounded shadow bg-background">🚚 شحن مجاني للطلبات فوق 500 جنيه</div>
      <div className="p-6 border rounded shadow bg-background">🎁 هدية مجانية مع كل طلبية تزيد عن 1000 جنيه</div>
    </div>
  </div>
);

export default Offers;
