import React from 'react';
import styled from 'styled-components';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import PlaceTimeLineElement from './PlaceTimeLineElement';
import PlaceTimeLineTimeIndicator from './PlaceTimeLineTimeIndicator';

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
        <PlaceTimeLineTimeIndicator number={1} />
        <PlaceTimeLineElement category="nature" />
        <PlaceTimeLineElement type="day" />
        <PlaceTimeLineElement category="museum" />
        <PlaceTimeLineTimeIndicator number={2} />
        <PlaceTimeLineElement category="pet" />
        <PlaceTimeLineElement />
        <PlaceTimeLineElement />
      </StyledVerticalTimeline>
    </PlacesDetailsHolder>
  );
}
