import React, { useEffect } from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { GiPalmTree } from 'react-icons/gi';
import { CiZoomIn } from 'react-icons/ci';
import { BsBank, BsTree } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { IoRestaurantOutline, IoBicycle } from 'react-icons/io5';

import styled from 'styled-components';
import { CalendarContainer } from 'react-datepicker';
import PlaceInfo from './PlaceInfo';
import PlaceReviseButton from './PlaceReviseButton';

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
`;
const StyledPlaceName = styled.div`
  font-size: 24px;
  font-weight: 300;
  position: absolute;
  top:-18px;
  left: 120px;
`;

export default function PlaceTimeLineElement({ target, focusedPlace }) {
  const findIcon = () => {
    const category = target.placeCategory;
    switch (category) {
      case 'nature':
        return <BsTree />;
      case 'accommodation':
        return <AiOutlineHome />;
      case 'retaurant':
        return <IoRestaurantOutline />;
      case 'leisure':
        return <IoBicycle />;
      case 'themepark':
        return <AiOutlineHome />;
      case 'shopping':
        return <AiOutlineHome />;
      case 'historicalsite':
        return <AiOutlineHome />;
      case 'museum':
        return <AiOutlineHome />;
      case 'performance':
        return <AiOutlineHome />;
      case 'exhibition':
        return <AiOutlineHome />;
      case 'camping':
        return <AiOutlineHome />;
      case 'kids':
        return <AiOutlineHome />;
      default:
        return <GiPalmTree />;
    }
  };

  const findTime = () => {
    const date = new Date(target.placeTime);
    const timeDivider = date.getHours() > 12 ? 'PM' : 'AM';
    const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    const minute = date.getMinutes();
    const hourString = hour >= 10 ? hour.toString() : `0${hour}`;
    const minuteString = minute >= 10 ? minute.toString() : `0${minute}`;
    return `${hourString}:${minuteString} ${timeDivider}`;
  };

  findTime();

  return (
    <StyledVerticalTimelineElement
      contentStyle={{
        height: '60vh',
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
        background: '#2B5643',
        color: '#fff',
        width: '32px',
        height: '32px',
        border: 'none',
        boxShadow: 'none',
        zIndex: '20',
      }}
      icon={findIcon()}
      date={findTime()}
      className={`verticalTimeLineElement-${target.placeId}`}
    >
      <StyledPlaceName>{`${target.placeName}`}</StyledPlaceName>
      <PlaceInfo target={target} />
      <PlaceReviseButton target={target} />
    </StyledVerticalTimelineElement>
  );
}
