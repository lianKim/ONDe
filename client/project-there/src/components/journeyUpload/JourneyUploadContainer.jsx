import React from 'react';
import styled from 'styled-components';
import { useJourneysValue } from '../../contexts/journeys';
import { addDatas } from '../../lib/utills';
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
  const journeys = useJourneysValue();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addDatas(journeys, '/api/url');
  };

  return (
    <JourneyFormBox onSubmit={handleFormSubmit}>
      <ThumbsUploader />
      <ContentsEditor />
    </JourneyFormBox>
  );
}

export default JourneyUploadContainer;
