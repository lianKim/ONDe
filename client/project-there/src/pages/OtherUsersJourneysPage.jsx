import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import OtherUsersJourneys from '../components/otherUsersJourneys/OtherUsersJourneys';

const TestDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 180px;
`;

function OtherUsersJourneysPage() {
  const params = useParams();

  return (
    <TestDiv>
      <OtherUsersJourneys nickName={params.nickName} />
    </TestDiv>
  );
}

export default OtherUsersJourneysPage;
