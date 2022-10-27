import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from 'styled-components';
import {
  RiNumber1, RiNumber2, RiNumber3, RiNumber4, RiNumber5, RiNumber6,
  RiNumber7, RiNumber8, RiNumber9,
} from 'react-icons/ri';
import { TiInfinityOutline } from 'react-icons/ti';

const StyledTimeIndicator = styled(VerticalTimelineElement)`
  .vertical-timeline-element-date{
    font-size: 18px !important;
    position: relative;
    bottom:15px;
    left:-20px;
  }
`;

export default function PlaceTimeLineTimeIndicator({ elapsedTime, date }) {
  const findIcon = () => {
    switch (elapsedTime) {
      case 1:
        return <RiNumber1 />;
      case 2:
        return <RiNumber2 />;
      case 3:
        return <RiNumber3 />;
      case 4:
        return <RiNumber4 />;
      case 5:
        return <RiNumber5 />;
      case 6:
        return <RiNumber6 />;
      case 7:
        return <RiNumber7 />;
      case 8:
        return <RiNumber8 />;
      case 9:
        return <RiNumber9 />;
      default:
        return <TiInfinityOutline />;
    }
  };
  return (
    <StyledTimeIndicator
      iconStyle={{
        background: '#51ab63',
        color: '#2B5643',
        width: '50px',
        height: '50px',
        border: 'none',
        boxShadow: 'none',
        left: '-5px',
        zIndex: '20',
      }}
      icon={findIcon()}
      style={{
      }}
      date={`${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(8, 10)}일`}
    />
  );
}
