import { useState } from 'react';
import { User, Mail, Shield, Key } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ImageUpload } from '../components/common/ImageUpload';

export function Profile() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [toast, setToast] = useState<string | null>(null);

  const handleSave = () => {
    setToast('Profile updated successfully!');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <User className="w-6 h-6 text-amber-500" />
          <span>Admin Profile</span>
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Manage your personal account credentials and avatar.
        </p>
      </div>

      {toast && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          {toast}
        </div>
      )}

      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100 dark:border-slate-800">
          <img
            src={avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80'}
            alt="Avatar"
            className="w-20 h-20 rounded-2xl object-cover ring-4 ring-amber-500/20"
          />
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{user?.name || 'Signed-in admin'}</h3>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
              <Mail className="w-3.5 h-3.5" />
              <span>{user?.email || 'No profile loaded yet'}</span>
            </p>
            <span className="inline-flex items-center gap-1 mt-2 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 text-[10px] font-bold uppercase tracking-wider">
              <Shield className="w-3 h-3" />
              <span>{user?.role || 'admin'}</span>
            </span>
          </div>
        </div>

        <ImageUpload label="Update Profile Avatar" value={avatar} onChange={setAvatar} />

        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name</label>
            <input
              type="text"
              defaultValue={user?.name || ''}
              className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              readOnly
              value={user?.email || ''}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-500"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Key className="w-4 h-4 text-amber-500" />
              <span>Change Password</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="password"
                placeholder="New Password"
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full px-3.5 py-2 text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white rounded-xl shadow-md transition"
          >
            Update Profile
          </button>
        </div>
      </div>
    </div>
  );
}
