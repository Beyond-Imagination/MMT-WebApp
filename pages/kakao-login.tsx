import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function KakaoLogin() {
  const router = useRouter();
  const REST_API_KEY = '1615fdafcfab4319323f1bb7015df0e4';
  // const REST_API_KEY = '1615fdafcfab4319323f1bb7015df0e4';
  const REDIRECT_URI = 'http://52.78.71.182:3000/login';
  const REQUEST_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  useEffect(() => {
    router.push(REQUEST_URI);
  }, []);
  return <div>KaKao</div>;
}
