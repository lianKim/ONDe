import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import JourneyItem from './JourneyItem';

const JourneyListBox = styled.div`
  width: 1000px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 100px;
`;

function JourneyList() {
  return (
    <JourneyListBox>
      <Link to="/Journeys">
        <JourneyItem />
      </Link>
      <Link to="/Journeys">
        <JourneyItem />
      </Link>
      <Link to="/Journeys">
        <JourneyItem />
      </Link>
      <Link to="/Journeys">
        <JourneyItem />
      </Link>
      <Link to="/Journeys">
        <JourneyItem />
      </Link>
      <Link to="/Journeys">
        <JourneyItem />
      </Link>
    </JourneyListBox>
  );
}

export default JourneyList;
