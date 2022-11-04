import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useJourneyListActions } from '../../contexts/journeyList';
import JourneyList from '../main/JourneyList';

const Wrapper = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function BookmarkedJourney({ memberId }) {
  const { loadBookmarkedItems } = useJourneyListActions();

  useEffect(() => {
    loadBookmarkedItems(memberId);
  }, []);

  return (
    <Wrapper>
      <JourneyList />
    </Wrapper>
  );
}

export default BookmarkedJourney;
