import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { updateProfile, logoutUser } from '../redux/user/userSlice';
import Login from './Login';
import {
  ShieldCheck,
  UserCheck,
  Activity,
  Layers,
  Sparkles,
  Edit3,
  Copy,
  Check,
  Clock,
  Database,
  Cpu,
  RefreshCw
} from 'lucide-react';

interface UserPageProps {
  activeTab?: string;
  setActiveTab?: (tab: string) => void;
}

const EditProfileForm = ({ user }: { user: RootState['user'] }) => {
  const dispatch = useDispatch();
  const [editName, setEditName] = useState(user.name);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editRole, setEditRole] = useState(user.role || 'Frontend Engineer');
  const [editBio, setEditBio] = useState(user.bio || '');
  const [editSaved, setEditSaved] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(updateProfile({
      name: editName,
      email: editEmail,
      role: editRole,
      bio: editBio,
    }));
    setEditSaved(true);
    setTimeout(() => setEditSaved(false), 2500);
  };

  return (
    <form onSubmit={handleUpdate} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={editEmail}
            onChange={(e) => setEditEmail(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Role / Title
          </label>
          <select
            value={editRole}
            onChange={(e) => setEditRole(e.target.value)}
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-200 transition"
          >
            <option value="Frontend Engineer">Frontend Engineer</option>
            <option value="Full Stack Engineer">Full Stack Engineer</option>
            <option value="UI/UX Designer">UI/UX Designer</option>
            <option value="Technical Lead">Technical Lead</option>
            <option value="Product Manager">Product Manager</option>
            <option value="DevOps Specialist">DevOps Specialist</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            Short Bio
          </label>
          <input
            type="text"
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            placeholder="Tell us what you're working on"
            className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="pt-2 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Dispatches: <code className="font-mono text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-1.5 py-0.5 rounded">user/updateProfile</code>
        </span>
        <button
          type="submit"
          className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center gap-2 cursor-pointer active:scale-[0.98]"
        >
          <RefreshCw size={13} className={editSaved ? 'animate-spin' : ''} />
          {editSaved ? 'Dispatched to Store!' : 'Dispatch Update to Redux'}
        </button>
      </div>
    </form>
  );
};

const UserPage = ({ setActiveTab }: UserPageProps) => {
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [copied, setCopied] = useState(false);

  const copyStateJson = () => {
    navigator.clipboard.writeText(JSON.stringify(user, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // If user is not logged in, render a focused, welcoming landing & login view
  if (!user.isLoggedIn) {
    return (
      <div className="space-y-8 max-w-5xl mx-auto py-2">
        {/* Atmospheric Glass Welcome Banner */}
        <div className="relative overflow-hidden rounded-3xl glass-panel p-8 sm:p-10 shadow-2xl border border-white/20 dark:border-white/10">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>
          
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 text-xs font-semibold uppercase tracking-wider mb-4 border border-indigo-500/20 dark:border-indigo-500/30">
              <Sparkles size={14} className="text-amber-400" />
              HatchDev State Management Lab
            </span>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Centralized State Management with <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">Redux Toolkit</span>
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              This application demonstrates reactive global state synchronization across separated components. Log in below or pick a preset persona to watch your credentials flow into the Navbar, Sidebar, and Dashboard in real-time.
            </p>
          </div>
        </div>

        {/* Login Component */}
        <Login />

        {/* Educational Architecture Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
          <div className="p-6 rounded-3xl glass-panel shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm mb-3 border border-indigo-500/20">
              01
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. Action Dispatch</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Form submit dispatches <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">setUser()</code> action with user credentials.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold text-sm mb-3 border border-purple-500/20">
              02
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. Reducer Mutation</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">userSlice</code> reducer safely immutably updates the centralized store state.
            </p>
          </div>

          <div className="p-6 rounded-3xl glass-panel shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-sm mb-3 border border-emerald-500/20">
              03
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">3. Reactive Re-render</h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Components hooked via <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">useSelector()</code> immediately re-render with new data.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated State View
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl glass-panel p-6 sm:p-8 shadow-xl border border-white/20 dark:border-white/10">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-gradient-to-tr from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl pointer-events-none animate-float-slow"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Active Session
              </span>
              <span className="text-slate-500 dark:text-slate-400 text-xs">Redux Store Connected</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">{user.name}</span>!
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl">
              {user.bio || 'Your profile state is currently synced across the Sidebar, Navbar, and Dashboard.'}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActiveTab && setActiveTab('inspector')}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold glass-panel hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition flex items-center gap-2 cursor-pointer shadow-xs"
            >
              <Layers size={14} className="text-indigo-600 dark:text-indigo-400" />
              Inspect State
            </button>
            <button
              onClick={() => dispatch(logoutUser())}
              className="px-4 py-2.5 rounded-2xl text-xs font-semibold bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800 transition cursor-pointer shadow-xs"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards with Glassmorphism */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl glass-panel glass-card-interactive flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Auth Status</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1.5">
              <UserCheck size={18} /> Authenticated
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Session active in store</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center border border-emerald-500/20">
            <ShieldCheck size={20} />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-panel glass-card-interactive flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Current Role</p>
            <p className="text-base font-bold text-slate-800 dark:text-white mt-1 truncate max-w-[130px]">
              {user.role}
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <Cpu size={20} />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-panel glass-card-interactive flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Action History</p>
            <p className="text-lg font-bold text-slate-800 dark:text-white mt-1">
              {user.history ? user.history.length : 1} Actions
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Logged this session</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center border border-purple-500/20">
            <Activity size={20} />
          </div>
        </div>

        <div className="p-5 rounded-3xl glass-panel glass-card-interactive flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Redux Slices</p>
            <p className="text-base font-bold text-indigo-600 dark:text-indigo-400 mt-1 font-mono">
              user, theme
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">State management active</p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center border border-sky-500/20">
            <Database size={20} />
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Profile Editor + Live State Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Live Profile Editor (7 Cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 space-y-5 shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit3 size={18} className="text-indigo-600 dark:text-indigo-400" />
                Live State Dispatcher
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Edit profile details below and click dispatch. Watch Navbar & Sidebar update instantly!
              </p>
            </div>
          </div>

          <EditProfileForm key={user.name + user.email + (user.role || '')} user={user} />

          {/* Demonstration Notice */}
          <div className="p-4 rounded-2xl bg-indigo-500/10 dark:bg-indigo-950/40 border border-indigo-500/20 flex items-start gap-3">
            <Sparkles size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <p className="text-xs text-indigo-900 dark:text-indigo-200 leading-relaxed">
              <strong>Notice:</strong> When you click <em>Dispatch Update</em>, this component doesn't pass props to Navbar or Sidebar. Instead, Redux updates the central store, and both Navbar and Sidebar independently react through their <code className="px-1.5 py-0.5 bg-indigo-100 dark:bg-indigo-900/60 rounded font-mono text-[10px]">useSelector</code> hooks!
            </p>
          </div>
        </div>

        {/* Right Column: Live Redux State Inspector (5 Cols) */}
        <div className="lg:col-span-5 bg-slate-950/90 dark:bg-slate-950/95 backdrop-blur-2xl rounded-3xl border border-slate-800 dark:border-white/10 shadow-2xl p-6 flex flex-col justify-between text-slate-200">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-slate-800 dark:border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider font-mono">
                  store.getState().user
                </h3>
              </div>
              <button
                type="button"
                onClick={copyStateJson}
                className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium flex items-center gap-1.5 transition cursor-pointer border border-slate-700/60"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            {/* Live State JSON Block */}
            <div className="mt-4 bg-slate-900/90 rounded-2xl p-4 border border-slate-800/80 font-mono text-xs overflow-x-auto max-h-72">
              <pre className="text-emerald-400 leading-relaxed">
                {JSON.stringify(
                  {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    bio: user.bio,
                    isLoggedIn: user.isLoggedIn,
                    avatarColor: user.avatarColor,
                    lastLoginTime: user.lastLoginTime,
                  },
                  null,
                  2
                )}
              </pre>
            </div>
          </div>

          <div className="mt-5 pt-3.5 border-t border-slate-800 dark:border-white/10 text-[11px] text-slate-400 flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono">
              <Database size={12} className="text-indigo-400" />
              Slices: 2 (user, theme)
            </span>
            <span className="text-slate-400">
              Live updates via Redux Toolkit
            </span>
          </div>
        </div>
      </div>

      {/* Dispatched Actions History Timeline */}
      <div className="glass-panel rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 dark:border-white/10">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Clock size={18} className="text-indigo-600 dark:text-indigo-400" />
              Session Action Dispatch Timeline
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Live audit stream of all Redux actions dispatched to the store.
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 font-mono">
            {user.history ? user.history.length : 1} logged
          </span>
        </div>

        <div className="mt-4 space-y-3">
          {user.history && user.history.length > 0 ? (
            user.history.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-white/50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/80 dark:hover:bg-slate-800/60 transition shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 font-mono text-[11px] font-bold shrink-0 border border-indigo-500/20">
                    {log.type}
                  </span>
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
                    {log.payloadSummary}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500 shrink-0 flex items-center gap-1">
                  <Clock size={11} /> {log.timestamp}
                </span>
              </div>
            ))
          ) : (
            <p className="text-xs text-slate-400 italic">No actions recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;