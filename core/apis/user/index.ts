import axios from 'axios';
import { IUser, ITokenApi } from '../../../models/user/IUser';

export async function fetchUser(token: string): Promise<IUser> {
  if (token === '')
    return {
      name: '김철수',
      profile: 'http://picsum.photos/200',
      klaytn_addres: 'string',
      nft: [
        {
          content_id: 1, // 관광지 contentid
          nft_id: 1,
          image: 'string', // image link
          title: 'string',
          weather: 'string',
          emotion: 'string',
          impression: 'string',
        },
      ],
      access_token: 'string',
    };

  const response = await axios({
    method: 'get',
    url: 'http://api.moment.beyond-imagination.ml/api/user',
    // url: 'http://localhost:3000/tour',
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
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
