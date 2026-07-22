import React, { useState } from 'react';
import { X, PlusCircle, CalendarDays, ListChecks, Phone } from 'lucide-react';
import { Reminder } from '../types';

interface NewEventModalProps {
  onClose: () => void;
  onAdd: (reminder: { title: string; subtitle: string; date: string; time: string; icon: 'meeting' | 'task' | 'call' }) => void;
  reminderToEdit?: Reminder;
  onUpdate?: (reminder: Reminder) => void;
  t: (key: string) => string;
}

export const NewEventModal = ({ onClose, onAdd, reminderToEdit, onUpdate, t }: NewEventModalProps) => {
  const [title, setTitle] = useState(reminderToEdit?.title || '');
  const [subtitle, setSubtitle] = useState(reminderToEdit?.subtitle || '');
  const [date, setDate] = useState(reminderToEdit?.date || '');
  const [time, setTime] = useState(reminderToEdit?.time || '');
  const [category, setCategory] = useState<'meeting' | 'task' | 'call'>(reminderToEdit?.icon || 'meeting');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reminderToEdit && onUpdate) {
      onUpdate({ id: reminderToEdit.id, title, subtitle, date, time, icon: category });
    } else {
      onAdd({ title, subtitle, date, time, icon: category });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[360px] bg-white rounded-3xl shadow-xl border border-gray-100 p-6 font-bengali">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#092A54] text-lg font-bold flex items-center gap-2">
            <PlusCircle className="text-xl" /> {t('নতুন ইভেন্ট যুক্ত করুন')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition">
            <X className="text-lg" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1.5">{t('ইভেন্টের নাম / টাইটেল')}</label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('যেমন: ডাক্তারের সাথে অ্যাপয়েন্টমেন্ট')} 
              className="w-full bg-[#F4F6FA] border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-blue-400 transition text-gray-800"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1.5">{t('বিস্তারিত বিবরণ')}</label>
            <input 
              type="text" 
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder={t('যেমন: Dr. Karim, Dec 21')} 
              className="w-full bg-[#F4F6FA] border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-blue-400 transition text-gray-800"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1.5">{t('তারিখ ও সময়')}</label>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="date" 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
                className="w-full bg-[#F4F6FA] border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-blue-400 text-gray-600 transition" 
                required 
              />
              <input 
                type="time" 
                value={time} 
                onChange={(e) => setTime(e.target.value)} 
                className="w-full bg-[#F4F6FA] border border-gray-200 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:border-blue-400 text-gray-600 transition" 
                required 
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2">{t('ধরণ / ক্যাটাগরি')}</label>
            <div className="grid grid-cols-3 gap-2">
              <label className={`flex flex-col items-center justify-center p-2.5 border rounded-xl cursor-pointer transition ${category === 'meeting' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                <input type="radio" name="category" className="sr-only" checked={category === 'meeting'} onChange={() => setCategory('meeting')} />
                <CalendarDays className="text-[#092A54] w-5 h-5 mb-1" />
                <span className="text-xs font-semibold text-gray-700">{t('মিটিং')}</span>
              </label>
              
              <label className={`flex flex-col items-center justify-center p-2.5 border rounded-xl cursor-pointer transition ${category === 'task' ? 'bg-amber-50 border-amber-200' : 'border-gray-200'}`}>
                <input type="radio" name="category" className="sr-only" checked={category === 'task'} onChange={() => setCategory('task')} />
                <ListChecks className="text-amber-500 w-5 h-5 mb-1" />
                <span className="text-xs font-semibold text-gray-700">{t('কাজ')}</span>
              </label>
              
              <label className={`flex flex-col items-center justify-center p-2.5 border rounded-xl cursor-pointer transition ${category === 'call' ? 'bg-blue-50 border-blue-200' : 'border-gray-200'}`}>
                <input type="radio" name="category" className="sr-only" checked={category === 'call'} onChange={() => setCategory('call')} />
                <Phone className="text-[#1E88E5] w-5 h-5 mb-1" />
                <span className="text-xs font-semibold text-gray-700">{t('কল')}</span>
              </label>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <button type="button" onClick={onClose} className="flex-1 bg-red-50 text-red-500 rounded-xl py-3 text-sm font-semibold hover:bg-red-100 transition active:scale-95">{t('বাতিল করুন')}</button>
            <button type="submit" className="flex-1 bg-[#092A54] text-white rounded-xl py-3 text-sm font-semibold hover:bg-[#0c386e] transition active:scale-95">
              {reminderToEdit ? t('সম্পাদনা করুন') : t('সংরক্ষণ করুন')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
