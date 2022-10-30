import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import NewJourneyProvider, {
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

const JourneyUpload = React.memo(({ children }) => (
  <NewJourneyProvider>
    <JourneyFormBox>
      <ThumbsUploader />
      <ContentsEditor />
      <SubmitBtnContainer>{children}</SubmitBtnContainer>
    </JourneyFormBox>
  </NewJourneyProvider>
));

export default JourneyUpload;
