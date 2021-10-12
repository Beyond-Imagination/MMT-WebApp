import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import todo from './todo';
import tour from './tour';

const store = configureStore({
  reducer: {
    todo: todo.reducer,
    tour: tour.reducer,
  },
  middleware: [thunk],
});

// redux 타입 정의
export type RootState = ReturnType<typeof store.getState>;

export default store;
