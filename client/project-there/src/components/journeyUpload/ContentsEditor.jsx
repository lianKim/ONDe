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
import RegionCategoryBox from './RegionCategoryBox';
import SelectBox from './SelectBox';

const ContentsEditorBox = styled.div`
  position: relative;
  border: 1px solid black;
  width: calc(100vw - 100vh);
  height: 100vh;
  padding: 160px 60px 60px;
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
      <SelectBox />
      <IntroductionTextArea />
    </ContentsEditorBox>
  );
}

export default ContentsEditor;
