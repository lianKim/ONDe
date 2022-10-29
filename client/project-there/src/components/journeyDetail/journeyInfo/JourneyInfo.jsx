import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  useJourneyDetailActions,
  useJourneyDetailValue,
} from '../../../contexts/journeyDetail';

import NewJourneyProvider, {
  useNewJourneyValue,
  useNewJourneyActions,
} from '../../../contexts/newJourney';
import colors from '../../../lib/constants/colors';
import ContentArea from './ContentArea';
import TitleArea from './TitleArea';
import ViewMorePopOver from './ViewMorePopOver';

const { gray100, green300 } = colors;

const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 140px 100px;
  background: ${gray100};
  color: ${green300};
  height: 100vh;
  border-radius: 30px;

  & button {
    color: ${green300};
    font-size: 0.95rem;
    font-weight: 400;
    padding: 6px 14px;
    margin-right: 8px;
    background: ${gray100};
    border: 0.5px solid ${green300};
    border-radius: 24px;

    &.btnViewMore {
      position: absolute;
      top: 140px;
      right: 100px;
      background: none;
      border: 0;
      padding: 0;
      margin: 0;
      font-weight: bold;
    }
  }
`;

const ViewMore = styled.div`
  position: relative;

  & button {
    position: absolute;
    top: 140px;
    right: 100px;
    background: none;
    border: 0;
    font-weight: bold;
  }
`;

function JourneyInfo({ journeyId }) {
  const journeyInfo = useNewJourneyValue();
  const { initDatas } = useNewJourneyActions();
  const { getDatas, updateData, testSetData } = useJourneyDetailActions();
  const journey = useJourneyDetailValue();

  const [visible, setVisible] = useState(false);

  const handleOpenPopOver = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    getDatas(journeyId);
  }, []);

  return (
    <NewJourneyProvider>
      <Container>
        <TitleArea />
        <ContentArea />
        <div>
          <button
            type="button"
            className="btnViewMore"
            onClick={handleOpenPopOver}
          >
            더보기
          </button>
          {visible && <ViewMorePopOver journeyId={journeyId} />}
        </div>
      </Container>
    </NewJourneyProvider>
  );
}

export default JourneyInfo;
