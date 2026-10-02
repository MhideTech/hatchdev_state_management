import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import UserPage from './components/UserPage';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from './redux/store';
import { logoutUser } from './redux/user/userSlice';
import { 
  Layers, 
  Database, 
  GitBranch, 
  CheckCircle2, 
  ArrowRight,
  ExternalLink,
  Zap,
  Sparkles
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  // Sync document class with Redux theme mode
  useEffect(() => {
    if (themeMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [themeMode]);

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans transition-colors duration-300 ${
      themeMode === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50/80 text-slate-900'
    }`}>
      {/* Atmospheric Ambient Glow Mesh Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Top-right vibrant violet orb */}
        <div className="absolute -top-32 -right-32 w-96 sm:w-[550px] h-96 sm:h-[550px] bg-gradient-to-br from-indigo-500/20 via-purple-600/20 to-pink-500/10 rounded-full blur-[110px] animate-float-slow"></div>
        {/* Bottom-left glowing cyan/emerald orb */}
        <div className="absolute -bottom-32 -left-32 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/15 to-emerald-400/10 rounded-full blur-[120px] animate-float-reverse"></div>
        {/* Center ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 sm:w-[600px] h-80 sm:h-[600px] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none"></div>
      </div>

      <div className="relative z-10 flex min-h-screen">
        {/* Sidebar Navigation */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all duration-300">
          {/* Top Navbar */}
          <Navbar
            activeTab={activeTab}
            onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
            onOpenProfile={() => setActiveTab('profile')}
          />

          {/* Page Body */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === 'dashboard' && (
              <UserPage activeTab={activeTab} setActiveTab={setActiveTab} />
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Profile Management</h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Manage your identity stored in the centralized Redux Toolkit state slice.
                    </p>
                  </div>
                  {user.isLoggedIn && (
                    <button
                      onClick={() => dispatch(logoutUser())}
                      className="px-4 py-2 rounded-2xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 transition cursor-pointer shadow-xs"
                    >
                      Disconnect Profile
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                  <div className="md:col-span-5">
                    <UserProfile variant="card" />
                  </div>
                  <div className="md:col-span-7">
                    <Login />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'inspector' && (
              <div className="space-y-6 max-w-5xl mx-auto">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
                  <div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Layers size={24} className="text-indigo-600 dark:text-indigo-400" />
                      Live Redux State Tree Inspector
                    </h1>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Real-time inspection of your Redux store state tree, slices, and action audit trail.
                    </p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-semibold border border-emerald-500/30 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Store: ONLINE
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-slate-800 dark:border-white/10 p-6 text-slate-200 shadow-2xl">
                    <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 dark:border-white/10">
                      <span className="text-xs font-mono font-semibold text-indigo-400">
                        // Current Root Store Snapshot
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        State type: RootState
                      </span>
                    </div>
                    <pre className="mt-4 text-xs font-mono text-emerald-400 bg-slate-900/90 p-4 rounded-2xl overflow-x-auto border border-slate-800/80 leading-relaxed max-h-[450px]">
                      {JSON.stringify({ user, theme: { mode: themeMode } }, null, 2)}
                    </pre>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-5 rounded-3xl glass-panel shadow-xs">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                        <Database size={16} className="text-indigo-600 dark:text-indigo-400" />
                        Active Redux Slices
                      </h3>
                      <div className="space-y-2.5 text-xs">
                        <div className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                          <div>
                            <span className="font-mono font-bold text-slate-800 dark:text-white">user</span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Authentication & user credentials</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-[10px] font-semibold">
                            userSlice.tsx
                          </span>
                        </div>
                        <div className="p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex items-center justify-between">
                          <div>
                            <span className="font-mono font-bold text-slate-800 dark:text-white">theme</span>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">Dark / Light glassmorphic mode</p>
                          </div>
                          <span className="px-2 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 font-mono text-[10px] font-semibold">
                            themeSlice.ts
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-5 rounded-3xl glass-panel shadow-xs">
                      <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
                        <Zap size={16} className="text-amber-500" />
                        Quick State Actions
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
                        Dispatch pre-configured test actions directly to observe live state changes.
                      </p>
                      <button
                        onClick={() => setActiveTab('profile')}
                        className="w-full text-left p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 hover:bg-indigo-50/60 dark:hover:bg-indigo-950/40 border border-slate-200/60 dark:border-white/10 transition text-xs font-medium text-slate-700 dark:text-slate-200 flex items-center justify-between cursor-pointer"
                      >
                        <span>Switch User / Test New Credentials</span>
                        <ArrowRight size={13} className="text-slate-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'architecture' && (
              <div className="space-y-6 max-w-4xl mx-auto">
                <div className="pb-4 border-b border-slate-200/60 dark:border-white/10">
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <GitBranch size={24} className="text-indigo-600 dark:text-indigo-400" />
                    State Management Architecture
                  </h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    How unidirectional data flow works in this HatchDev Redux application.
                  </p>
                </div>

                <div className="p-6 sm:p-8 rounded-3xl glass-panel shadow-sm space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                      <Sparkles size={14} /> Unidirectional Data Flow Cycle
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
                      <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">1</span>
                        <strong className="text-xs text-indigo-950 dark:text-indigo-200">UI Event</strong>
                        <span className="text-[11px] text-indigo-700 dark:text-indigo-300 mt-1">Login form or profile edit</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-purple-600 text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">2</span>
                        <strong className="text-xs text-purple-950 dark:text-purple-200">Dispatch Action</strong>
                        <span className="text-[11px] text-purple-700 dark:text-purple-300 mt-1">setUser() or updateProfile()</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/20 flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-pink-600 text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">3</span>
                        <strong className="text-xs text-pink-950 dark:text-pink-200">Reducer Executes</strong>
                        <span className="text-[11px] text-pink-700 dark:text-pink-300 mt-1">Immer mutates userSlice</span>
                      </div>

                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-center">
                        <span className="w-7 h-7 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center mb-2 shadow-xs">4</span>
                        <strong className="text-xs text-emerald-950 dark:text-emerald-200">Components Re-render</strong>
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">Navbar & Sidebar update live</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 space-y-3">
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                      Core Technical Stack
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
                      <li className="flex items-center gap-2 p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span><strong>@reduxjs/toolkit:</strong> Modern standardized Redux store</span>
                      </li>
                      <li className="flex items-center gap-2 p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span><strong>react-redux:</strong> Provider & typed hooks (useSelector, useDispatch)</span>
                      </li>
                      <li className="flex items-center gap-2 p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span><strong>Tailwind CSS v4:</strong> Glassmorphism & responsive layout</span>
                      </li>
                      <li className="flex items-center gap-2 p-3 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5">
                        <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        <span><strong>TypeScript:</strong> Type-safe reducers and root state definition</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </main>

          {/* Global Glassmorphic Footer */}
          <footer className="mt-auto border-t border-slate-200/60 dark:border-white/10 glass-panel py-4 px-6 text-xs text-slate-500 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-slate-800 dark:text-slate-200">HatchDev</span>
              <span>•</span>
              <span>State Management Project</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Redux Toolkit + React 19 + Tailwind CSS</span>
              <span>•</span>
              <a
                href="https://github.com/MhideTech/hatchdev_state_management"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-600 dark:hover:text-indigo-400 transition flex items-center gap-1 font-medium"
              >
                GitHub <ExternalLink size={11} />
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;