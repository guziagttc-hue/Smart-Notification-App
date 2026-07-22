/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { QuickAdd } from './components/QuickAdd';
import { ReminderCard } from './components/ReminderCard';
import { BottomNav } from './components/BottomNav';
import { NewEventModal } from './components/NewEventModal';
import { TaskList } from './components/TaskList';
import { CategoryList } from './components/CategoryList';
import { SettingsList } from './components/SettingsList';
import { InstallButton } from './components/InstallButton';
import { LoginModal } from './components/LoginModal';
import { ConfirmationModal } from './components/ConfirmationModal';
import { InfoPage } from './components/InfoPage';
import { CalendarDays, ListChecks, Phone, Plus } from 'lucide-react';
import { Reminder, Task, Category } from './types';
import { useNotification } from './hooks/useNotification';
import { translations } from './translations';


export interface User {
  name: string;
  email: string;
}

export default function App() {
  const { sendNotification, playSound } = useNotification();
  const [reminders, setReminders] = useState<Reminder[]>(() => {
    const saved = localStorage.getItem('reminders');
    return saved ? JSON.parse(saved) : [];
  });
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('categories');
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('বাংলা');
  const [reminderToEdit, setReminderToEdit] = useState<Reminder | null>(null);
  const [reminderToDelete, setReminderToDelete] = useState<Reminder | null>(null);
  const [activeTab, setActiveTab] = useState<'reminders' | 'tasks' | 'categories' | 'settings'>('reminders');
  const [subPage, setSubPage] = useState<'about' | 'support' | null>(null);
  const [taskFilter, setTaskFilter] = useState<'all' | 'completed' | 'pending'>('all');

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('categories', JSON.stringify(categories));
  }, [categories]);

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  const t = (key: string) => translations[language]?.[key] || key;

  const filteredTasks = tasks.filter(task => {
    if (taskFilter === 'completed') return task.completed;
    if (taskFilter === 'pending') return !task.completed;
    return true;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      const currentTime = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');

      reminders.forEach(r => {
        if (r.date === currentDate && r.time === currentTime) {
          sendNotification(notificationsEnabled, t('রিমাইন্ডার!'), r.title);
          playSound(soundEnabled);
        }
      });
      tasks.forEach(t => {
        if (!t.completed && t.date === currentDate && t.time === currentTime) {
          sendNotification(notificationsEnabled, t('কাজ!'), t.title);
          playSound(soundEnabled);
        }
      });
    }, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [reminders, tasks, sendNotification, language]);

  const addReminder = (reminder: { title: string; subtitle: string; date: string; time: string; icon: 'meeting' | 'task' | 'call' }) => {
    const newReminder: Reminder = {
      id: Date.now().toString(),
      ...reminder
    };
    setReminders([newReminder, ...reminders]);
  };

  const deleteReminder = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  const updateReminder = (updatedReminder: Reminder) => {
    setReminders(reminders.map(r => r.id === updatedReminder.id ? updatedReminder : r));
    setReminderToEdit(null);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleLogin = (email: string) => {
    setUser({ name: 'ব্যবহারকারী', email: email });
  };
  const getIcon = (type: string) => {
    switch(type) {
        case 'meeting': return <CalendarDays className="w-5 h-5" />;
        case 'task': return <ListChecks className="w-5 h-5" />;
        default: return <Phone className="w-5 h-5" />;
    }
  }

  const getBgColor = (type: string) => {
    switch(type) {
        case 'meeting': return 'bg-blue-100';
        case 'task': return 'bg-amber-100';
        default: return 'bg-blue-100';
    }
  }

  const getColor = (type: string) => {
    switch(type) {
        case 'meeting': return 'text-[#092A54]';
        case 'task': return 'text-amber-500';
        default: return 'text-[#1E88E5]';
    }
  }

  return (
    <div className={`${darkMode ? 'dark' : ''} bg-gray-100 min-h-dvh flex items-center justify-center sm:p-4 font-bengali`}>
      <div className="relative w-full h-dvh sm:h-[844px] sm:max-w-[390px] bg-[#F4F6FA] dark:bg-gray-900 flex flex-col shadow-2xl overflow-hidden sm:rounded-[40px]">
        
        <Header t={t} />

        <div className="flex-1 overflow-y-auto px-4 py-4 pb-24">
          {activeTab === 'reminders' && (
            <>
              <QuickAdd t={t} onAdd={(text, date, time, icon) => addReminder({title: text, subtitle: t('নতুন কাজ'), date, time, icon})} />

              <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 font-bengali">{t('আসন্ন রিমাইন্ডারসমূহ')}</h2>
                
                {reminders.map(r => (
                  <ReminderCard 
                    key={r.id}
                    icon={getIcon(r.icon)}
                    iconBg={getBgColor(r.icon)}
                    iconColor={getColor(r.icon)}
                    title={r.title}
                    subtitle={`${t(r.subtitle)} • ${r.date} • ${r.time}`}
                    onSubtitleClick={() => {
                        setReminderToEdit(r);
                        setIsModalOpen(true);
                    }}
                     onEdit={() => {
                        setReminderToEdit(r);
                        setIsModalOpen(true);
                    }}
                    onDelete={() => setReminderToDelete(r)}
                    t={t}
                  />
                ))}
              </div>
            </>
          )}

          {activeTab === 'tasks' && (
             <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 font-bengali">{t('কাজসমূহ')}</h2>
                <div className="flex gap-2 mb-4">
                  {(['all', 'completed', 'pending'] as const).map(f => (
                    <button key={f} onClick={() => setTaskFilter(f)} className={`px-3 py-1 rounded-full text-xs font-semibold ${taskFilter === f ? 'bg-[#092A54] text-white' : 'bg-white text-gray-600'}`}>
                      {t(f === 'all' ? 'সব' : f === 'completed' ? 'সম্পন্ন' : 'বাকি')}
                    </button>
                  ))}
                </div>
                <TaskList t={t} tasks={filteredTasks.map(item => ({...item, title: t(item.title)}))} onToggle={toggleTask} />
             </div>
          )}
          
          {reminderToDelete && (
            <ConfirmationModal
                onClose={() => setReminderToDelete(null)}
                onConfirm={() => deleteReminder(reminderToDelete.id)}
                title={t('মুছে ফেলার নিশ্চিতকরণ')}
                message={t('আপনি কি সত্যিই এই রিমাইন্ডারটি মুছতে চান?')}
                t={t}
            />
          )}

          {activeTab === 'categories' && (
             <div>
                <h2 className="text-lg font-bold text-gray-800 mb-3 font-bengali">{t('ক্যাটাগরি সমূহ')}</h2>
                <CategoryList t={t} categories={categories.map(c => ({...c, name: t(c.name)}))} onAdd={() => {
                  const name = prompt(t('নতুন ক্যাটাগরির নাম দিন'));
                  if (name) {
                    setCategories([...categories, { id: Date.now().toString(), name, icon: 'user', count: 0 }]);
                  }
                }} />
             </div>
          )}
          
          {activeTab === 'settings' && (
             <div>
                {subPage ? (
                    <InfoPage type={subPage} onClose={() => setSubPage(null)} t={t} />
                ) : (
                    <SettingsList 
                    user={user} 
                    onLogin={() => setIsLoginModalOpen(true)} 
                    notificationsEnabled={notificationsEnabled}
                    onNotificationsToggle={() => setNotificationsEnabled(!notificationsEnabled)}
                    soundEnabled={soundEnabled}
                    onSoundToggle={() => setSoundEnabled(!soundEnabled)}
                    darkMode={darkMode}
                    onDarkModeToggle={() => setDarkMode(!darkMode)}
                    language={language}
                    onLanguageChange={setLanguage}
                    onAboutClick={() => setSubPage('about')}
                    onSupportClick={() => setSubPage('support')}
                    />
                )}
             </div>
          )}
        </div>

        {activeTab === 'reminders' && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <button onClick={() => { setReminderToEdit(null); setIsModalOpen(true); }} className="bg-[#092A54] hover:bg-[#c386e] text-white font-semibold py-3 px-6 rounded-full shadow-lg flex items-center gap-2 text-sm whitespace-nowrap border-2 border-white font-bengali">
              <Plus className="w-4 h-4" /> {t('নতুন যুক্ত করুন')}
            </button>
          </div>
        )}

        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} t={t} />

        <InstallButton t={t} />

        {isModalOpen && (
          <NewEventModal 
            onClose={() => { setIsModalOpen(false); setReminderToEdit(null); }} 
            onAdd={addReminder} 
            reminderToEdit={reminderToEdit || undefined}
            onUpdate={updateReminder}
            t={t}
          />
        )}
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} t={t} />}
      </div>
    </div>
  );
}

