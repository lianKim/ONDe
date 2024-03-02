import React from 'react';
import { Polyline } from 'react-kakao-maps-sdk';
import { findDayColor } from '../../lib/hooks/useJourneyDetail';

export default function CustomPolyLine({ targetDay }) {
  return (
    <Polyline
      path={[targetDay[1]]}
      strokeWeight={3} // 선의 두께 입니다
      strokeColor={findDayColor(targetDay[0] % 10)} // 선의 색깔입니다
      strokeOpacity={1}
    />
  );
}
