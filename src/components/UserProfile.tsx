import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { User, ShieldCheck } from 'lucide-react';

interface UserProfileProps {
  variant?: 'navbar' | 'sidebar' | 'card';
  onClick?: () => void;
}

const UserProfile = ({ variant = 'card', onClick }: UserProfileProps) => {
  const user = useSelector((state: RootState) => state.user);

  const getInitials = (name: string) => {
    if (!name.trim()) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  if (variant === 'navbar') {
    if (!user.isLoggedIn || !user.name) {
      return (
        <div 
          onClick={onClick}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition cursor-pointer"
        >
          <div className="w-6 h-6 rounded-full bg-slate-300 flex items-center justify-center text-slate-600">
            <User size={13} />
          </div>
          <span className="hidden sm:inline">Guest User</span>
          <span className="w-2 h-2 rounded-full bg-amber-400"></span>
        </div>
      );
    }

    return (
      <div 
        onClick={onClick}
        className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 transition cursor-pointer shadow-xs"
      >
        <div className={`w-7 h-7 rounded-full bg-gradient-to-tr ${user.avatarColor || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-white text-xs font-bold shadow-xs relative`}>
          {getInitials(user.name)}
          <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white"></span>
        </div>
        <div className="hidden sm:flex flex-col text-left">
          <span className="text-xs font-semibold text-slate-800 leading-tight truncate max-w-[120px]">
            {user.name}
          </span>
          <span className="text-[10px] text-slate-500 leading-tight">
            {user.role || 'Member'}
          </span>
        </div>
      </div>
    );
  }

  if (variant === 'sidebar') {
    if (!user.isLoggedIn || !user.name) {
      return (
        <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-700/70 border border-slate-600 flex items-center justify-center text-slate-400">
            <User size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-slate-300">Not Logged In</p>
            <p className="text-[11px] text-slate-400 truncate">Sign in to access state</p>
          </div>
        </div>
      );
    }

    return (
      <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/70 flex items-center gap-3 shadow-inner">
        <div className={`relative w-10 h-10 rounded-xl bg-gradient-to-tr ${user.avatarColor || 'from-indigo-500 to-purple-600'} flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0`}>
          {getInitials(user.name)}
          <span className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-800"></span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="text-xs font-semibold text-slate-100 truncate">{user.name}</p>
            <ShieldCheck size={13} className="text-emerald-400 shrink-0" />
          </div>
          <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
          <span className="inline-block mt-0.5 px-1.5 py-0.2 text-[9px] font-medium tracking-wide uppercase bg-indigo-500/20 text-indigo-300 rounded border border-indigo-500/30">
            {user.role}
          </span>
        </div>
      </div>
    );
  }

  // Standalone card variant
  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200 shadow-sm p-6 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-90"></div>

      <div className="relative pt-6 flex flex-col items-center text-center">
        {user.isLoggedIn && user.name ? (
          <>
            <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${user.avatarColor || 'from-indigo-500 to-purple-600'} text-white flex items-center justify-center text-2xl font-bold ring-4 ring-white shadow-lg mb-3 relative`}>
              {getInitials(user.name)}
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>

            <div className="flex items-center gap-1.5">
              <h3 className="text-lg font-bold text-slate-900">{user.name}</h3>
              <ShieldCheck size={16} className="text-indigo-600" />
            </div>
            <p className="text-xs text-slate-500 font-medium">{user.email}</p>
            <span className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
              {user.role}
            </span>

            {user.bio && (
              <p className="mt-3 text-xs text-slate-600 max-w-sm italic">
                "{user.bio}"
              </p>
            )}

            <div className="mt-4 pt-4 border-t border-slate-100 w-full grid grid-cols-2 gap-3 text-left">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Status</span>
                <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active (In Redux)
                </span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-[10px] uppercase font-semibold text-slate-400 block">Last Action</span>
                <span className="text-xs font-semibold text-slate-700 truncate block mt-0.5">
                  {user.lastLoginTime || 'Just now'}
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center ring-4 ring-white shadow mb-3">
              <User size={30} />
            </div>
            <h3 className="text-base font-bold text-slate-800">No User Logged In</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-xs">
              State currently holds default empty values. Use the login form to dispatch user state to Redux.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;