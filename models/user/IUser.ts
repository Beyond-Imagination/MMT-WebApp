export interface IUser {
  nickname: string;
  profile_image_uri: string;
  klaytn_addres: string;
  nft_list: any[];
  access_token: string;
}

export interface ITokenApi {
  access_token: string;
  access_token_expires_in: number;
  refresh_toekn: string;
  refresh_token_expires_in: number;
  is_klip_linked: boolean;
}
