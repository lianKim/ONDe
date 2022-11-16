import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from 'styled-components';
import PlaceInfo from './PlaceInfo';
import PlaceReviseButton from './PlaceReviseButton';
import CategoryIcons from './PlaceCategoryPicker/CategoryIcons';
import {
  changeDateToTimeString,
  findDayColor,
} from '../../lib/hooks/useJourneyDetail';

const StyledVerticalTimelineElement = styled(VerticalTimelineElement)`
  margin-top: 0 !important;
  margin-bottom: 15% !important;

  .vertical-timeline-element-date {
    position: absolute;
    top: -20px;
    left: -18px;
    padding-left: 23px !important;
    font-size: 16px !important;
    font-weight: var(--weight-regular) !important;
    background-color: var(--color-green100);
    width: 116px;
    height: 32px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    z-index: 10;
    color: var(--color-green200) !important;
    opacity: 1 !important;
    letter-spacing: -0.03em;
  }
  .vertical-timeline-element-content {
    box-shadow: none;
    opacity: 1 !important;
  }
  .placeName {
    font-size: 20px;
    font-weight: 400;
    position: absolute;
    top: -14px;
    left: 110px;
    color: var(--color-green200) !important;
  }
`;

export default function PlaceTimeLineElement({ target, edit }) {
  const { placeCategory, placeTime, placeId, placeName, elapsedDayTime } =
    target;

  return (
    <StyledVerticalTimelineElement
      contentStyle={{
        height: '60vh',
        minHeight: '520px',
        width: '94%',
        background: 'none',
        position: 'relative',
        top: '20px',
        marginLeft: '20px',
      }}
      contentArrowStyle={{
        borderRight: 'none',
      }}
      style={{
        marginBottom: '20%',
        width: '100%',
      }}
      iconStyle={{
        background: 'var(--color-green200)',
        color: 'var(--color-gray100)',
        width: '32px',
        height: '32px',
        border: 'none',
        boxShadow: 'none',
        zIndex: '20',
      }}
      icon={<CategoryIcons category={placeCategory} />}
      date={changeDateToTimeString(placeTime)}
      className={`verticalTimeLineElement-${placeId}`}
    >
      <div className="placeName">{`${placeName}`}</div>
      <PlaceInfo target={target} edit={edit} />
      {edit && <PlaceReviseButton placeId={placeId} />}
    </StyledVerticalTimelineElement>
  );
}
