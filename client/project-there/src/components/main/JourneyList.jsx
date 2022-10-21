import React, { useEffect } from 'react';
import styled from 'styled-components';
import JourneyCard from './JourneyCard';
import {
  useJourneyListActions,
  useJourneyListValue,
} from '../../contexts/journeyList';

const JourneyListBox = styled.div`
  width: 1000px;
  overflow: hidden;
  margin: 0 auto;
  margin-top: 100px;
`;

function JourneyList() {
  const { loadDatas } = useJourneyListActions();
  const journeyList = useJourneyListValue();

  useEffect(() => {
    loadDatas();
  });

  return (
    <JourneyListBox>
      {journeyList.map((item) => (
        <JourneyCard
          key={item.journeyId}
          memberId={item.memberId}
          title={item.title}
          journeyId={item.journeyId}
          regionGroups={item.regionGroups}
          placeThumbnailUrl={item.placeThumbnailUrl}
        />
      ))}
    </JourneyListBox>
  );
}

export default JourneyList;
