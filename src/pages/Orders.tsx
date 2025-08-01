import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Order, CartItem } from '@/types';

const Orders: React.FC = () => {
  const { user, orders = [] } = useAppContext();
  const isRTL = user?.language === 'ar';

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-2">
              {isRTL ? 'يرجى تسجيل الدخول لعرض طلباتك' : 'Please log in to view your orders'}
            </h2>
            <Link to="/auth">
              <Button>{isRTL ? 'تسجيل الدخول' : 'Login'}</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-2">
              {isRTL ? 'طلباتي' : 'My Orders'}
            </h2>
            <p className="mb-4 text-muted-foreground">
              {isRTL
                ? 'يبدو انك لم تقم بطلب شئ بعد'
                : 'It looks like you have not placed any orders yet.'}
            </p>
            <Link to="/products">
              <Button variant="outline">
                {isRTL ? 'قم بالعوده للتسوق من هنا لتبدأ بالشراء' : 'Go back to shop to start shopping'}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        {isRTL ? 'طلباتي' : 'My Orders'}
      </h1>
      <div className="grid gap-6 max-w-2xl mx-auto">
        {orders.map((order: Order, idx: number) => (
          <Card key={order.id || idx}>
            <CardHeader>
              <CardTitle>
                {isRTL ? `طلب رقم ${order.id || idx + 1}` : `Order #${order.id || idx + 1}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2">
                <span className="font-semibold">
                  {isRTL ? 'التاريخ:' : 'Date:'}
                </span>{' '}
                {order.date || '-'}
              </div>
              <div className="mb-2">
                <span className="font-semibold">
                  {isRTL ? 'الإجمالي:' : 'Total:'}
                </span>{' '}
                {order.total} EGP
              </div>
              <div>
                <span className="font-semibold">
                  {isRTL ? 'المنتجات:' : 'Products:'}
                </span>
                <ul className="list-disc list-inside">
                  {order.items?.map((item: CartItem, i: number) => (
                    <li key={item.product.id + '-' + i}>
                      {item.product.title} x{item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
