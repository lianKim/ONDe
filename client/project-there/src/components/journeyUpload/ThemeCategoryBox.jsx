import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ThemeCategoryModal from './ThemeCategoryModal';

const Wrapper = styled.div`
  width: 100%;
  padding: 16px;
  margin-top: 16px;
  background: whitesmoke;
  border: 1px solid black;
`;

function ThemeCategoryBox() {
  const [visible, setVisible] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      <button type="button" onClick={handleOpenModal}>
        테마 선택
      </button>
      {visible && <ThemeCategoryModal onCloseModal={closeModal} />}
    </Wrapper>
  );
}

export default ThemeCategoryBox;
