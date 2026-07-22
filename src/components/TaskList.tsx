import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  t: (key: string) => string;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onToggle, t }) => (
  <div className="space-y-3">
    {tasks.map(task => (
      <label key={task.id} className={`flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer group ${task.completed ? 'opacity-60' : ''}`}>
        <div className="flex items-center gap-3">
          <input 
            type="checkbox" 
            checked={task.completed} 
            onChange={() => onToggle(task.id)}
            className="w-5 h-5 rounded-md border-gray-300 text-[#092A54] focus:ring-[#092A54] cursor-pointer peer" 
          />
          <div>
            <span className={`text-sm font-semibold text-gray-800 peer-checked:line-through peer-checked:text-gray-400 block ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {t(task.title)}
            </span>
            <span className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
              {task.dueDate}
            </span>
          </div>
        </div>
        <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2.5 py-1 rounded-full">{t(task.category)}</span>
      </label>
    ))}
  </div>
);
