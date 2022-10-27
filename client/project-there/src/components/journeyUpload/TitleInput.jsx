import React, { useState, useRef, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Wrapper = styled.div`
  margin-top: 56px;

  &::after {
    content: '';
    display: block;
    width: 100%;
    border: 0.5px solid var(--color-gray300);
    margin-top: 24px;
  }

  & input {
    display: block;
    width: 100%;
    background: none;
    border: 0;
    font-size: var(--font-large);
    font-weight: var(--weight-light);
  }
`;

function TitleInput() {
  const { title } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const [nextTitle, setNextTitle] = useState(title);

  const handleInputChange = ({ target }) => {
    setNextTitle(target.value);
  };

  const handleUpdateTitle = () => {
    updateData('title', nextTitle);
  };

  useEffect(() => {
    setNextTitle(title);
  }, [title]);

  return (
    <Wrapper>
      <input
        type="text"
        value={nextTitle}
        onChange={handleInputChange}
        onBlur={handleUpdateTitle}
        placeholder="제목을 입력하세요"
      />
    </Wrapper>
  );
}

export default TitleInput;
