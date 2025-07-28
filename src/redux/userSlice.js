import { createSlice } from '@reduxjs/toolkit';

/**
 * The initial state for the user slice.
 */
const initialState = {
    userInfo: null,
    status: 'idle', // can be: 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * Sets the user state upon a successful login or sign-up.
         * The payload should be the complete user object from Firestore/Auth.
         */
        setUser: (state, action) => {
            state.userInfo = action.payload;
            state.status = 'succeeded';
            state.error = null;
        },

        /**
         * Clears all user data from the state, typically on logout.
         */
        clearUser: (state) => {
            state.userInfo = null;
            state.status = 'idle';
            state.error = null;
        },

        /**
         * Updates a part of the user's profile, for example, if they change their name.
         * The payload should be an object with the fields to update, e.g., { name: 'New Name' }
         */
        updateUserProfile: (state, action) => {
            if (state.userInfo) {
                // Merges the new details into the existing userInfo object
                state.userInfo = { ...state.userInfo, ...action.payload };
            }
        },

        /**
         * Sets the status to 'loading'. Should be dispatched before starting an async auth call.
         */
        setLoading: (state) => {
            state.status = 'loading';
            state.error = null;
        },

        /**
         * Sets the status to 'failed' and stores the error message.
         * Should be dispatched in the `catch` block of an async auth call.
         */
        setError: (state, action) => {
            state.status = 'failed';
            state.error = action.payload;
        },
    },
});

export const {
    setUser,
    clearUser,
    updateUserProfile,
    setLoading,
    setError,
} = userSlice.actions;

export const selectUserInfo = (state) => state.user.userInfo;
export const selectUserStatus = (state) => state.user.status;
export const selectUserError = (state) => state.user.error;

export default userSlice.reducer;