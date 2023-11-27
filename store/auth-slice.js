import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isAuth: false,
    user: {},
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action) => {
            state.isAuth = action.payload.isAuth;
            state.user = action.payload.user;
        },
        setProfilePicture: (state, action) => {
            state.user.profilePicture = action.payload;
        }
    },
});

export const { setAuth, setProfilePicture } = authSlice.actions;
export default authSlice.reducer;
