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
    font-size: var(--font-small);
    background: var(--color-blue100);
    color: var(--color-gray100);
    border: none;

    &:first-child {
      margin-right: 14px;
      background: var(--color-gray500);
      color: var(--color-gray100);
    }
  }
`;

function SubmitButtons() {
  const journeyInfo = useNewJourneyValue();
  const { addNewJourney, initState, hasEmptyValue } = useNewJourneyActions();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    hasEmptyValue(journeyInfo);

    // 다시 살려야 할 것들
    addNewJourney(journeyInfo);
    navigate('/journey');
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(
    () => () => {
      initState();
    },
    [],
  );

  return (
    <>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
      <button type="button" onClick={handleSubmit}>
        등록
      </button>
    </>
  );
}

export default SubmitButtons;
