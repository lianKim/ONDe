import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { GiPalmTree } from 'react-icons/gi';
import { CiZoomIn } from 'react-icons/ci';
import { BsBank } from 'react-icons/bs';
import { MdPets } from 'react-icons/md';
import styled from 'styled-components';
import PlaceInfo from './PlaceInfo';

const StyledVerticalTimelineElement = styled(VerticalTimelineElement)`
  .vertical-timeline-element-date{
    position:absolute;
    top:-5%;
    left: -18px;
    padding-left: 25px !important;
    font-size: 18px !important;
    font-weight: 300 !important;
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
  top:-4%;
  left: 120px;
`;

export default function PlaceTimeLineElement({ category }) {
  const findIcon = () => {
    if (category === 'nature') {
      return <GiPalmTree />;
    }
    if (category === 'museum') {
      return <BsBank />;
    }
    if (category === 'pet') {
      return <MdPets />;
    }
    return <CiZoomIn />;
  };

  return (
    <StyledVerticalTimelineElement
      contentStyle={{
        height: '60vh',
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
      date="04:30 PM"
    >
      <StyledPlaceName>장소이름</StyledPlaceName>
      <PlaceInfo />
    </StyledVerticalTimelineElement>
  );
}
