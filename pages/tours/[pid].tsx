import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import * as React from 'react';
import { nanoid } from 'nanoid';
import { RootState } from '../../store';
import { getTourDetail } from '../../store/tour';
import { Loading } from '../../components/atoms';
import TitleBar from '../../components/molecules/TitleBar';
import ImageSlider from '../../components/molecules/ImageSlider';
import useAuthenticated from '../../hooks/useAuthenticated';
import InfoCard from '../../components/molecules/InfoCard';

const TourDetail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { pid, contentTypeId } = router.query;
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
    .map(str => str.trim())
    .filter(str => !!str)
    .map(str => <p key={nanoid()} className="text-xl leading-8" dangerouslySetInnerHTML={{ __html: str }} />);

  const onClickPublishNFT = () => {
    router.push(`/tours/createNft?contentId=${data.content_id}&contentTypeId=${data.content_type_id}`);
  };

  return (
    <div className="w-full h-full">
      <TitleBar title={data.title} />
      <ImageSlider images={data.images.map(x => x.origin_img_url)} />
      <button
        type="button"
        className="w-full py-4 text-xl font-bold text-white transition-colors transition-shadow bg-green-600 hover:bg-green-300 shadow-xl hover:shadow-2xl"
        onClick={() => onClickPublishNFT()}
      >
        NFT 발급
      </button>
      <div className="px-4 py-4">
        <section className="mb-4">
          <h3 className="text-2xl font-bold mb-2">개요</h3>
          {overViewParagraphs}
        </section>

        <section className="mb-4">
          <InfoCard title="일반 정보" items={data.normal_info} />
        </section>

        <section className="mb-4">
          <InfoCard title="소개 정보" items={data.info_info} />
        </section>

        <section className="mb-4">
          <InfoCard title="상세 정보" items={data.detail_info} />
        </section>
      </div>
      <div className="pb-16" />
    </div>
  );
};
export default TourDetail;
