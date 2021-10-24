import { INftApi } from '../../../models/nft/INft';

export async function fetchNftList(): Promise<INftApi> {
  return {
    nft: [
      {
        _id: '1',
        contentId: 1, // 관광지 contentid
        nftId: 1,
        image: `http://tong.visitkorea.or.kr/cms/resource/52/1607952_image2_1.jpg`, // image link
        title: '봄기운이 느껴진 여의도', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '2',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/29/2482729_image2_1.jpg`, // image link
        title: '모세의 기적을 본 날', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '3',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/05/2714505_image2_1.jpg`, // image link
        title: '창덕궁 달빛기행 사진', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '4',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/78/1992778_image2_1.jpg`, // image link
        title: '맛있는 초밥', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '5',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/16/2387516_image2_1.jpg`, // image link
        title: '아름다운 사천의 신수도', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '6',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/60/2761360_image2_1.jpg`, // image link
        title: '개미허리아치교', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '7',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/43/183243_image2_1.jpg`, // image link
        title: '울진의 망양정', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '8',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/49/2689849_image2_1.png`, // image link
        title: '진주시 남강유등축제', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '9',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `http://tong.visitkorea.or.kr/cms/resource/21/2689521_image2_1.jpg`, // image link
        title: '아침고요 수목원 저녁에', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '10',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '11',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '12',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '13',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '14',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '15',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '16',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '17',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '18',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '19',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '20',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '21',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '22',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '23',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '24',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
      {
        _id: '25',
        contentId: 2, // 관광지 contentid
        nftId: 2,
        image: `https://picsum.photos/200/200?random=${Math.random()}`, // image link
        title: 'title', // nft의 관광지 title
        weather: 'good', // nft 발급 당시 날씨
        emotion: 'good', // nft 발급 당시 유저 기분
        impression: 'good', // nft 발급 당시 소감
      },
    ],
  } as INftApi;
}
