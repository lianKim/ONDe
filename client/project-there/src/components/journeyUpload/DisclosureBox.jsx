import React, { useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Wrapper = styled.div`
  padding: 8px;
  border: 1px solid black;
  background: lightgrey;
`;

const ButtonsContainer = styled.div`
  padding: 8px;
  border: 1px solid black;
  background: white;
`;

function DisclosureBox() {
  const [visible, setVisible] = useState(false);

  const { disclosure } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const options = {
    public: '전체공개',
    follower: '팔로워공개',
    private: '비공개',
  };

  const handleToggleOptions = () => {
    setVisible(!visible);
  };

  const handleSelectOption = ({ target }) => {
    console.log(`target.value : ${target.value}`);
    updateData('disclosure', target.value);
  };

  const optionButtons = Object.keys(options).map((opt) => (
    <button type="button" key={opt} value={opt} onClick={handleSelectOption}>
      {options[opt]}
    </button>
  ));

  return (
    <Wrapper>
      <button type="button" onClick={handleToggleOptions}>
        공개 범위 선택
      </button>
      {visible && <ButtonsContainer>{optionButtons}</ButtonsContainer>}
    </Wrapper>
  );
}

export default DisclosureBox;
