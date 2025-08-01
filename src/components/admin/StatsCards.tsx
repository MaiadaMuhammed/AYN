import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatCardProps {
  title: string;
  titleAr: string;
  value: string;
  icon: string;
  color: string;
  bgGradient: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ 
  title, 
  titleAr, 
  value, 
  icon, 
  color, 
  bgGradient, 
  change, 
  changeType = 'neutral' 
}) => {
  const { language } = useAppContext();
  const isRTL = language === 'ar';

  return (
    <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 border-0">
      <div className={`absolute inset-0 ${bgGradient} opacity-10`}></div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {isRTL ? titleAr : title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${bgGradient} shadow-md`}>
          <i className={`${icon} text-white text-lg`}></i>
        </div>
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-foreground mb-1">
          {value}
        </div>
        {change && (
          <div className="flex items-center text-xs">
            <i className={`fas ${
              changeType === 'positive' ? 'fa-arrow-up text-success' : 
              changeType === 'negative' ? 'fa-arrow-down text-destructive' : 
              'fa-minus text-muted-foreground'
            } mr-1`}></i>
            <span className={
              changeType === 'positive' ? 'text-success' : 
              changeType === 'negative' ? 'text-destructive' : 
              'text-muted-foreground'
            }>
              {change}
            </span>
            <span className="text-muted-foreground ml-1">
              {isRTL ? 'من الشهر الماضي' : 'from last month'}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function StatsCards() {
  const { language, cart, orders } = useAppContext();
  const isRTL = language === 'ar';

  // Mock data - replace with real data from your backend
  const stats = [
    {
      title: 'Total Products',
      titleAr: 'إجمالي المنتجات',
      value: '1,234',
      icon: 'fas fa-box',
      color: 'text-brand-blue',
      bgGradient: 'bg-gradient-to-br from-brand-blue to-primary',
      change: '+12%',
      changeType: 'positive' as const,
    },
    {
      title: 'Total Orders',
      titleAr: 'إجمالي الطلبات',
      value: '856',
      icon: 'fas fa-shopping-bag',
      color: 'text-success',
      bgGradient: 'bg-gradient-to-br from-success to-brand-green',
      change: '+8%',
      changeType: 'positive' as const,
    },
    {
      title: 'Revenue',
      titleAr: 'الإيرادات',
      value: '$23,456',
      icon: 'fas fa-dollar-sign',
      color: 'text-warning',
      bgGradient: 'bg-gradient-to-br from-warning to-brand-orange',
      change: '+15%',
      changeType: 'positive' as const,
    },
    {
      title: 'Active Users',
      titleAr: 'المستخدمين النشطين',
      value: '2,143',
      icon: 'fas fa-users',
      color: 'text-info',
      bgGradient: 'bg-gradient-to-br from-info to-brand-purple',
      change: '+5%',
      changeType: 'positive' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
}