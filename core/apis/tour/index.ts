import axios from 'axios';
import delay from '../../utils/delay';
import ITour, { CommonApi, ITourApi } from '../../../models/tour/ITour';

export async function fetchTourList(): Promise<CommonApi<ITourApi>> {
  // const response = await axios.get('http://localhost:3000/tour');
  const response = await axios({
    method: 'get',
    // url: 'https://api.moment.beyond-imagination.ml/api/tours',
    url: 'http://localhost:3000/tour',
    headers: { Authorization: '1fa3d84c220e7a4cbc19ac98ad079f9a ' },
  });
  return response.data;
}

export async function fetchTour(id: number): Promise<ITour> {
  await delay(700);
  return null;
}
