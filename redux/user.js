import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {},
    value: {
      sessionId: '',
    },
  },
  reducers: {
    login: (state, action) => {
      console.log('action.payload   >> ', action.payload);
      state.value = action.payload;
    },
    logout: (state) => {
      state.value = { sessionId: '' };
      state.userInfo = {};
    },
    setUserProfile: (state, action) => {
      console.log('action.payload   >> ', action.payload);
      state.userInfo = action.payload;
    },
    updateUserProfile: (state, action) => {
      const _old = state.userInfo;
      const _new = action.payload;
      console.log('spread : ', { ..._old, ..._new });
      state.userInfo = { ..._old, ..._new };
    },
  },
});

export const { login, logout, setUserProfile } = userSlice.actions;

export default userSlice.reducer;
