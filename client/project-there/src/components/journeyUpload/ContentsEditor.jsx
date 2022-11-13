import React from 'react';
import styled from 'styled-components';
import IntroductionTextArea from './IntroductionTextArea';
import TitleInput from './TitleInput';
import DisclosurePicker from './DisclosurePicker';
import PickersContainer from './PickersContainer';

const ContentsEditorBox = styled.div`
  position: relative;
  margin-left: 100vh;
  width: calc(100vw - 100vh);
  height: 100vh;
  padding: 160px 60px 60px;
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
