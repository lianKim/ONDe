import React, { useState, useRef, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Input = styled.input`
  width: 100%;
  height: 8%;
  background: white;
  border: 1px solid black;
`;

function TitleInput() {
  const { title } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const [nextTitle, setNextTitle] = useState('');

  const handleInputChange = ({ target }) => {
    setNextTitle(target.value);
  };

  const handleUpdateTitle = () => {
    updateData('title', nextTitle);
  };

  return (
    <Input
      type="text"
      value={nextTitle}
      onChange={handleInputChange}
      onBlur={handleUpdateTitle}
      placeholder="제목을 입력하세요"
    />
  );
}

export default TitleInput;
