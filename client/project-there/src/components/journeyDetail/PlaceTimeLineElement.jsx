import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styled from 'styled-components';
import PlaceInfo from './PlaceInfo';
import PlaceReviseButton from './PlaceReviseButton';
import CategoryIcons from './PlaceCategoryPicker/CategoryIcons';
import { changeDateToTimeString, findDayColor } from '../../lib/hooks/useJourneyDetail';

const StyledVerticalTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-date{
    position:absolute;
    top: -20px;
    left: -18px;
    padding-left: 25px !important;
    font-size: 18px !important;
    font-weight: var(--weight-regular) !important;
    background-color: #51a863;
    width: 124px;
    height: 32px;
    display: flex !important;
    justify-content: center;
    align-items: center;
    border-radius: 50px;
    z-index: 10;
  }
  .vertical-timeline-element-content{
    box-shadow: none;
  }
  .placeName{
    font-size: 24px;
    font-weight: 300;
    position: absolute;
    top:-18px;
    left: 120px;
  }
`;

export default function PlaceTimeLineElement({ target, edit }) {
  const { placeCategory, placeTime, placeId, placeName, elapsedDayTime } = target;

  return (
    <StyledVerticalTimelineElement
      contentStyle={{
        height: '60vh',
        minHeight: '560px',
        width: '90%',
        background: 'none',
        position: 'relative',
        top: '20px',
        marginLeft: '20px',
      }}
      contentArrowStyle={{
        borderRight: 'none',
      }}
      style={{
        marginBottom: '10%',
        width: '100%',
      }}
      iconStyle={{
        background: findDayColor(elapsedDayTime % 7),
        color: '#fff',
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
      {edit && (<PlaceReviseButton placeId={placeId} />)}
    </StyledVerticalTimelineElement>
  );
}
