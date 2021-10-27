import axios from 'axios';
import { IUser, ITokenApi } from '../../../models/user/IUser';
import callAPI from '../../../helpers/apiCaller';
import useStorage from '../../../hooks/useStorage';

export async function fetchUser(): Promise<IUser> {
  const response = await callAPI('get', '/api/users/mine');
  return response;
}
export async function login(token: string): Promise<ITokenApi> {
  // const response = await axios.get('http://localhost:3000/tour');

  const requestBody = {
    access_token: token,
  };
  const response = await axios({
    method: 'post',
    url: 'http://api.moment.beyond-imagination.ml/api/users/login',
    data: requestBody,
  });
  return response.data;
}
