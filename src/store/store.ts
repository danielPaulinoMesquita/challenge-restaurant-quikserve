import { configureStore } from '@reduxjs/toolkit';
import venueReducer from './venueSlice';

const store = configureStore({
    reducer: {
        getVenue: venueReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;