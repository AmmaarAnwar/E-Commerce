import { createSlice } from '@reduxjs/toolkit';
import { clearUser } from './userSlice';

const initialState = {
    items: [],
    coupon: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const item = state.items.find(i => i.id === action.payload.id);
            if (item) {
                item.quantity += action.payload.quantity;
            } else {
                state.items.push(action.payload);
            }
        },
        removeFromCart(state, action) {
            const productIdToRemove = action.payload;
            state.items = state.items.filter(i => i.id !== productIdToRemove);
        },
        updateQuantity(state, action) {
            const { id, quantity } = action.payload;
            const item = state.items.find(i => i.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },
        clearCart(state) {
            state.items = [];
            state.coupon = null;
        },
        applyCoupon(state, action) {
            state.coupon = action.payload;
        },
        removeCoupon(state) {
            state.coupon = null;
        },
        removePurchasedFromCart(state, action) {
            const productIdsToRemove = Array.isArray(action.payload) ? action.payload : [];
            if (productIdsToRemove.length > 0) {
                state.items = state.items.filter(item => !productIdsToRemove.includes(item.id));
            }
        },
    },

    extraReducers: (builder) => {
        builder.addCase(clearUser, (state) => {
            state.items = [];
            state.coupon = null;
        });
    },
});

export const {
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    removePurchasedFromCart,
    applyCoupon,
    removeCoupon
} = cartSlice.actions;

export default cartSlice.reducer;