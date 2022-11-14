import React from 'react';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/JourneyDetailContext';
import CategoryArea from './CategoryArea';
import Bookmark from '../../common/journey/Bookmark';

const Wrapper = styled.div`
  position: relative;
  padding: 36px 0;

  &::after {
    content: '';
    display: block;
    margin-top: 34px;
    width: 100%;
    border: 0.5px solid var(--color-gray300);
  }
`;

const Content = styled.div`
  margin-top: 160px;
  white-space: pre-line;
  line-height: 1.6;
`;

function ContentArea() {
  const { journeyId, introductionText, bookmark } = useJourneyDetailValue();

  return (
    <Wrapper>
      <Bookmark journeyId={journeyId} bookmark={bookmark} />
      <CategoryArea />
      <Content>{introductionText}</Content>
    </Wrapper>
  );
}

export default ContentArea;
