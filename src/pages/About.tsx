import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-2xl">
      <h1 className="text-3xl font-bold mb-4 text-center">عن الموقع / About</h1>
      <p className="text-muted-foreground max-w-xl mx-auto text-center mb-8">
        هذا المتجر الإلكتروني هو مشروع تجريبي يعرض منتجات متنوعة مع تجربة مستخدم حديثة وسهلة. يمكنك تصفح المنتجات، إضافة المفضلات، إتمام الشراء، وتتبع طلباتك بسهولة.<br />
        This e-commerce demo showcases a modern shopping experience with real product images, favorites, checkout, and order tracking.
      </p>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-2">تواصل معنا / Contact Us</h2>
        <div className="flex flex-col gap-2 mb-4">
          <div>
            <span className="font-medium">Email:</span> <a href="mailto:info@shop-elegant.com" className="text-primary underline">info@shop-elegant.com</a>
          </div>
          <div>
            <span className="font-medium">Phone:</span> <a href="tel:+201234567890" className="text-primary underline">+20 123 456 7890</a>
          </div>
        </div>
        <form className="space-y-4 text-left" onSubmit={e => { e.preventDefault(); alert('تم إرسال رسالتك! / Your message has been sent!'); }}>
          <div>
            <label className="block mb-1 font-medium">الاسم / Name</label>
            <input type="text" required className="input w-full" placeholder="اسمك / Your Name" />
          </div>
          <div>
            <label className="block mb-1 font-medium">البريد الإلكتروني / Email</label>
            <input type="email" required className="input w-full" placeholder="you@email.com" />
          </div>
          <div>
            <label className="block mb-1 font-medium">رسالتك / Message</label>
            <textarea required className="input w-full" rows={4} placeholder="اكتب رسالتك هنا / Type your message here" />
          </div>
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-primary/90 transition-colors">إرسال / Send</button>
        </form>
      </div>

      <div className="bg-white dark:bg-zinc-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-2">موقعنا / Our Location</h2>
        <div className="w-full h-64 rounded overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.0123456789!2d31.235711315117!3d30.04441998187951!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60c2f3eaf%3A0x2e2b2b2b2b2b2b2b!2sCairo%2C%20Egypt!5e0!3m2!1sen!2seg!4v1680000000000!5m2!1sen!2seg"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default About;