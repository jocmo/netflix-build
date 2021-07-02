import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
    },
    reducers: { //actions
        //the way we interact with the global store is by dispatching an action (login, logout)

        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    },
});

export const { login, logout } = userSlice.actions;

export const selectUser = state => state.user.user;

export default userSlice.reducer;