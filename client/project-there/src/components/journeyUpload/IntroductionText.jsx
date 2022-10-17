import React, { useState } from 'react';
import styled from 'styled-components';

const TextArea = styled.textarea`
  width: 100%;
  height: 40%;
  margin-top: 16px;
  background: white;
  border: 1px solid black;
`;

function IntroductionText({ datas, onUpdate }) {
  const [introductionText, setIntroductionText] = useState('');

  const handleInputChange = ({ target }) => {
    setIntroductionText(target.value);
  };

  const updateContent = () => {
    onUpdate({ ...datas, introductionText });
  };

  return (
    <TextArea
      value={introductionText}
      onChange={handleInputChange}
      onBlur={updateContent}
      placeholder="여정을 소개해주세요"
    />
  );
}

export default IntroductionText;
