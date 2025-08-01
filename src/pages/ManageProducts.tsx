import React, { useEffect, useState } from 'react';
import { useAppContext } from '@/contexts/useAppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/types';
import { useToast } from '@/hooks/use-toast';

const ManageProducts: React.FC = () => {
  const { user, language } = useAppContext();
  const { toast } = useToast();
  const isRTL = language === 'ar';
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('customProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const handleDelete = (id: number) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    localStorage.setItem('customProducts', JSON.stringify(updated));
    toast({
      title: isRTL ? 'تم الحذف' : 'Deleted',
      description: isRTL ? 'تم حذف المنتج بنجاح' : 'Product deleted successfully',
      variant: 'success',
    });
  };

  if (!user?.isAdmin) {
    return (
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <i className="fas fa-lock text-4xl text-muted-foreground mb-4"></i>
            <h2 className="text-2xl font-bold mb-2">
              {isRTL ? 'وصول محظور' : 'Access Denied'}
            </h2>
            <p className="text-muted-foreground">
              {isRTL ? 'ليس لديك صلاحية للوصول لهذه الصفحة' : 'You do not have permission to access this page'}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-primary drop-shadow">
            {isRTL ? 'إدارة كل المنتجات' : 'Manage All Products'}
          </h1>
          <p className="text-muted-foreground">
            {isRTL ? 'تعديل أو حذف المنتجات المخصصة' : 'Edit or delete custom products'}
          </p>
        </div>
        <Button
          className="bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 text-white font-bold shadow-lg hover:from-green-500 hover:to-purple-600 transition-colors"
          size="lg"
          onClick={() => window.location.href = '/admin'}
        >
          <i className="fas fa-arrow-left mr-2"></i>
          {isRTL ? 'عودة للوحة التحكم' : 'Back to Dashboard'}
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{isRTL ? 'المنتجات' : 'Products'}</CardTitle>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-muted-foreground text-center py-4">
              {isRTL ? 'لا توجد منتجات' : 'No products found'}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <div key={product.id} className="rounded-lg border shadow p-4 bg-gradient-to-br from-blue-50 via-white to-pink-50 dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900">
                  <img src={product.thumbnail} alt={product.title} className="w-full h-40 object-cover rounded mb-3" />
                  <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-2 truncate">{product.description}</p>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-primary">${product.price}</span>
                    {product.discountPercentage > 0 && (
                      <span className="text-xs text-green-600">-{product.discountPercentage}%</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => alert('Edit functionality coming soon!')}>
                      <i className="fas fa-edit"></i> {isRTL ? 'تعديل' : 'Edit'}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                      <i className="fas fa-trash"></i> {isRTL ? 'حذف' : 'Delete'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ManageProducts;
