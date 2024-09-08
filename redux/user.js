import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
	name: "user",
	initialState: { value: { sessionId: '' } },
	reducers: {
		login: (state, action) => {
			state.value = action.payload
		},
		logout: (state) => {
			state.value = { sessionId: '' };
		}
	},
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;