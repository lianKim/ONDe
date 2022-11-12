import React, { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useNewJourneyValue } from '../../contexts/newJourney';
import ThemeCategoryModal from './ThemeCategoryModal';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 16px;

  & span {
    margin-right: 28px;
  }
`;

const Button = styled.button`
  margin-right: 6px;
`;

function ThemeCategoryPicker() {
  const { journeyThemes } = useNewJourneyValue();

  const [modal, setModal] = useState(false);

  const handleOpenModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const SelectedButtons = useMemo(() => {
    let keyNumber = 0;
    const elems = journeyThemes.map((theme) => {
      keyNumber += 1;
      return (
        <Button type="button" key={keyNumber} onClick={handleOpenModal}>
          {theme}
        </Button>
      );
    });

    return elems;
  }, [journeyThemes.length]);

  return (
    <Wrapper>
      <span>테마</span>
      {journeyThemes.length ? (
        SelectedButtons
      ) : (
        <button type="button" onClick={handleOpenModal}>
          선택
        </button>
      )}
      {modal && <ThemeCategoryModal onCloseModal={closeModal} />}
    </Wrapper>
  );
}

export default ThemeCategoryPicker;
