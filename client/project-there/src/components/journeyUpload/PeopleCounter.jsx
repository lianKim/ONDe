import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';

const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const CounterTitle = styled.span`
  margin-right: 28px;
`;

const Counter = styled.div`
  background: var(--color-gray100);
  color: var(--color-green200);
  border: 0.5px solid var(--color-green200);
  padding: 3px;
  border-radius: 20px;
  width: 92px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  font-size: var(--font-small);
  font-weight: var(--weight-light);
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 50%;
  background: var(--color-gray300);
  color: var(--color-green100);

  && {
    border: 0;
  }
`;

const ValueBox = styled.span`
  margin: 0 0px;
  font-size: var(--font-micro);
`;

function PeopleCounter() {
  const { numberOfPeople } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const handleUpdateNumOfPeople = ({ target }) => {
    if (target.textContent === '+') {
      if (numberOfPeople > 98) return;
      updateData('numberOfPeople', numberOfPeople + 1);
    } else if (target.textContent === '-') {
      if (numberOfPeople < 2) return;
      updateData('numberOfPeople', numberOfPeople - 1);
    }
  };

  return (
    <Wrapper>
      <CounterTitle>인원</CounterTitle>
      <Counter onClick={handleUpdateNumOfPeople}>
        <Button type="button">-</Button>
        <ValueBox>{numberOfPeople}</ValueBox>
        <Button type="button">+</Button>
      </Counter>
    </Wrapper>
  );
}

export default PeopleCounter;
