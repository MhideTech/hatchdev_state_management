import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../redux/user/userSlice';
import type { RootState } from '../redux/store';
import UserProfile from './UserProfile';
import { 
  LayoutDashboard, 
  Layers, 
  User as UserIcon, 
  LogOut, 
  Cpu, 
  Sparkles,
  GitBranch,
  X
} from 'lucide-react';

interface SidebarProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar = ({ 
  activeTab = 'dashboard', 
  setActiveTab, 
  isOpen = false, 
  onClose 
}: SidebarProps) => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  const navItems = [
    { id: 'dashboard', label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'profile', label: 'User Profile & State', icon: UserIcon },
    { id: 'inspector', label: 'Live Redux Inspector', icon: Layers },
    { id: 'architecture', label: 'State Architecture', icon: GitBranch },
  ];

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 border-r border-slate-800/90 text-slate-300 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
              <Sparkles size={18} />
            </div>
            <div>
              <span className="text-sm font-bold tracking-tight text-white block">
                StateCraft
              </span>
              <span className="text-[10px] font-medium tracking-wider uppercase text-indigo-400 block -mt-0.5">
                Redux Toolkit Hub
              </span>
            </div>
          </div>

          {/* Close button for mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Live Redux Status Pill */}
        <div className="px-5 pt-4 pb-2">
          <div className="px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300 font-medium text-[11px]">Redux Store</span>
            </div>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
              {user.isLoggedIn ? 'Authenticated' : 'Guest'}
            </span>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 px-4 py-3 space-y-1 overflow-y-auto">
          <div className="px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (setActiveTab) setActiveTab(item.id);
                  if (onClose) onClose();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer text-left ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-white' : 'text-slate-400'} />
                <span>{item.label}</span>
                {item.id === 'inspector' && (
                  <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-indigo-400 border border-slate-700 font-mono">
                    Live
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-4 px-2 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Store Metrics
          </div>

          <div className="p-3 rounded-xl bg-slate-800/40 border border-slate-800 text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400 flex items-center gap-1.5">
                <Cpu size={12} className="text-indigo-400" /> Slices Loaded
              </span>
              <span className="font-mono text-slate-200 font-semibold">1 (user)</span>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-slate-400">Actions Logged</span>
              <span className="font-mono text-slate-200 font-semibold">
                {user.history?.length || 1}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom User Profile & Logout Section */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/90 space-y-3">
          <UserProfile variant="sidebar" />

          {user.isLoggedIn && (
            <button
              onClick={handleLogout}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold text-rose-400 hover:text-white bg-rose-500/10 hover:bg-rose-600 border border-rose-500/20 hover:border-rose-600 transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogOut size={14} />
              Sign Out from Redux
            </button>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;