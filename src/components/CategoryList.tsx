import React from 'react';
import { Category } from '../types';
import { CalendarDays, User, ShoppingCart, Briefcase, Phone } from 'lucide-react';

interface CategoryListProps {
  categories: Category[];
  t: (key: string) => string;
  onAdd: () => void;
}

const getIcon = (iconName: string) => {
  switch(iconName) {
    case 'calendar': return <CalendarDays className="w-5 h-5" />;
    case 'user': return <User className="w-5 h-5" />;
    case 'cart': return <ShoppingCart className="w-5 h-5" />;
    case 'briefcase': return <Briefcase className="w-5 h-5" />;
    case 'phone': return <Phone className="w-5 h-5" />;
    default: return <CalendarDays className="w-5 h-5" />;
  }
}

const getBgColor = (iconName: string) => {
  switch(iconName) {
    case 'calendar': return 'bg-blue-50 text-blue-600';
    case 'user': return 'bg-green-50 text-green-600';
    case 'cart': return 'bg-amber-50 text-amber-500';
    case 'briefcase': return 'bg-indigo-50 text-indigo-600';
    case 'phone': return 'bg-cyan-50 text-cyan-600';
    default: return 'bg-blue-50 text-blue-600';
  }
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, t, onAdd }) => (
  <div className="grid grid-cols-2 gap-4">
    {categories.map(cat => (
      <div key={cat.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between h-[120px] hover:shadow-md transition cursor-pointer">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${getBgColor(cat.icon)}`}>
            {getIcon(cat.icon)}
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-800">{t(cat.name)}</h3>
          <p className="text-[11px] text-gray-400 mt-0.5">{cat.count}{t('টি রিমাইন্ডার')}</p>
        </div>
      </div>
    ))}
    <div onClick={onAdd} className="border-2 border-dashed border-gray-200 p-4 rounded-2xl flex flex-col justify-center items-center h-[120px] hover:border-gray-300 hover:bg-gray-50 transition cursor-pointer group">
      <div className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-gray-200 transition">
        <span className="text-base font-bold">+</span>
      </div>
      <span className="text-xs font-semibold text-gray-500 mt-2">{t('নতুন যুক্ত করুন')}</span>
    </div>
  </div>
);
