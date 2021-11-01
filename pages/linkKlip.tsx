import { NotificationManager } from 'react-notifications';
import { useDispatch } from 'react-redux';
import useKlip from '../hooks/useKlip';
import callAPI from '../helpers/apiCaller';

export default function LinkKlipScreen() {
  const dispatch = useDispatch();
  const { publishKlaytn } = useKlip();

  const onClickSyncWithKakao = async () => {
    NotificationManager.info('잠시만 기다려주세요.');
    try {
      const klaytnAddress = await publishKlaytn();
      NotificationManager.info(klaytnAddress);
      await callAPI('post', '/api/users/klaytnAddress', { klaytn_address: klaytnAddress });
    } catch (e) {
      NotificationManager.error(e.message);
    }
  };

  return (
    <div className="fixed w-screen left-0 right-0 top-0 bottom-0 h-screen bg-white z-30">
      <div className="relative text-lg md:text-xl h-full max-w-2xl mx-auto">
        <div className="absolute top-1/4 left-4 right-4">
          <p>해당 기능을 사용하기 위해선</p>
          <p>
            <span className="font-bold text-indigo-800">Klip 연동</span>이 필요합니다.
          </p>
        </div>
        <div className="absolute bottom-1/4 left-4 right-4">
          <button
            type="button"
            className="mb-4 w-full py-2 text-black rounded-lg shadow-xl bg-yellow-300"
            onClick={onClickSyncWithKakao}
          >
            카카오톡으로 Klip 주소 연동하기
          </button>

          <button type="button" className="w-full py-2 text-white rounded-lg shadow-xl bg-indigo-500">
            직접 Klip 연동하기
          </button>
        </div>
      </div>
    </div>
  );
}
