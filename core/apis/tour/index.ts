import axios from 'axios';
import delay from '../../utils/delay';
import ITour, { CommonApi, ITourApi } from '../../../models/tour/ITour';

export async function fetchTourList(): Promise<CommonApi<ITourApi>> {
  const response = await axios.get('http://localhost:3000/tour');
  return response.data;
}

export async function fetchTour(id: number): Promise<ITour> {
  await delay(700);
  return null;
}
