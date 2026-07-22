import React from 'react';
import { Bell } from 'lucide-react';

interface HeaderProps {
  t: (key: string) => string;
}

export const Header: React.FC<HeaderProps> = ({ t }) => (
  <div className="bg-[#092A54] px-5 pt-8 pb-6 rounded-b-[24px]">
    <div className="flex justify-between items-center text-white mb-4">
      <h1 className="text-xl font-bold tracking-wide font-bengali">{t('স্মার্ট নোটিফিকেশন')}</h1>
      <div className="relative">
        <Bell className="text-xl" />
        <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#092A54]"></span>
      </div>
    </div>
  </div>
);
