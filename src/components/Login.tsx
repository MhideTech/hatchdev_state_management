import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logoutUser } from '../redux/user/userSlice';
import type { RootState } from '../redux/store';
import { LogIn, Sparkles, Mail, User, Briefcase, LogOut, CheckCircle2, ShieldCheck } from 'lucide-react';

const DEMO_USERS = [
  {
    name: 'Olamide Israel',
    email: 'olamide@hatchdev.io',
    role: 'Full Stack Engineer',
    bio: 'Specializing in React, TypeScript, Redux Toolkit and cloud deployments.',
  },
  {
    name: 'Sarah Adeyemi',
    email: 'sarah.a@design.co',
    role: 'UI/UX Architect',
    bio: 'Crafting accessible design systems and delightful digital experiences.',
  },
  {
    name: 'David Okafor',
    email: 'david.o@hatchdev.io',
    role: 'Technical Lead',
    bio: 'Architecting scalable state pipelines and high-throughput web apps.',
  },
];

const ROLES = [
  'Frontend Engineer',
  'Full Stack Engineer',
  'UI/UX Designer',
  'Technical Lead',
  'Product Manager',
  'DevOps Specialist',
];

const Login = () => {
  const user = useSelector((state: RootState) => state.user);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLES[0]);
  const [bio, setBio] = useState('');
  const [justSubmitted, setJustSubmitted] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim() && email.trim()) {
      dispatch(setUser({ 
        name: name.trim(), 
        email: email.trim(), 
        role, 
        bio: bio.trim() || undefined 
      }));
      setJustSubmitted(true);
      setTimeout(() => setJustSubmitted(false), 3000);
    }
  };

  const fillDemo = (demo: typeof DEMO_USERS[0]) => {
    setName(demo.name);
    setEmail(demo.email);
    setRole(demo.role);
    setBio(demo.bio);
    dispatch(setUser({
      name: demo.name,
      email: demo.email,
      role: demo.role,
      bio: demo.bio,
    }));
    setJustSubmitted(true);
    setTimeout(() => setJustSubmitted(false), 3000);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* If already logged in, show active status banner */}
      {user.isLoggedIn ? (
        <div className="glass-panel rounded-3xl p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                  Currently Authenticated in Redux
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Signed in as <span className="font-semibold text-slate-800 dark:text-slate-200">{user.name}</span> ({user.email})
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(logoutUser())}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/50 transition border border-rose-200 dark:border-rose-800 cursor-pointer"
            >
              <LogOut size={13} />
              Log Out
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/60 dark:border-white/10">
            💡 Want to switch accounts? Enter new credentials below or click a demo user to overwrite the Redux user slice.
          </p>
        </div>
      ) : null}

      {/* Main Glassmorphic Login Card */}
      <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl">
        {/* Card Header with vibrant atmospheric gradient */}
        <div className="px-6 pt-6 pb-5 border-b border-slate-200/60 dark:border-white/10 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-1.5">
            <div className="p-1.5 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800">
              <LogIn size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
              Authentication Portal
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            {user.isLoggedIn ? 'Switch User Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Log in to dispatch user credentials into global Redux store state.
          </p>
        </div>

        <div className="p-6">
          {/* Quick Demo Fill Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={13} className="text-amber-500" />
                Quick Test Profiles (One-Click)
              </span>
              <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">Instant State Fill</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => fillDemo(demo)}
                  className="flex flex-col text-left p-3 rounded-2xl border border-slate-200/80 dark:border-white/10 hover:border-indigo-400 dark:hover:border-indigo-500/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30 bg-slate-50/60 dark:bg-slate-800/40 transition-all group cursor-pointer shadow-2xs hover:shadow-md"
                >
                  <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition truncate">
                    {demo.name}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{demo.role}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center mb-5">
            <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium">
              or enter custom details
            </span>
            <div className="flex-grow border-t border-slate-200 dark:border-white/10"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User size={16} />
                </div>
                <input
                  id="name"
                  name="name"
                  value={name}
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="e.g. Alex Morgan"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="e.g. alex.morgan@example.com"
                  className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="role" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Professional Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Briefcase size={15} />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-800 dark:text-slate-200 transition"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r} className="bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200">
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Short Bio (Optional)
                </label>
                <input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="What are you building?"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50/60 dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-white transition placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <LogIn size={16} />
              {user.isLoggedIn ? 'Update & Dispatch to Redux' : 'Log In & Save to Redux'}
            </button>
          </form>

          {/* Success Notification */}
          {justSubmitted && (
            <div className="mt-4 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2 animate-fadeIn backdrop-blur-xs">
              <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
              <span>
                <strong>Dispatched successfully!</strong> Redux state updated across all components.
              </span>
            </div>
          )}

          {/* Redux architecture notice */}
          <div className="mt-5 p-3.5 rounded-2xl bg-slate-100/60 dark:bg-slate-800/40 border border-slate-200/80 dark:border-white/5 flex items-start gap-2.5">
            <ShieldCheck size={16} className="text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-600 dark:text-slate-400">
              <strong className="text-slate-800 dark:text-slate-200">Redux Toolkit Integration:</strong> Submitting dispatches the{' '}
              <code className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-[10px] font-mono">
                user/setUser
              </code>{' '}
              action to update the centralized store.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;