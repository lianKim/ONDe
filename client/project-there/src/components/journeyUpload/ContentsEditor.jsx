import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IntroductionTextArea from './IntroductionTextArea';
import SchedulePicker from './SchedulePicker';
import PeopleCounterInput from './PeopleCounterInput';
import TitleInput from './TitleInput';
import ThemeCategoryBox from './ThemeCategoryBox';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import DisclosureBox from './DisclosureBox';

const ContentsEditorBox = styled.div`
  position: relative;
  background: salmon;
  width: 50%;
  height: 100%;
  padding: 16px;
`;

function ContentsEditor() {
  const journeyInfo = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  useEffect(() => {
    console.log(journeyInfo);
  }, [journeyInfo]);

  return (
    <ContentsEditorBox>
      <DisclosureBox />
      <TitleInput />
      <SchedulePicker />
      <PeopleCounterInput />
      <IntroductionTextArea />
      <ThemeCategoryBox />
    </ContentsEditorBox>
  );
}

export default ContentsEditor;
