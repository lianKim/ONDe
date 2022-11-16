import React from 'react';
import styled from 'styled-components';
import ContentsEditor from './ContentsEditor';
import ThumbsUploader from './ThumbsUploader';

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
    border: 0;

    &:first-child {
      margin-right: 14px;
      background: var(--color-gray400);
      color: var(--color-gray100);
    }
  }
`;

function JourneyUploader({ children }) {
  return (
    <JourneyFormBox>
      <ThumbsUploader />
      <ContentsEditor />
      <SubmitBtnContainer>{children}</SubmitBtnContainer>
    </JourneyFormBox>
  );
}

export default JourneyUploader;
