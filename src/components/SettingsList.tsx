import React from 'react';
import { Bell, Moon, Globe, HelpCircle, Info, LogOut, ChevronRight, Copy } from 'lucide-react';
import { User } from '../App';
import { translations } from '../translations';

interface SettingsListProps {
  user: User | null;
  onLogin: () => void;
  notificationsEnabled: boolean;
  onNotificationsToggle: () => void;
  soundEnabled: boolean;
  onSoundToggle: () => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
  language: string;
  onLanguageChange: (lang: string) => void;
  onAboutClick: () => void;
  onSupportClick: () => void;
}

export const SettingsList: React.FC<SettingsListProps> = ({ 
    user, 
    onLogin, 
    notificationsEnabled, 
    onNotificationsToggle,
    soundEnabled,
    onSoundToggle,
    darkMode,
    onDarkModeToggle,
    language,
    onLanguageChange,
    onAboutClick,
    onSupportClick
}) => {
  const languages = [
    'বাংলা', 'English', 'Español', 'Français', 'Deutsch',
    'العربية', 'हिन्दी', '中文', '日本語', 'Русский'
  ];

  const t = (key: string) => translations[language]?.[key] || key;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(t('কপি করা হয়েছে!'));
  };

  return (
    <div className="py-2 space-y-4 font-bengali">
      {/* Profile Card */}
      {user ? (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-[#092A54] font-bold text-lg">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">{user.name}</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">{user.email}</p>
          </div>
          <button className="ml-auto text-xs text-blue-600 font-semibold hover:underline">এডিট</button>
        </div>
      ) : (
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center">
            <button onClick={onLogin} className="text-sm font-semibold text-[#092A54]">লগইন করুন</button>
        </div>
      )}

      {/* App Settings Group */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{t('অ্যাপ কনফিগারেশন')}</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
          {/* Notifications Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#092A54]" />
              <span className="text-sm font-semibold text-gray-800">{t('নোটিফিকেশন')}</span>
            </div>
            <input 
              type="checkbox" 
              checked={notificationsEnabled}
              onChange={onNotificationsToggle}
              className="w-9 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer checked:bg-[#092A54] transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all checked:after:translate-x-4" 
            />
          </div>

          {/* Sound Toggle */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-[#092A54]" />
              <span className="text-sm font-semibold text-gray-800">{t('সাউন্ড')}</span>
            </div>
            <input 
              type="checkbox" 
              checked={soundEnabled}
              onChange={onSoundToggle}
              className="w-9 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer checked:bg-[#092A54] transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all checked:after:translate-x-4" 
            />
          </div>

          {/* Dark Mode */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-[#092A54]" />
              <span className="text-sm font-semibold text-gray-800">{t('ডার্ক মোড')}</span>
            </div>
            <input 
              type="checkbox" 
              checked={darkMode}
              onChange={onDarkModeToggle}
              className="w-9 h-5 bg-gray-200 rounded-full appearance-none cursor-pointer checked:bg-[#092A54] transition-all relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 after:transition-all checked:after:translate-x-4" 
            />
          </div>

          {/* Language */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-[#092A54]" />
              <span className="text-sm font-semibold text-gray-800">{t('ভাষা (Language)')}</span>
            </div>
            <select 
              value={language}
              onChange={(e) => onLanguageChange(e.target.value)}
              className="text-sm font-semibold text-gray-600 bg-gray-50 border border-gray-100 rounded-lg p-1 cursor-pointer"
            >
              {languages.map(lang => (
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Support Group */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{t('সহায়তা ও অন্যান্য')}</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
          <div onClick={onSupportClick} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-800">{t('সাহায্য এবং সাপোর্ট')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div onClick={onAboutClick} className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <Info className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-semibold text-gray-800">{t('আমাদের সম্পর্কে')}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-red-50 cursor-pointer transition">
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="text-sm font-semibold text-red-500">{t('লগআউট')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Group */}
      <div>
        <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 px-1">{t('আমাদের সমর্থন করুন')}</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <p className="text-sm text-gray-600 mb-4">
            {t('এই অ্যাপটি সম্পূর্ণ বিনামূল্যে। আমাদের ক্রমাগত উন্নত করার অনুপ্রেরণা জোগাতে আপনার ছোট অবদান আমাদের কাছে অনেক মূল্যবান।')}
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
              <span className="block text-xs font-bold text-gray-500 mb-1">bKash</span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-bold text-[#e81461]">01753567152</span>
                <button onClick={() => copyToClipboard('01753567152')} className="text-gray-400 hover:text-[#e81461]">
                    <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-xl border border-gray-100 text-center">
              <span className="block text-xs font-bold text-gray-500 mb-1">Nagad</span>
              <div className="flex items-center justify-center gap-1">
                <span className="text-sm font-bold text-[#ed1c24]">01753567152</span>
                <button onClick={() => copyToClipboard('01753567152')} className="text-gray-400 hover:text-[#ed1c24]">
                    <Copy className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 mt-4 text-center">
            {t('আপনার প্রতিটি সাপোর্ট আমাদের আরও ভালো কিছু তৈরি করতে সাহায্য করে। ধন্যবাদ!')}
          </p>
        </div>
      </div>
    </div>
  );
};
