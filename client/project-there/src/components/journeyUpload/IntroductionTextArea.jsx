import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const TextArea = styled.textarea`
  width: 100%;
  height: 40%;
  margin-top: 32px;
  margin-bottom: 96px;
  border: 0;
  background: none;
  font-size: var(--font-small);
  color: var(--color-green200);
`;

function IntroductionTextArea() {
  const { introductionText } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const [nextIntroductionText, setNextIntroductionText] =
    useState(introductionText);

  const handleInputChange = ({ target }) => {
    setNextIntroductionText(target.value);
  };

  const handleUpdateContent = () => {
    updateData('introductionText', nextIntroductionText);
  };

  useEffect(() => {
    setNextIntroductionText(introductionText);
  }, [introductionText]);

  return (
    <TextArea
      value={nextIntroductionText}
      onChange={handleInputChange}
      onBlur={handleUpdateContent}
      placeholder="여정을 소개해주세요"
    />
  );
}

export default IntroductionTextArea;
