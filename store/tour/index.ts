import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTourList } from '../../core/apis/tour';
import { IAsyncState } from '../../models/IAsyncState';
import ITour, { CommonApi, ITourApi } from '../../models/tour/ITour';

// 1. reducer 네임을 정의합니다. 이름은 폴더명과 동일하게 구성하고 상위 depth가 있을경우 상위depth/폴더명 의 형식으로 구성합니다.
const name = 'tour';

// 2. 비동기 핸들링이 필요한 경우 createAsyncThunk 를 사용하여 처리합니다.
export const getTourList = createAsyncThunk(
  `${name}/getTourList`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async () => {
    return fetchTourList();
  },
);

// 3. 스토어 타입을 정의합니다. xxxState의 네이밍으로 통일하여 구성합니다.
export interface ITourState {
  tours: IAsyncState<ITour[]>;
}

// 4. reducer 초기값을 정의합니다.
const initialState: ITourState = {
  tours: {
    data: [],
    loading: false,
  },
};

// 5. slice를 export 시켜주도록 합니다.
const tourSlice = createSlice({
  name: 'tour',
  initialState,
  reducers: {},
  extraReducers: {
    [getTourList.pending.type]: state => {
      state.tours.loading = true;
    },
    [getTourList.fulfilled.type]: (state, action: PayloadAction<CommonApi<ITourApi>>) => {
      state.tours.loading = false;
      state.tours.data = action.payload.result.items;
    },
  },
});

export default tourSlice;
