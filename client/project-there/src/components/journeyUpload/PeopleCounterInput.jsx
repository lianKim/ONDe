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
  background: blue;
`;

const CounterTitle = styled.span`
  margin-right: 28px;
`;

const Button = styled.button`
  padding: 0.6em 1em;
  border-radius: 50%;
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
