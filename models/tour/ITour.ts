export default interface ITour {
  content_id: number; // 콘텐츠ID
  content_type_id: number; // 관광타입(관광지, 숙박 등) ID
  image_url?: string; // 썸네일 이미지 주소 (약 160\*100 size)
  title: string; // 콘텐츠 제목
  overview?: string; // 콘텐츠 개요
  mapx: number; //  longitude
  mapy: number; //  latitude
}

export interface ITourApi {
  num_of_rows: number; // 한 페이지 결과 수
  page_no: number; // 페이지 번호
  total_count: number; // 전체 결과 수
  // (A=제목순,B=조회순,C=수정일순, D=생성일순, E=거리순).
  // 대표이미지가 반드시 있는 정렬: (O=제목순, P=조회순, Q=수정일순, R=생성일순,S=거리순)
  arrange?: 'A' | 'B' | 'C' | 'D' | 'E' | 'O' | 'P' | 'Q' | 'R' | 'S';
  items: ITour[] | [];
}

export interface CommonApi<T> {
  status: number;
  success: boolean;
  message: string;
  result: T;
}

export interface ITourDetail {
  content_id: number; // 콘텐츠 ID
  content_type_id: number; // 관광타입(관광지, 숙박 등) ID
  title: string; // 콘텐츠명(제목)
  overview?: string; // 콘텐츠 개요
  images:
    | {
        img_name?: string; // 이미지명
        origin_img_url?: string; // 원본 이미지
        small_img_url?: string; // 썸네일 이미지
      }[]
    | []; // 이미지
  normal_info: { title: string; content: string }[]; // 기본 정보
  info_info: { title: string; content: string }[]; // 소개 정보
  detail_info: { title: string; content: string }[]; // 상세 정보,
}
