export interface IUser {
  name: string;
  profile: string;
  klaytn_addres: string;
  nft: any[];
  access_token: string;
}

export interface ITokenApi {
  access_token: string;
  access_token_expires_in: number;
  refresh_toekn: string;
  refresh_token_expires_in: number;
  is_klip_linked: boolean;
}
