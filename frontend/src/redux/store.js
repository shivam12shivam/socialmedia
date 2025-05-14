import { configureStore } from '@reduxjs/toolkit';
import authReduer from './userSlice';

const store = configureStore({
  reducer: {
    auth: authReduer,
  },
});

export default store;
