import axios from 'axios';
import { CommonApi, ITourApi, ITourDetail } from '../../../models/tour/ITour';
import callAPI from '../../../helpers/apiCaller';

export async function fetchTourList({ contentTypeId, arrange, mapX, mapY }: any): Promise<CommonApi<ITourApi>> {
  const tourResult = await callAPI('get', '/api/tour', {
    numOfRows: 10,
    pageNo: 1,
    arrange,
    contentTypeId,
    mapX,
    mapY,
    radius: 1000,
  });
  return tourResult;
}

export async function fetchTourDetail(tourId: number, contentTypeId: number): Promise<CommonApi<ITourDetail>> {
  const tourDetail = await callAPI('get', `/api/tour/${tourId}`, { contentTypeId });
  return tourDetail;
}
