import React from 'react';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/journeyDetail';
import { useJourneyListValue } from '../../../contexts/journeyList';
import { useNewJourneyValue } from '../../../contexts/newJourney';
import colors from '../../../lib/constants/colors';
import CategoryArea from './CategoryArea';
import IconBox from './IconBox';

const { gray300 } = colors;

const Container = styled.div`
  position: relative;
  padding: 36px 0;

  &::after {
    content: '';
    display: block;
    margin-top: 36px;
    width: 100%;
    border: 0.5px solid ${gray300};
  }
`;

const TextBox = styled.div`
  margin-top: 160px;
`;

function ContentArea() {
  const { introductionText } = useJourneyDetailValue();

  return (
    <Container>
      <IconBox />
      <CategoryArea />
      <TextBox>{introductionText}</TextBox>
    </Container>
  );
}

export default ContentArea;
