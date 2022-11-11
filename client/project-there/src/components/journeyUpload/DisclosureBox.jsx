import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Wrapper = styled.div`
  position: relative;
`;

const SelectButton = styled.button``;

const ButtonsContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 72px 60px;
  padding-top: 160px;
  display: flex;
  justify-content: start;
  align-items: start;
  background: var(--color-gray100);
  z-index: 9999;

  & button {
    margin-left: 16px;

    &:first-child {
      margin-left: 0;
    }

    &.selected {
      background: var(--color-green100);
      color: var(--color-gray100);
    }

    &.selected:hover {
      background: var(--color-green100);
      color: var(--color-gray100);
    }

    &:hover {
      background: var(--color-gray200);
      color: var(--color-green100);
    }
  }
`;

function DisclosureBox() {
  const [visible, setVisible] = useState(false);
  const buttonSelect = useRef();

  const { disclosure } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const options = {
    public: '전체공개',
    private: '비공개',
  };

  const handleOpenOptions = () => {
    setVisible(true);
  };

  const handleSelectOption = ({ target }) => {
    updateData('disclosure', target.value);
    setVisible(false);
    buttonSelect.current.textContent = target.textContent;
  };

  const optionButtons = Object.keys(options).map((opt) => (
    <button
      type="button"
      key={opt}
      value={opt}
      className={disclosure === opt ? 'selected' : ''}
      onClick={handleSelectOption}
    >
      {options[opt]}
    </button>
  ));

  return (
    <div>
      <SelectButton
        type="button"
        ref={buttonSelect}
        onClick={handleOpenOptions}
      >
        공개범위 선택
      </SelectButton>
      {visible && <ButtonsContainer>{optionButtons}</ButtonsContainer>}
    </div>
  );
}

export default DisclosureBox;
