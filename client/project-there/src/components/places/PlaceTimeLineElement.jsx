import React from 'react';
import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import { GiPalmTree } from 'react-icons/gi';

export default function PlaceTimeLineElement({ children }) {
  return (
    <VerticalTimelineElement
      contentStyle={{
        background: 'rgb(33, 150, 243)',
        color: '#fff',
        border: '1px solid black',
        height: '100px',
      }}
      contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
      iconStyle={{
        background: 'rgb(33, 150, 243)',
        color: '#fff',
        width: '30px',
        height: '30px',
      }}
      icon={<GiPalmTree />}
    >
      {children}
    </VerticalTimelineElement>
  );
}
