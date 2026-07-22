import React from 'react';
import { MoreHorizontal } from 'lucide-react';

export interface ReminderCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  subtitle: string;
  onSubtitleClick?: () => void;
  onEdit: () => void;
  onDelete: () => void;
  t: (key: string) => string;
}

export const ReminderCard: React.FC<ReminderCardProps> = ({ icon, iconBg, iconColor, title, subtitle, onSubtitleClick, onEdit, onDelete, t }) => (
  <div className="bg-white rounded-2xl p-4 shadow-sm mb-3">
    <div className="flex justify-between items-start mb-3">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full ${iconBg} flex items-center justify-center ${iconColor}`}>
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-900 text-sm font-bengali">{t(title)}</h3>
          <p 
            className="text-xs text-gray-500 mt-0.5 font-bengali cursor-pointer hover:text-blue-500 transition" 
            onClick={onSubtitleClick}
            dangerouslySetInnerHTML={{ __html: subtitle }} 
          />
        </div>
      </div>
      <button className="text-gray-400 hover:text-gray-600"><MoreHorizontal /></button>
    </div>
    <div className="flex gap-2">
      <button onClick={onEdit} className="flex-1 bg-blue-50 text-blue-600 rounded-xl py-1.5 text-xs font-medium hover:bg-blue-100 transition font-bengali">{t('সম্পাদনা করুন')}</button>
      <button onClick={onDelete} className="flex-1 bg-red-50 text-red-500 rounded-xl py-1.5 text-xs font-medium hover:bg-red-100 transition font-bengali">{t('বাতিল করুন')}</button>
    </div>
  </div>
);
