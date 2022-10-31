import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import {
  useJourneyDetailActions,
  useJourneyDetailValue,
} from '../../contexts/journeyDetail';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import ContentsEditor from '../journeyUpload/ContentsEditor';
import ThumbsUploader from '../journeyUpload/ThumbsUploader';

const JourneyFormBox = styled.form`
  position: relative;
  top: 60px;
  width: 100vw;
  height: 100vh;
  display: flex;
`;

const SubmitBtnContainer = styled.div`
  position: absolute;
  top: 36px;
  right: 36px;

  & button {
    font-size: var(--font-micro);
    background: var(--color-green200);
    color: var(--color-gray100);
    border: none;

    &:first-child {
      margin-right: 14px;
      background: var(--color-gray400);
      color: var(--color-gray100);
    }
  }
`;

function JourneyUpdateContainer({ journeyId }) {
  const journey = useJourneyDetailValue();
  const { getDatas } = useJourneyDetailActions();
  const { initDatas, updateJourneyInfo } = useNewJourneyActions();
  const journeyInfo = useNewJourneyValue();

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    // -- axios patch 함수 호출
    updateJourneyInfo(journeyInfo);

    navigate(`/journey/${journey.journeyId}`);
    // navigate(-1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    getDatas(journeyId);
  }, []);

  useEffect(() => {
    initDatas(journey);
  }, [journey]);

  return (
    <JourneyFormBox>
      <ThumbsUploader />
      <ContentsEditor />
      <SubmitBtnContainer>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
        <button type="button" onClick={handleSubmit}>
          등록
        </button>
      </SubmitBtnContainer>
    </JourneyFormBox>
  );
}

export default JourneyUpdateContainer;
