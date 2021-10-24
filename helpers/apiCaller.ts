import axios from 'axios';
import useStorage from '../hooks/useStorage';

interface IApiResponse {
  message: string;
  result: any;
  status: number;
  success: boolean;
}

const BASE_URL = 'http://api.moment.beyond-imagination.ml';

export default async function callAPI(method: 'get' | 'post' | 'put' | 'delete', endpoint: string, params?: any) {
  let url = `${BASE_URL}${endpoint}`;
  let data: IApiResponse;
  const token = useStorage().sessionStorage.getItem('KAKAO_ACCESS_TOKEN');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (method === 'get') {
    const queryParams = new URLSearchParams(params).toString();
    url = `${url}?${queryParams}`;
    const res = await axios.get<IApiResponse>(url, config);
    data = res.data;
  } else {
    const res = await axios[method]<IApiResponse>(url, params, config);
    data = res.data;
  }

  if (!data.success) {
    throw new Error(data.message);
  }

  return data.result;
}
