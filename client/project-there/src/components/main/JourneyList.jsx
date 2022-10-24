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
      <Link to="/Journey/1">
        <JourneyItem />
      </Link>
      <Link to="/Journey/2">
        <JourneyItem />
      </Link>
      <Link to="/Journey/3">
        <JourneyItem />
      </Link>
      <Link to="/Journey/4">
        <JourneyItem />
      </Link>
      <Link to="/Journey/5">
        <JourneyItem />
      </Link>
      <Link to="/Journey/6">
        <JourneyItem />
      </Link>
    </JourneyListBox>
  );
}

export default JourneyList;
