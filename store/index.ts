import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import todo from './todo';
import tour from './tour';
import nft from './nft';
import user from './user';

const store = configureStore({
  reducer: {
    todo: todo.reducer,
    tour: tour.reducer,
    nft: nft.reducer,
    user: user.reducer,
  },
  middleware: [thunk],
});

// redux 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;
