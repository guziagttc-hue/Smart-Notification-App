export interface Reminder {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  icon: 'meeting' | 'task' | 'call';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
  date: string;
  time: string;
}

export interface Category {
  id: string;
  name: string;
  icon: 'calendar' | 'user' | 'cart' | 'briefcase' | 'phone';
  count: number;
}
