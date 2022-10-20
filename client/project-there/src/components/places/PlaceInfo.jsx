import React, { useRef } from 'react';
import styled from 'styled-components';
import ImageDisplayCarousel from './ImageDisplayCarousel';
import PlaceDetailInfo from './PlaceDetailInfo';

const PlaceInfoHolder = styled.div`
  width: 100%;
  height: 100%;
  border : 0.5px solid #2B5643;
  display: flex;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
  margin-top: 10px;
`;

const images = [
  'https://images.mypetlife.co.kr/content/uploads/2021/10/19151330/corgi-g1a1774f95_1280-1024x682.jpg',
  'https://blog.kakaocdn.net/dn/bTEhUV/btqECug9iOs/mxgZUk4MLJVCK3xtcNe6NK/img.jpg',
  'https://img1.daumcdn.net/thumb/R1280x0.fjpg/?fname=http://t1.daumcdn.net/brunch/service/user/32E9/image/BA2Qyx3O2oTyEOsXe2ZtE8cRqGk.JPG',
  'http://www.chemicalnews.co.kr/news/photo/202106/3636_10174_4958.jpg',
  'https://cdn.hellodd.com/news/photo/202005/71835_craw1.jpg',
];

// 특정 장소의 정보를 보여주는 컴포넌트
export default function PlaceInfo() {
  const placeHolder = useRef();
  return (
    <PlaceInfoHolder
      ref={placeHolder}
    >
      <ImageDisplayCarousel images={images} containerRef={placeHolder} />
      <PlaceDetailInfo />
    </PlaceInfoHolder>
  );
}
