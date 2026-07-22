import React from 'react';

interface ConfirmationModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  t: (key: string) => string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onClose, onConfirm, title, message, t }) => {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-[320px] bg-white rounded-3xl p-6 shadow-xl">
        <h2 className="text-lg font-bold text-gray-800 mb-2">{title}</h2>
        <p className="text-sm text-gray-600 mb-6">{message}</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2 rounded-xl text-sm font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200">
            {t('বাতিল')}
          </button>
          <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 py-2 rounded-xl text-sm font-semibold bg-red-600 text-white hover:bg-red-700">
            {t('মুছে ফেলুন')}
          </button>
        </div>
      </div>
    </div>
  );
};
