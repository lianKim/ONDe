import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';

const Wrapper = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
`;

const Counter = styled.div`
  background: var(--color-gray100);
  border: 0.5px solid var(--color-green200);
  padding: 3px;
  border-radius: 20px;
`;

const CounterTitle = styled.span`
  margin-right: 28px;
`;

const Button = styled.button`
  font-size: var(--font-regular);
  font-weight: var(--weight-light);
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 50%;
  background: var(--color-gray300);
  border: 0;
`;

const ValueBox = styled.span`
  margin: 0 12px;
`;

function PeopleCounterInput() {
  const { numberOfPeople } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();

  const handleUpdateNumOfPeople = ({ target }) => {
    if (target.textContent === '+') {
      updateData('numberOfPeople', numberOfPeople + 1);
    } else if (target.textContent === '-') {
      if (numberOfPeople === 0) return;
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

export default PeopleCounterInput;
