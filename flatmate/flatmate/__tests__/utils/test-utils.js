import { configureStore } from '@reduxjs/toolkit'
import auth from "../../src/features/auth"
import flat from '../../src/features/flat';
import { api } from '../../src/features/api/api';

export const mockStore = (preloadedState = {}) => configureStore({
  reducer: {
    auth: auth.reducer,
    flat: flat.reducer,
    [api.reducerPath]: api.reducer
  }, preloadedState
});