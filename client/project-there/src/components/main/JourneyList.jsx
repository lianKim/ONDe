import React from 'react';
import styled from 'styled-components';
import JourneyCard from './JourneyCard';
import { useJourneyListValue } from '../../contexts/journeyList';

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
`;

const JourneyListBox = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 300px);
  grid-gap: 64px 42px;
  margin-bottom: 92px;
`;

function JourneyList({ page }) {
  const [journeyList] = useJourneyListValue();

  return (
    <Wrapper>
      <JourneyListBox>
        {journeyList.map((item) => (
          <JourneyCard key={item.journeyId} cardInfo={item} page={page} />
        ))}
      </JourneyListBox>
    </Wrapper>
  );
}

export default JourneyList;
