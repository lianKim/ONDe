import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import ContentsEditor from './ContentsEditor';
import ThumbsUploader from './ThumbsUploader';

const JourneyFormBox = styled.form`
  position: relative;
  top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  overflow: auto;
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

const JourneyUploadContainer = React.memo(() => {
  const journeyInfo = useNewJourneyValue();
  const { addNewJourney, initDatas, hasEmptyValue } = useNewJourneyActions();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    hasEmptyValue(journeyInfo);

    addNewJourney(journeyInfo);
    // navigate('/journey');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(
    () => () => {
      initDatas();
    },
    [],
  );

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
});

export default JourneyUploadContainer;
