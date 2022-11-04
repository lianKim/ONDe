import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import MyJourney from '../components/myJourney/MyJourney';

const TestDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 180px;
`;

function MyJourneyPage() {
  const { memberId } = useParams();

  return (
    <TestDiv>
      <MyJourney memberId={memberId} />
    </TestDiv>
  );
}

export default MyJourneyPage;
