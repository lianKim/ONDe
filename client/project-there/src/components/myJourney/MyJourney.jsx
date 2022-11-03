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

function MyJourney({ memberId }) {
  const { loadMyJourneyItems } = useJourneyListActions();

  useEffect(() => {
    loadMyJourneyItems(memberId);
  }, []);

  return (
    <Wrapper>
      <JourneyList />
    </Wrapper>
  );
}

export default MyJourney;
