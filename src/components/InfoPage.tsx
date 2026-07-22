import React from 'react';
import { ArrowLeft, Copy } from 'lucide-react';

interface InfoPageProps {
  type: 'about' | 'support';
  onClose: () => void;
  t: (key: string) => string;
}

export const InfoPage: React.FC<InfoPageProps> = ({ type, onClose, t }) => {
  const email = 'im.softwark.team@gmail.com';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(email);
    alert(t('ইমেইল কপি করা হয়েছে!'));
  };

  return (
    <div className="bg-white rounded-2xl p-6 h-full flex flex-col">
      <button onClick={onClose} className="mb-4 flex items-center text-sm font-semibold text-gray-600">
        <ArrowLeft className="w-4 h-4 mr-2" /> {t('ফিরে যান')}
      </button>
      <h2 className="text-xl font-bold mb-4">{t(type === 'about' ? 'আমাদের সম্পর্কে' : 'সাহায্য এবং সাপোর্ট')}</h2>
      
      <div className="text-sm text-gray-700 space-y-4">
        {type === 'about' ? (
          <>
            <div className="space-y-4">
              <p>🌐 <strong>IM Softworks</strong></p>
              <p>IM Softworks একটি উদীয়মান সফটওয়্যার কোম্পানি, যা ভবিষ্যতমুখী প্রযুক্তি ও সৃজনশীল সমাধানের মাধ্যমে ক্লায়েন্টদের ব্যবসায়িক সাফল্যে সহায়তা করে। আমরা বিশ্বাস করি— আমাদের উন্নতি তখনই সম্ভব, যখন আমাদের ক্লায়েন্ট লাভবান হবেন।</p>
              <p>IM Softworks is an emerging software company that empowers clients’ business success through futuristic technology and innovative solutions. We believe that our growth is only possible when our clients benefit.</p>
              <p>আমরা শুধু সফটওয়্যার তৈরি করি না — আমরা সম্ভাবনা গড়ে তুলি।</p>
              <p>We don’t just build software — We build possibilities.</p>
            </div>

            <div className="space-y-2">
              <p>🎯 <strong>আমাদের লক্ষ্য (Our Mission)</strong></p>
              <p>“আপনার লাভই আমাদের সফলতা।” — “Your profit is our success.”</p>
              <p>আমরা প্রতিটি প্রজেক্টে বিশ্বাস করি— যদি ক্লায়েন্ট উপকৃত হন, তবেই আমরা সফল। সেই লক্ষ্যেই আমাদের প্রতিটি কোড, প্রতিটি ডিজাইন এবং প্রতিটি আইডিয়া।</p>
              <p>In every project, we believe that our true achievement lies in the client’s benefit. That’s why every line of our code, every design, and every idea is driven by this mission.</p>
            </div>

            <div className="space-y-2">
              <p>🔧 <strong>আমাদের সার্ভিসসমূহ (Our Services)</strong></p>
              <ul className="list-disc pl-5">
                <li>কাস্টম সফটওয়্যার ডেভেলপমেন্ট (Custom Software Development)</li>
                <li>ওয়েব অ্যাপ্লিকেশন (Web Applications)</li>
                <li>মোবাইল অ্যাপ (Mobile Apps)</li>
                <li>ক্লাউড সল্যুশন (Cloud Solutions)</li>
                <li>API ডেভেলপমেন্ট (API Development)</li>
                <li>UI/UX ডিজাইন (UI/UX Design)</li>
              </ul>
            </div>

            <div className="border-t pt-4 space-y-2">
              <img src="https://res.cloudinary.com/dlklqihg6/image/upload/v1760308052/kkchmpjdp9izcjfvvo4k.jpg" alt="Mohammad Esa Ali" className="w-20 h-20 rounded-full mx-auto" />
              <p className="text-center font-bold">👋 About Me</p>
              <p>Hello, I am Mohammad Esa Ali, a passionate and creative tech enthusiast. I specialize in Software Development, Web Solutions, and Creative Design. My goal is to help businesses grow by building smart, future-ready, and user-friendly digital solutions.</p>
              <p>💡 <em>“Success comes when your clients succeed.”</em></p>
            </div>

            <div className="border-t pt-4 space-y-2">
              <p>🛠️ <strong>Products</strong></p>
              <p>We develop smart, scalable, and future-ready software products tailored to meet the unique needs of modern businesses. Our products are designed to help you: Automate processes, Improve efficiency, Scale with confidence.</p>
            </div>

            <p className="text-xs pt-4 border-t">Copyright © IM Softwark</p>
          </>
        ) : (
          <>
            <p>{t('আমাদের সাথে যোগাযোগের জন্য ইমেইল করুন')}:</p>
            <div className="flex items-center gap-2">
              <a href={`mailto:${email}`} className="text-blue-600 font-semibold hover:underline">
                {email}
              </a>
              <button onClick={copyToClipboard} className="p-1 text-gray-500 hover:text-blue-600" title={t('কপি করুন')}>
                <Copy className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
