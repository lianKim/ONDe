import React from 'react';
import styled from 'styled-components';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import PlaceInfo from './PlaceInfo';
import 'react-vertical-timeline-component/style.min.css';
import PlaceTimeLineElement from './PlaceTimeLineElement';

const PlacesDetailsHolder = styled.div`
  width: 100%;
  height: 60%;
`;

const StyledVerticalTimeline = styled(VerticalTimeline)`
  ::before{
    width: 2px !important;
  }
`;

export default function PlacesDetails() {
  return (
    <PlacesDetailsHolder>
      <StyledVerticalTimeline
        layout="1-column-left"
        lineColor="#51A863"
      >
        <PlaceTimeLineElement category="nature">
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement type="day">
          2022년 10월 08일
        </PlaceTimeLineElement>
        <PlaceTimeLineElement category="museum">
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement category="pet">
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
        <PlaceTimeLineElement>
          <PlaceInfo />
        </PlaceTimeLineElement>
      </StyledVerticalTimeline>
    </PlacesDetailsHolder>
  );
}
