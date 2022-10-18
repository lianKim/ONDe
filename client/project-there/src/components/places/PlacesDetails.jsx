import React from 'react';
import styled from 'styled-components';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import PlaceInfo from './PlaceInfo';
import 'react-vertical-timeline-component/style.min.css';
import PlaceTimeLineElement from './PlaceTimeLineElement';

const PlacesDetailsHolder = styled.div`
  width: 100%;
  height: 60%;
  border : 1px solid black;
  overflow-y: auto;
`;

// 여기서 아마 vertical timeline 적용할 것 같고
export default function PlacesDetails() {
  return (
    <PlacesDetailsHolder>
      <VerticalTimeline
        layout="1-column-left"
      >
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
      </VerticalTimeline>
    </PlacesDetailsHolder>
  );
}
