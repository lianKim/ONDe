import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import JourneyCard from './JourneyCard';
import {
  useJourneyListActions,
  useJourneyListValue,
} from '../../contexts/journeyList';
import JourneyDetailProvider from '../../contexts/journeyDetail';

const Wrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  margin-top: max(24vh, 100px);
`;

const JourneyListBox = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(3, 300px);
  grid-gap: 64px 42px;
`;

function JourneyList() {
  const { loadDatas } = useJourneyListActions();
  const journeyList = useJourneyListValue();

  useEffect(() => {
    loadDatas();
  }, []);
  return (
    <JourneyDetailProvider>
      <Link to="/journey/upload">새로운 여정 등록</Link>
      <Wrapper>
        <JourneyListBox>
          {journeyList.map((item) => (
            <JourneyCard
              key={item.journeyId}
              memberId={item.memberId}
              title={item.title}
              journeyId={item.journeyId}
              region={item.region}
              journeyThumbnailUrl={item.journeyThumbnailUrl}
            />
          ))}
        </JourneyListBox>
      </Wrapper>
    </JourneyDetailProvider>
  );
}

export default JourneyList;
