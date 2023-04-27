import { configureStore } from '@reduxjs/toolkit';

// Reducer Imports
import { converterReducer } from '@SRC/store/converter/reducer';

const store = configureStore({
  reducer: {
    converter: converterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
