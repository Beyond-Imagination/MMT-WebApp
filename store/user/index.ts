import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser } from '../../core/apis/user';
import { IAsyncState } from '../../models/IAsyncState';
import { IUser } from '../../models/user/IUser';

// 1. reducer 네임을 정의합니다. 이름은 폴더명과 동일하게 구성하고 상위 depth가 있을경우 상위depth/폴더명 의 형식으로 구성합니다.
const name = 'user';

// 2. 비동기 핸들링이 필요한 경우 createAsyncThunk 를 사용하여 처리합니다.
export const getUser = createAsyncThunk(
  `${name}/getUser`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async () => {
    return fetchUser();
  },
);

// 3. 스토어 타입을 정의합니다. xxxState의 네이밍으로 통일하여 구성합니다.
export interface IUserState {
  users: IAsyncState<IUser>;
}

// 4. reducer 초기값을 정의합니다.
const initialState: IUserState = {
  users: {
    data: null,
    loading: false,
  },
};

// 5. slice를 export 시켜주도록 합니다.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: {
    [getUser.pending.type]: state => {
      state.users.loading = true;
    },
    [getUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.users.loading = false;
      state.users.data = action.payload;
    },
  },
});

export default userSlice;
