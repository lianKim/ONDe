import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const TextArea = styled.textarea`
  width: 100%;
  height: 40%;
  margin-top: 16px;
  background: white;
  border: 1px solid black;
`;

function IntroductionTextArea() {
  const { introductionText } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const [nextIntroductionText, setNextIntroductionText] = useState('');

  const handleInputChange = ({ target }) => {
    setNextIntroductionText(target.value);
  };

  const handleUpdateContent = () => {
    updateData('introductionText', nextIntroductionText);
    console.log(`introductionText: ${introductionText}`);
  };

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
