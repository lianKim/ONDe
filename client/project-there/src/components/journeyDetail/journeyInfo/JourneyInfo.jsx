import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  useJourneyDetailActions,
  useJourneyDetailValue,
} from '../../../contexts/journeyDetail';

import NewJourneyProvider from '../../../contexts/newJourney';
import colors from '../../../lib/constants/colors';
import ContentArea from './ContentArea';
import TitleArea from './TitleArea';

const { gray100, green300 } = colors;

const Container = styled.div`
  width: 66.66vw;
  padding: 140px 100px;
  background: ${gray100};
  color: ${green300};
  border: 1px solid red;
  height: 100vh;

  & button {
    color: ${green300};
    font-size: 0.95rem;
    font-weight: 400;
    padding: 6px 14px;
    margin-right: 8px;
    background: ${gray100};
    border: 0.5px solid ${green300};
    border-radius: 24px;
  }
`;

function JourneyInfo({ journeyId }) {
  const { getDatas } = useJourneyDetailActions();
  const journey = useJourneyDetailValue();
  console.log(`journey: ${journey.journeyId}`);

  useEffect(() => {
    getDatas(journeyId);
  }, [journey]);

  return (
    <NewJourneyProvider>
      <Container>
        <TitleArea />
        <ContentArea />
      </Container>
    </NewJourneyProvider>
  );
}

export default JourneyInfo;
