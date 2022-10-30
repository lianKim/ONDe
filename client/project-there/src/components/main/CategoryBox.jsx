import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 360px;
  color: var(--color-green100);
  background: var(--color-gray100);

  padding: 20px 28px;

  & > div:first-child::after {
    content: '';
    display: block;
    width: 100%;
    height: 1px;
    border: 0.5px solid var(--color-green100);
    margin-top: 16px;
  }
`;

const BtnContainer = styled.div`
  margin-top: 24px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;

  & button {
    padding: 6px 14px;

    &.selected {
      background: var(--color-green100);
      color: var(--color-gray100);
    }
  }
`;

function CategoryBox({ category, children, onSetState }) {
  const handleClickBtn = ({ target }) => {
    if (!target.matches('button')) return;

    target.classList.toggle('selected');
    onSetState(target.textContent);
  };

  return (
    <Wrapper>
      <div>{children}</div>
      <BtnContainer onClick={handleClickBtn}>
        {Object.entries(category).map(([key, value]) => (
          <button type="button" key={key}>
            {value}
          </button>
        ))}
      </BtnContainer>
    </Wrapper>
  );
}

export default CategoryBox;
