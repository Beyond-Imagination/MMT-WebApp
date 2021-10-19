import { IUser } from '../../../models/user/IUser';

export async function fetchUser(): Promise<IUser> {
  return {
    name: '김철수',
    profile: 'https://picsum.photos/200',
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
}
