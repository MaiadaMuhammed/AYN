import React, { useState, useEffect } from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/types';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ProductsManager() {
  const { language } = useAppContext();
  const { toast } = useToast();
  const isRTL = language === 'ar';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const savedProducts = localStorage.getItem('customProducts');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, []);

  const saveProducts = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    localStorage.setItem('customProducts', JSON.stringify(updatedProducts));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentProduct.title || !currentProduct.price) {
      toast({
        title: isRTL ? 'خطأ' : 'Error',
        description: isRTL ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    const newProduct: Product = {
      id: currentProduct.id || Date.now(),
      title: currentProduct.title || '',
      description: currentProduct.description || '',
      price: Number(currentProduct.price) || 0,
      discountPercentage: Number(currentProduct.discountPercentage) || 0,
      rating: Number(currentProduct.rating) || 5,
      stock: Number(currentProduct.stock) || 10,
      brand: currentProduct.brand || 'AYN Store',
      category: currentProduct.category || 'custom',
      thumbnail: currentProduct.thumbnail || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
      images: currentProduct.images || [],
      tags: currentProduct.tags || [],
    };

    let updatedProducts;
    if (isEditing) {
      updatedProducts = products.map(p => p.id === newProduct.id ? newProduct : p);
      toast({
        title: isRTL ? 'تم التحديث' : 'Updated',
        description: isRTL ? 'تم تحديث المنتج بنجاح' : 'Product updated successfully',
      });
    } else {
      updatedProducts = [...products, newProduct];
      toast({
        title: isRTL ? 'تم الإضافة' : 'Added',
        description: isRTL ? 'تم إضافة المنتج بنجاح' : 'Product added successfully',
      });
    }

    saveProducts(updatedProducts);
    setCurrentProduct({});
    setIsEditing(false);
    setIsDialogOpen(false);
  };

  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    const updatedProducts = products.filter(p => p.id !== id);
    saveProducts(updatedProducts);
    toast({
      title: isRTL ? 'تم الحذف' : 'Deleted',
      description: isRTL ? 'تم حذف المنتج بنجاح' : 'Product deleted successfully',
    });
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {isRTL ? 'إدارة المنتجات' : 'Products Management'}
          </h2>
          <p className="text-muted-foreground">
            {isRTL ? 'إضافة وتعديل وحذف المنتجات' : 'Add, edit and delete products'}
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="bg-gradient-primary hover:opacity-90 text-white shadow-lg"
              onClick={() => {
                setCurrentProduct({});
                setIsEditing(false);
              }}
            >
              <i className="fas fa-plus mr-2"></i>
              {isRTL ? 'منتج جديد' : 'New Product'}
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {isEditing 
                  ? (isRTL ? 'تعديل منتج' : 'Edit Product')
                  : (isRTL ? 'إضافة منتج جديد' : 'Add New Product')
                }
              </DialogTitle>
              <DialogDescription>
                {isRTL ? 'املأ جميع الحقول لإضافة أو تعديل المنتج' : 'Fill in all fields to add or edit product'}
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <Label htmlFor="title">{isRTL ? 'اسم المنتج *' : 'Product Name *'}</Label>
                  <Input
                    id="title"
                    value={currentProduct.title || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, title: e.target.value})}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="description">{isRTL ? 'الوصف' : 'Description'}</Label>
                  <Textarea
                    id="description"
                    value={currentProduct.description || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, description: e.target.value})}
                    className="mt-1"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="price">{isRTL ? 'السعر *' : 'Price *'}</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={currentProduct.price || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, price: Number(e.target.value)})}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="discount">{isRTL ? 'نسبة الخصم %' : 'Discount %'}</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={currentProduct.discountPercentage || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, discountPercentage: Number(e.target.value)})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="stock">{isRTL ? 'المخزون' : 'Stock'}</Label>
                  <Input
                    id="stock"
                    type="number"
                    min="0"
                    value={currentProduct.stock || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, stock: Number(e.target.value)})}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="category">{isRTL ? 'الفئة' : 'Category'}</Label>
                  <Input
                    id="category"
                    value={currentProduct.category || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, category: e.target.value})}
                    className="mt-1"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="thumbnail">{isRTL ? 'رابط الصورة' : 'Image URL'}</Label>
                  <Input
                    id="thumbnail"
                    type="url"
                    value={currentProduct.thumbnail || ''}
                    onChange={(e) => setCurrentProduct({...currentProduct, thumbnail: e.target.value})}
                    className="mt-1"
                  />
                </div>
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-primary hover:opacity-90">
                  <i className="fas fa-save mr-2"></i>
                  {isEditing ? (isRTL ? 'تحديث' : 'Update') : (isRTL ? 'إضافة' : 'Add')}
                </Button>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  {isRTL ? 'إلغاء' : 'Cancel'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="relative">
        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"></i>
        <Input
          placeholder={isRTL ? 'البحث في المنتجات...' : 'Search products...'}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length === 0 ? (
          <div className="col-span-full">
            <Card className="p-8 text-center">
              <i className="fas fa-box-open text-4xl text-muted-foreground mb-4"></i>
              <h3 className="text-lg font-semibold mb-2">
                {isRTL ? 'لا توجد منتجات' : 'No Products Found'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL ? 'لا توجد منتجات مطابقة للبحث' : 'No products match your search criteria'}
              </p>
            </Card>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={product.thumbnail} 
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold text-sm line-clamp-2">{product.title}</h3>
                    <Badge variant="secondary" className="ml-2 shrink-0">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-lg font-bold text-primary">${product.price}</p>
                      {product.discountPercentage > 0 && (
                        <Badge variant="destructive" className="text-xs">
                          -{product.discountPercentage}%
                        </Badge>
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <i className="fas fa-box mr-1"></i>
                      {product.stock}
                    </div>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEdit(product)}
                      className="flex-1"
                    >
                      <i className="fas fa-edit mr-1"></i>
                      {isRTL ? 'تعديل' : 'Edit'}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}