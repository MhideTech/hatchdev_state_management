import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { toggleTheme } from '../redux/theme/themeSlice';
import UserProfile from './UserProfile';
import { 
  Menu, 
  Search, 
  Bell, 
  Activity,
  Layers,
  Sun,
  Moon
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  activeTab?: string;
  onOpenProfile?: () => void;
}

const Navbar = ({ onToggleSidebar, activeTab = 'dashboard', onOpenProfile }: NavbarProps) => {
  const user = useSelector((state: RootState) => state.user);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  const getTabLabel = (tab: string) => {
    switch (tab) {
      case 'dashboard': return 'Dashboard Overview';
      case 'profile': return 'User Profile & State Sync';
      case 'inspector': return 'Live Redux State Inspector';
      case 'architecture': return 'Architecture & Data Flow';
      default: return 'Overview';
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 w-full glass-panel px-4 sm:px-6 flex items-center justify-between transition-colors">
      {/* Left Section: Mobile Menu + Breadcrumb */}
      <div className="flex items-center gap-3">
        {onToggleSidebar && (
          <button
            type="button"
            onClick={onToggleSidebar}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer"
            aria-label="Toggle navigation"
          >
            <Menu size={20} />
          </button>
        )}

        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 dark:text-slate-400 hidden sm:inline">HatchDev</span>
          <span className="text-slate-400 dark:text-slate-600 hidden sm:inline">/</span>
          <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            <Layers size={14} className="text-indigo-600 dark:text-indigo-400 hidden sm:inline" />
            {getTabLabel(activeTab)}
          </span>
        </div>
      </div>

      {/* Center: Live Sync Status Pill */}
      <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700/80 text-xs backdrop-blur-xs">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-400"></span>
        </span>
        <span className="text-slate-600 dark:text-slate-300 font-medium text-[11px] flex items-center gap-1">
          <Activity size={12} className="text-indigo-600 dark:text-indigo-400" />
          Redux Store: <strong className="text-slate-800 dark:text-slate-100">{user.isLoggedIn ? 'Active Session' : 'Idle'}</strong>
        </span>
      </div>

      {/* Right Section: Theme Toggle, Search, GitHub, Notifications, UserProfile */}
      <div className="flex items-center gap-2 sm:gap-2.5">
        {/* Search Mock */}
        <div className="hidden xl:flex items-center relative">
          <Search size={14} className="absolute left-3 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search state..."
            className="pl-8 pr-8 py-1.5 text-xs bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 w-36 transition text-slate-800 dark:text-slate-200"
            readOnly
          />
          <kbd className="absolute right-2 px-1 text-[9px] font-mono text-slate-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded shadow-2xs pointer-events-none">
            ⌘K
          </kbd>
        </div>

        {/* Theme Mode Switcher */}
        <button
          type="button"
          onClick={() => dispatch(toggleTheme())}
          className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition cursor-pointer relative"
          title={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
          aria-label="Toggle theme"
        >
          {themeMode === 'dark' ? (
            <Sun size={18} className="text-amber-400 animate-spin-once" />
          ) : (
            <Moon size={18} className="text-indigo-600" />
          )}
        </button>

        {/* GitHub link */}
        <a
          href="https://github.com/MhideTech/hatchdev_state_management"
          target="_blank"
          rel="noreferrer"
          title="View GitHub Repository"
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
        >
          <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>

        {/* Notification indicator */}
        <div className="relative">
          <button
            type="button"
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition relative"
            title="Notifications"
          >
            <Bell size={18} />
            {user.history && user.history.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
            )}
          </button>
        </div>

        <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>

        {/* UserProfile Compact Variant */}
        <UserProfile variant="navbar" onClick={onOpenProfile} />
      </div>
    </header>
  );
};

export default Navbar;