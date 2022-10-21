import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import ContentsEditor from './ContentsEditor';
import ThumbsUploader from './ThumbsUploader';

const JourneyFormBox = styled.form`
  width: 900px;
  height: 500px;
  background: blue;
  border: 1px solid black;
  display: flex;
  margin: 0 auto;
  margin-top: 100px;
`;

function JourneyUploadContainer() {
  const journeyInfo = useNewJourneyValue();
  const { addNewJourney, initState } = useNewJourneyActions();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    addNewJourney(journeyInfo);
    navigate('/journey');
    // initState();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <JourneyFormBox>
      <ThumbsUploader />
      <ContentsEditor />
      <div>
        <button type="button" onClick={handleSubmit}>
          등록
        </button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </div>
    </JourneyFormBox>
  );
}

export default JourneyUploadContainer;
