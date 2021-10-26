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
  // const response = await axios.get('http://localhost:3000/tour');
  // const response = await axios({
  //   method: 'get',
  //   // url: 'https://api.moment.beyond-imagination.ml/api/tours',
  //   // url: 'http://localhost:3000/tours/1',
  //   url: `http://localhost:3000/tours/${tourId}`,
  //   headers: { Authorization: 'Bearer 1fa3d84c220e7a4cbc19ac98ad079f9a ' },
  // });
  const tourDetail = await callAPI('get', `/api/tour/${tourId}`, { contentTypeId: 14 });
  return tourDetail;
}
