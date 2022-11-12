import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  useJourneyDetailActions,
  useJourneyDetailValue,
} from '../../../contexts/journeyDetail';
import ContentArea from './ContentArea';
import TitleArea from './TitleArea';
import EllipsisMenu from './EllipsisMenu';
import { useAuthValue } from '../../../contexts/auth';

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 10vh 5vw;
  background: var(--color-gray100);
  color: var(--color-green200);
  height: 100vh;
  border-radius: 30px;

  & button {
    color: var(--color-green200);
    margin-right: 8px;
    padding-left: 18px;
    padding-right: 18px;
    background: var(--color-gray100);
    border: 0.5px solid var(--color-green200);
  }
`;

function JourneyInfo({ journeyId, setEditPossible, edit }) {
  const { getItem } = useJourneyDetailActions();
  const journey = useJourneyDetailValue();
  const userInfo = useAuthValue();

  useEffect(() => {
    getItem(journeyId);
  }, []);

  // nickName이 일치할 때에만 여정 및 장소 조작 버튼 활성화 해줌
  useEffect(() => {
    if (journey.nickName && userInfo.nickName) {
      if (journey.nickName === userInfo.nickName) {
        setEditPossible(true);
      }
    }
  }, [journey.nickName, userInfo.nickName]);

  return (
    <Wrapper>
      <TitleArea />
      <ContentArea />
      {edit && <EllipsisMenu journeyId={journeyId} />}
    </Wrapper>
  );
}

export default JourneyInfo;
