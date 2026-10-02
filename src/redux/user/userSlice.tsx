import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface ActionLog {
  id: string;
  type: string;
  timestamp: string;
  payloadSummary: string;
}

export interface UserState {
  name: string;
  email: string;
  role: string;
  bio?: string;
  isLoggedIn: boolean;
  avatarColor: string;
  lastLoginTime?: string;
  history: ActionLog[];
}

const colorPalettes = [
  'from-indigo-500 to-purple-600',
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-600',
  'from-rose-500 to-orange-500',
  'from-violet-600 to-fuchsia-600',
];

const getDeterministicPalette = (name: string): string => {
  if (!name) return colorPalettes[0];
  const charCode = name.charCodeAt(0) + (name.charCodeAt(name.length - 1) || 0);
  return colorPalettes[charCode % colorPalettes.length];
};

const initialState: UserState = {
  name: '',
  email: '',
  role: 'Frontend Engineer',
  bio: 'Building reactive interfaces with React, Redux Toolkit & Tailwind CSS.',
  isLoggedIn: false,
  avatarColor: colorPalettes[0],
  lastLoginTime: undefined,
  history: [
    {
      id: 'init-1',
      type: 'store/initialized',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      payloadSummary: 'Initial store hydrated with default guest state',
    },
  ],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ name: string; email: string; role?: string; bio?: string }>
    ) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      if (action.payload.role) {
        state.role = action.payload.role;
      }
      if (action.payload.bio) {
        state.bio = action.payload.bio;
      }
      state.avatarColor = getDeterministicPalette(action.payload.name);
      state.isLoggedIn = true;
      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      state.lastLoginTime = nowStr;

      state.history.unshift({
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'user/setUser',
        timestamp: nowStr,
        payloadSummary: `Logged in as ${action.payload.name} (${action.payload.email})`,
      });

      // Keep last 15 history items
      if (state.history.length > 15) {
        state.history.pop();
      }
    },
    updateProfile: (
      state,
      action: PayloadAction<Partial<Pick<UserState, 'name' | 'email' | 'role' | 'bio'>>>
    ) => {
      if (action.payload.name !== undefined) {
        state.name = action.payload.name;
        state.avatarColor = getDeterministicPalette(action.payload.name);
      }
      if (action.payload.email !== undefined) {
        state.email = action.payload.email;
      }
      if (action.payload.role !== undefined) {
        state.role = action.payload.role;
      }
      if (action.payload.bio !== undefined) {
        state.bio = action.payload.bio;
      }

      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      state.history.unshift({
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'user/updateProfile',
        timestamp: nowStr,
        payloadSummary: `Updated profile: ${Object.keys(action.payload).join(', ')}`,
      });

      if (state.history.length > 15) {
        state.history.pop();
      }
    },
    logoutUser: (state) => {
      const prevUser = state.name || 'User';
      state.name = '';
      state.email = '';
      state.isLoggedIn = false;
      state.lastLoginTime = undefined;

      const nowStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      state.history.unshift({
        id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        type: 'user/logoutUser',
        timestamp: nowStr,
        payloadSummary: `${prevUser} logged out. State cleared.`,
      });

      if (state.history.length > 15) {
        state.history.pop();
      }
    },
  },
});

export const { setUser, updateProfile, logoutUser } = userSlice.actions;
export default userSlice.reducer;