import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchTourDetail, fetchTourList } from '../../core/apis/tour';
import { IAsyncState } from '../../models/IAsyncState';
import ITour, { CommonApi, ITourApi, ITourDetail } from '../../models/tour/ITour';

// 1. reducer 네임을 정의합니다. 이름은 폴더명과 동일하게 구성하고 상위 depth가 있을경우 상위depth/폴더명 의 형식으로 구성합니다.
const name = 'tour';

// 2. 비동기 핸들링이 필요한 경우 createAsyncThunk 를 사용하여 처리합니다.
export const getTourList = createAsyncThunk(
  `${name}/getTourList`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async ({ contentTypeId, arrange }: any) => {
    return fetchTourList({ contentTypeId, arrange });
  },
);

export const getTourDetail = createAsyncThunk(
  `${name}/getTourDetail`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async (tourId: number) => {
    return fetchTourDetail(tourId);
  },
);

// 3. 스토어 타입을 정의합니다. xxxState의 네이밍으로 통일하여 구성합니다.
export interface ITourState {
  tours: IAsyncState<ITour[]>;
  tourDetail: IAsyncState<ITourDetail>;
}

// 4. reducer 초기값을 정의합니다.
const initialState: ITourState = {
  tours: {
    data: [],
    loading: false,
  },
  tourDetail: {
    data: null,
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
    [getTourList.fulfilled.type]: (state, action: PayloadAction<ITourApi>) => {
      state.tours.loading = false;
      state.tours.data = action.payload.items;
    },
    [getTourDetail.pending.type]: state => {
      state.tourDetail.loading = true;
    },
    [getTourDetail.fulfilled.type]: (state, action: PayloadAction<ITourDetail>) => {
      state.tourDetail.loading = false;
      console.log('action.payload: ', action.payload);
      state.tourDetail.data = action.payload;
      console.log(state.tourDetail.data);
    },
  },
});

export default tourSlice;
