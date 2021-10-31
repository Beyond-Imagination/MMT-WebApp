export interface IUser {
  nickname: string;
  profile_image_uri: string;
  klaytn_address: string;
  nft_list: any[];
  access_token: string;
}

export interface IToken {
  is_klip_linked: boolean;
}
