import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as React from 'react';
import { RootState } from '../../store';
import { getTourDetail } from '../../store/tour';
import { Loading } from '../../components/atoms';
import TitleBar from '../../components/molecules/TitleBar';
import useAuthenticated from '../../hooks/useAuthenticated';

const TourDetail = () => {
  const router = useRouter();
  const { pid, contentTypeId } = router.query;
  const dispatch = useDispatch();
  const { data } = useSelector((state: RootState) => state.tour.tourDetail);

  useAuthenticated();
  useEffect(() => {
    if (Number(pid)) {
      dispatch(getTourDetail({ tourId: Number(pid), contentTypeId: Number(contentTypeId) }));
    }
  }, [dispatch, pid]);

  if (data === null) {
    return <Loading />;
  }

  const overViewParagraphs = data.overview
    .replace(/<br\s*[/]?>/gi, '\n')
    .split('\n')
    .map(str => <p className="text-xl leading-8" dangerouslySetInnerHTML={{ __html: str }} />);

  return (
    <div className="w-full h-full">
      <TitleBar title={data.title} />

      {/* overview */}
      <div className="px-4 py-4">
        {overViewParagraphs}
      </div>
    </div>
  );
};
export default TourDetail;
