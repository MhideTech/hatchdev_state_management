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
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <CheckCircle2 size={22} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-900">
                  Currently Authenticated in Redux
                </h4>
                <p className="text-xs text-slate-500">
                  Signed in as <span className="font-medium text-slate-800">{user.name}</span> ({user.email})
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch(logoutUser())}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 transition border border-rose-200"
            >
              <LogOut size={13} />
              Log Out
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-500 pt-3 border-t border-slate-100">
            💡 Want to switch accounts? Enter new credentials below or click a demo user to overwrite the Redux user slice.
          </p>
        </div>
      ) : null}

      {/* Main Login Card */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden">
        {/* Card Header */}
        <div className="px-6 pt-6 pb-4 border-b border-slate-100 bg-gradient-to-br from-slate-50/80 to-indigo-50/30">
          <div className="flex items-center gap-2 text-indigo-600 mb-1">
            <div className="p-1.5 rounded-lg bg-indigo-100/80">
              <LogIn size={18} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
              Authentication Portal
            </span>
          </div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {user.isLoggedIn ? 'Switch User Account' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Log in to dispatch user credentials into global Redux store state.
          </p>
        </div>

        <div className="p-6">
          {/* Quick Demo Fill Section */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={13} className="text-amber-500" />
                Quick Test Profiles (One-Click)
              </span>
              <span className="text-[11px] text-indigo-600 font-medium">Instant State Fill</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {DEMO_USERS.map((demo) => (
                <button
                  key={demo.email}
                  type="button"
                  onClick={() => fillDemo(demo)}
                  className="flex flex-col text-left p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 bg-slate-50/50 transition group cursor-pointer"
                >
                  <span className="text-xs font-semibold text-slate-800 group-hover:text-indigo-600 transition truncate">
                    {demo.name}
                  </span>
                  <span className="text-[10px] text-slate-500 truncate">{demo.role}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex py-1 items-center mb-5">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[11px] uppercase tracking-wider text-slate-400 font-medium">
              or enter custom details
            </span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
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
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
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
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="role" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Professional Role
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Briefcase size={15} />
                  </div>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition text-slate-700"
                  >
                    {ROLES.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="bio" className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Short Bio (Optional)
                </label>
                <input
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="What are you building?"
                  className="w-full px-3 py-2 text-sm bg-slate-50/50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full mt-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <LogIn size={16} />
              {user.isLoggedIn ? 'Update & Dispatch to Redux' : 'Log In & Save to Redux'}
            </button>
          </form>

          {/* Success Notification */}
          {justSubmitted && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 animate-fadeIn">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <span>
                <strong>Dispatched successfully!</strong> Redux state updated across all components.
              </span>
            </div>
          )}

          {/* Redux architecture notice */}
          <div className="mt-5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start gap-2.5">
            <ShieldCheck size={16} className="text-indigo-600 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-600">
              <strong className="text-slate-800">Redux Toolkit Integration:</strong> Submitting dispatches the{' '}
              <code className="px-1 py-0.5 rounded bg-slate-200 text-slate-800 text-[10px] font-mono">
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