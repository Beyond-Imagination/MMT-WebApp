import { useState } from 'react';

type STATUS = 'WAITING' | 'PREPARE' | 'REQUEST' | 'COMPLETE' | 'ERROR';

export default function useKlip() {
  const [klaytnAddress, setKlaytnAddress] = useState<string>(null);

  const publishKlaytn = () => {
    return new Promise((resolve, reject) => {
      let interval = null;
      let retry = 0;
      try {
        const bappName = 'Moment';
        klipSDK.prepare.auth({ bappName }).then(({ request_key: requestKey }) => {
          klipSDK.request(requestKey, () => reject(new Error('모바일 환경에서 실행해주세요')));

          interval = setInterval(async () => {
            retry += 1;
            if (retry >= 5) {
              clearInterval(interval);
              reject(new Error('Timeout!'));
            }

            try {
              const result = await klipSDK.getResult(requestKey);
              if (result.status === 'completed') {
                clearInterval(interval);
                resolve(result.result.klaytn_address);
              }
            } catch (e) {
              clearInterval(interval);
              reject(e);
            }
          }, 1000);
        });
      } catch (e) {
        reject(e);
      }
    });
  };

  return {
    klaytnAddress,
    publishKlaytn,
  };
}
