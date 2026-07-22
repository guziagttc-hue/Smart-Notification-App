import React, { useState } from 'react';
import { CalendarDays, ListChecks, Phone } from 'lucide-react';

interface QuickAddProps {
  onAdd: (text: string, date: string, time: string, icon: 'meeting' | 'task' | 'call') => void;
  t: (key: string) => string;
}

export const QuickAdd = ({ onAdd, t }: QuickAddProps) => {
  const [text, setText] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('09:00');

  const handleAdd = (icon: 'meeting' | 'task' | 'call') => {
    if (text.trim()) {
      onAdd(text, date, time, icon);
      setText('');
    }
  };

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm mb-5">
      <h2 className="text-[#092A54] font-bold text-base mb-3 font-bengali">{t('দ্রুত যুক্ত করুন')}</h2>
      <input 
        type="text" 
        placeholder={t('আমাকে মনে করিয়ে দিন...')}
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full bg-[#F5F7FA] border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none mb-3 font-bengali" 
      />
      <div className="flex gap-2 mb-3">
        <input 
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none font-bengali"
        />
        <input 
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="flex-1 bg-[#F5F7FA] border border-gray-200 rounded-xl py-2 px-3 text-xs focus:outline-none font-bengali"
        />
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <button onClick={() => handleAdd('meeting')} className="bg-[#092A54] text-white rounded-xl py-2 flex items-center justify-center text-xs font-semibold hover:opacity-90 font-bengali">
          <CalendarDays className="w-4 h-4 mr-1.5" />{t('মিটিং')}
        </button>
        <button onClick={() => handleAdd('task')} className="bg-[#FFB300] text-gray-950 rounded-xl py-2 flex items-center justify-center text-xs font-semibold hover:opacity-90 font-bengali">
          <ListChecks className="w-4 h-4 mr-1.5" />{t('কাজ')}
        </button>
        <button onClick={() => handleAdd('call')} className="bg-[#1E88E5] text-white rounded-xl py-2 flex items-center justify-center text-xs font-semibold hover:opacity-90 font-bengali">
          <Phone className="w-4 h-4 mr-1.5" />{t('কল')}
        </button>
      </div>
    </div>
  );
};
