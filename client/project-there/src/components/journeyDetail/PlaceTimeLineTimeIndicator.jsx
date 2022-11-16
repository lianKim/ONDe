import React, { useEffect } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from 'styled-components';
import {
  RiNumber1,
  RiNumber2,
  RiNumber3,
  RiNumber4,
  RiNumber5,
  RiNumber6,
  RiNumber7,
  RiNumber8,
  RiNumber9,
} from 'react-icons/ri';
import { TiInfinityOutline } from 'react-icons/ti';
import { findDayColor } from '../../lib/hooks/useJourneyDetail';

const StyledTimeIndicator = styled(VerticalTimelineElement)`
  & * {
    color: var(--color-green200) !important;
  }

  .vertical-timeline-element-date {
    font-size: 16px !important;
    position: relative;
    bottom: 12px;
    left: -21px;
    letter-spacing: -0.03em;
    color: var(--color-green200);
    opacity: 1 !important;
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

  useEffect(() => {
    console.log(elapsedTime);
  }, []);

  return (
    <StyledTimeIndicator
      iconStyle={{
        background: findDayColor(elapsedTime),
        color: 'var(--color-green200)',
        width: '48px',
        height: '48px',
        border: '0.5px solid var(--color-green200)',
        boxShadow: 'none',
        left: '-6px',
        zIndex: '20',
      }}
      style={{
        marginTop: '27%',
        marginBottom: '7%',
      }}
      icon={findIcon()}
      date={`${date.slice(0, 4)}년 ${date.slice(5, 7)}월 ${date.slice(
        8,
        10,
      )}일`}
    />
  );
}
