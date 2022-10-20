import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from 'styled-components';
import { RiNumber1, RiNumber2, RiNumber3 } from 'react-icons/ri';

const StyledTimeIndicator = styled(VerticalTimelineElement)`
  .vertical-timeline-element-date{
    font-size: 18px !important;
    position: relative;
    bottom:15px;
  }
`;

export default function PlaceTimeLineTimeIndicator({ number }) {
  const findIcon = (day) => {
    if (day === 1) {
      return <RiNumber1 />;
    }
    if (day === 2) {
      return <RiNumber2 />;
    }
    if (day === 3) {
      return <RiNumber3 />;
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
      icon={findIcon(number)}
      style={{
      }}
      date="2022년 10월 20일"
    />
  );
}
