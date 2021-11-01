import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUser, login } from '../../core/apis/user';
import { IAsyncState } from '../../models/IAsyncState';
import { IUser, IToken } from '../../models/user/IUser';
import useStorage from '../../hooks/useStorage';
import { CommonApi } from '../../models/tour/ITour';

// 1. reducer 네임을 정의합니다. 이름은 폴더명과 동일하게 구성하고 상위 depth가 있을경우 상위depth/폴더명 의 형식으로 구성합니다.
const name = 'user';

// 2. 비동기 핸들링이 필요한 경우 createAsyncThunk 를 사용하여 처리합니다.
export const getUser = createAsyncThunk(
  `${name}/getUser`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async () => {
    return fetchUser();
  },
);

export const loginUser = createAsyncThunk(`${name}/login`, async (_, thunkApi) => {
  const accessToken: string = useStorage().localStorage.getItem('KAKAO_ACCESS_TOKEN');

  if (accessToken == null) {
    return thunkApi.rejectWithValue(false);
  }

  return login(accessToken);
});

// 3. 스토어 타입을 정의합니다. xxxState의 네이밍으로 통일하여 구성합니다.
export interface IUserState {
  users: IAsyncState<IUser>;
  token: string | null;
  isLoggedIn: boolean;
  isKlipLinked: boolean;
  oauth: IAsyncState<IToken>;
}

// 4. reducer 초기값을 정의합니다.
const initialState: IUserState = {
  users: {
    data: null,
    loading: false,
  },
  token: '',
  isLoggedIn: false,
  isKlipLinked: false,
  oauth: {
    data: null,
    loading: false,
    error: null,
  },
};

// 5. slice를 export 시켜주도록 합니다.
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isKlipLinked = action.payload;
      state.isLoggedIn = true;
    },
    logout: state => {
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [getUser.pending.type]: state => {
      state.users.loading = true;
    },
    [getUser.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
      state.users.loading = false;
      state.users.data = action.payload;
    },
    [loginUser.pending.type]: state => {
      state.users.loading = true;
    },
    [loginUser.fulfilled.type]: (state, action: PayloadAction<CommonApi<IToken>>) => {
      state.users.loading = false;
      state.isLoggedIn = true;
      state.oauth.data = action.payload.result;
    },
    [loginUser.rejected.type]: (state, action: PayloadAction<IToken>) => {
      state.users.loading = false;
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const userActions = {
  ...userSlice.actions,
  getUser,
  loginUser,
};

export default userSlice;
