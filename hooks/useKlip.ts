import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '../store';
import useAuthenticated from './useAuthenticated';

export default function useKlip() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const { isKlipLinked } = useSelector((state: RootState) => state.user);

  const { isLoggedIn } = useAuthenticated();

  useEffect(() => {
    if (isLoggedIn && !isKlipLinked && router.pathname.toLowerCase() !== '/linkKlip'.toLowerCase()) {
      router.push('/linkKlip');
    }
  }, [isLoggedIn, isKlipLinked]);

  const publishKlaytn = () => {
    return new Promise((resolve, reject) => {
      if (loading) {
        reject(new Error('이미 클립 연동이 진행중입니다.'));
      }

      setLoading(true);

      let interval = null;
      let retry = 0;
      try {
        const bappName = 'Moment';
        klipSDK.prepare.auth({ bappName }).then(({ request_key: requestKey }) => {
          klipSDK.request(requestKey, () => reject(new Error('모바일 환경에서 실행해주세요')));

          interval = setInterval(async () => {
            retry += 1;
            if (retry >= 20) {
              clearInterval(interval);
              setLoading(false);
              reject(new Error('Timeout!'));
            }

            try {
              const result = await klipSDK.getResult(requestKey);
              if (result.status === 'completed') {
                clearInterval(interval);
                setLoading(false);
                resolve(result.result.klaytn_address);
              }
            } catch (e) {
              clearInterval(interval);
              setLoading(false);
              reject(e);
            }
          }, 3000);
        });
      } catch (e) {
        setLoading(false);
        reject(e);
      }
    });
  };

  return {
    isLoggedIn,
    isKlipLinked,
    loading,
    publishKlaytn,
  };
}
