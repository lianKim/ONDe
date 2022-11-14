import React from 'react';
import styled from 'styled-components';
import IntroductionTextArea from './IntroductionTextArea';
import TitleInput from './TitleInput';
import DisclosurePicker from './DisclosurePicker';
import PickersContainer from './PickersContainer';

const ContentsEditorBox = styled.div`
  position: relative;
  margin-left: calc(100vh - 60px);
  width: calc(100vw - 100vh - 60px);
  height: 100vh;
  padding: 160px 60px 60px;

  & button {
    color: var(--color-green200);
    border: 0.5px solid var(--color-green200);
  }
`;

function ContentsEditor() {
  return (
    <ContentsEditorBox>
      <DisclosurePicker />
      <TitleInput />
      <PickersContainer />
      <IntroductionTextArea />
    </ContentsEditorBox>
  );
}

export default ContentsEditor;
