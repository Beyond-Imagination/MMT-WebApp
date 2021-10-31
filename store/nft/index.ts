import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IAsyncState } from '../../models/IAsyncState';
import INft, { INftApi } from '../../models/nft/INft';
import { fetchNftList } from '../../core/apis/nft';
import { RootState } from '../index';

// 1. reducer 네임을 정의합니다. 이름은 폴더명과 동일하게 구성하고 상위 depth가 있을경우 상위depth/폴더명 의 형식으로 구성합니다.
const name = 'nft';

// 2. 비동기 핸들링이 필요한 경우 createAsyncThunk 를 사용하여 처리합니다.
export const getNftList = createAsyncThunk(
  `${name}/getNftList`, // name은 reducer이름  + / + 함수명으로 구성합니다.
  async () => {
    return fetchNftList();
  },
);

// 3. 스토어 타입을 정의합니다. xxxState의 네이밍으로 통일하여 구성합니다.
export interface INftState {
  nftList: IAsyncState<INft[]>;
  selected: string;
}

// 4. reducer 초기값을 정의합니다.
const initialState: INftState = {
  nftList: {
    loading: false,
    data: [],
  },
  selected: '',
};

// 5. slice를 export 시켜주도록 합니다.
const nftSlice = createSlice({
  name: 'nft',
  initialState,
  reducers: {
    setSelected(state, action) {
      state.selected = action.payload;
    },
    setNftList(state, action) {
      state.nftList.data = action.payload;
    }
  },
  extraReducers: {
    [getNftList.pending.type]: state => {
      state.nftList.loading = true;
    },
    [getNftList.fulfilled.type]: (state, action: PayloadAction<INftApi>) => {
      state.nftList.loading = false;
      state.nftList.data = action.payload.nft;
    },
  },
});
const selectSelector = (state: RootState) => state.nft.selected;
const nftListSelector = (state: RootState) => state.nft.nftList.data;

const nftSelector = createSelector(
  selectSelector,
  nftListSelector,
  (selected, nftList) => (nftList || []).filter(nft => nft._id === selected)[0],
);

export const nftActions = {
  nftSelector,
  ...nftSlice.actions,
};

export default nftSlice;
