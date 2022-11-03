import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import BookmarkedJourney from '../components/bookMarkedJourney/BookmarkedJourney';

const TestDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 180px;
`;

function BookmarkedJourneyPage() {
  const { memberId } = useParams();

  return (
    <TestDiv>
      <BookmarkedJourney memberId={memberId} />
    </TestDiv>
  );
}

export default BookmarkedJourneyPage;
