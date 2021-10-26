import axios from 'axios';
import { CommonApi, ITourApi, ITourDetail } from '../../../models/tour/ITour';
import callAPI from '../../../helpers/apiCaller';

export async function fetchTourList({ contentTypeId, arrange }: any): Promise<CommonApi<ITourApi>> {
  const tourResult = await callAPI('get', '/api/tour', {
    numOfRows: 10,
    pageNo: 1,
    arrange,
    contentTypeId,
    mapX: 126.981611,
    mapY: 37.568477,
    radius: 1000,
  });
  return tourResult;
}

export async function fetchTourDetail(tourId: number): Promise<CommonApi<ITourDetail>> {
  const tourDetail = await callAPI('get', `/api/tour/${tourId}`, { contentTypeId: 14 });
  return tourDetail;
}
