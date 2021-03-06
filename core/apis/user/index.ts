import axios from 'axios';
import { IUser, IToken } from '../../../models/user/IUser';
import callAPI from '../../../helpers/apiCaller';
import useStorage from '../../../hooks/useStorage';

export async function fetchUser(): Promise<IUser> {
  const response = await callAPI('get', '/api/users/mine');
  return response;
}
export async function login(token: string): Promise<IToken> {
  // const response = await axios.get('http://localhost:3000/tour');

  const requestBody = {
    access_token: token,
  };
  const response = await axios({
    method: 'post',
    url: 'https://api.moment.beyond-imagination.ml/api/users/login',
    data: requestBody,
  });
  return response.data;
}
