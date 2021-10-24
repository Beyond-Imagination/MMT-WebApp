export default interface INft {
  _id: string;
  contentId: number; // 관광지 contentid
  nftId: number;
  image: string; // image link
  title: string;
  weather: string;
  emotion: string;
  impression: string;
}

export interface INftApi {
  nft: INft[];
}
