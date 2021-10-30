import axios from 'axios';
import callAPI from '../../../helpers/apiCaller';
import { CommonApi, ITourApi, ITourDetail } from '../../../models/tour/ITour';

export interface IFetchTourListParams {
  numOfRows: number;
  pageNo: number;
  arrange?: 'A' | 'B' | 'C' | 'D' | 'E' | 'O' | 'P' | 'Q' | 'R' | 'S';
  contentTypeId?: number;
  mapX: number;
  mapY: number;
  radius: number;
  overview: boolean;
}
export async function fetchTourList(params: IFetchTourListParams): Promise<CommonApi<ITourApi>> {
  const tourResult = await callAPI('get', '/api/tour', params);
  return tourResult;
}

export async function fetchTourDetail(tourId: number, contentTypeId: number): Promise<CommonApi<ITourDetail>> {
  const tourDetail = await callAPI('get', `/api/tour/${tourId}`, { contentTypeId });
  return tourDetail;
}
