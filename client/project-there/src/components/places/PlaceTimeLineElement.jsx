import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { GiPalmTree } from 'react-icons/gi';
import { RiNumber1 } from 'react-icons/ri';
import { CiZoomIn } from 'react-icons/ci';
import { BsBank } from 'react-icons/bs';
import { MdPets } from 'react-icons/md';
import styled from 'styled-components';

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
`;

export default function PlaceTimeLineElement({ children, category, type }) {
  const elementHeight = type === 'day' ? '50px' : '400px';

  const findIcon = () => {
    if (type === 'day') {
      return <RiNumber1 />;
    }
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
        height: elementHeight,
        background: 'none',
        position: 'relative',
        top: '20px',
        marginLeft: '20px',
      }}
      contentArrowStyle={{
        borderRight: 'none',
      }}
      style={{
        margin: '40px 0px',
      }}
      iconStyle={{
        background: '#2B5643',
        color: '#fff',
        width: '32px',
        height: '32px',
        border: 'none',
        boxShadow: 'none',
        left: '3px',
        zIndex: '20',
      }}
      icon={findIcon()}
      date="04:30 PM"
    >
      {children}
    </StyledVerticalTimelineElement>
  );
}
