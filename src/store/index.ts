import { configureStore } from '@reduxjs/toolkit';

// Reducer Imports
import { converterReducer } from '@/store/converter/reducer';

const store = configureStore({
  reducer: {
    converter: converterReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
