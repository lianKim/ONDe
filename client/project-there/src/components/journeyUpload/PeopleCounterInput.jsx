import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const PeopleCounterBox = styled.div`
  width: 100%;
  height: 8%;
  background: white;
  border: 1px solid black;
  margin-top: 16px;
  display: flex;
  justify-content: left;
  align-items: center;
`;

const CounterTitle = styled.span`
  margin-right: 8px;
`;

const Button = styled.button`
  background: white;
  border: 1px solid black;
  border-radius: 50%;
  padding: 4px;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ValueBox = styled.span`
  margin: 0 12px;
`;

function PeopleCounterInput({ datas, onUpdate }) {
  const [peopleCount, setPeopleCount] = useState(0);

  const handleIncrease = () => {
    setPeopleCount((prev) => prev + 1);
  };

  const handleDecrease = () => {
    if (peopleCount === 0) {
      return alert('유효하지 않은 인원 수입니다.');
    }
    setPeopleCount((prev) => prev - 1);
  };

  useEffect(() => {
    onUpdate({ ...datas, people: peopleCount });
  }, [peopleCount]);

  return (
    <PeopleCounterBox>
      <CounterTitle>여행자</CounterTitle>
      <Button type="button" onClick={handleDecrease}>
        -
      </Button>
      <ValueBox>{datas.people}</ValueBox>
      <Button type="button" onClick={handleIncrease}>
        +
      </Button>
    </PeopleCounterBox>
  );
}

export default PeopleCounterInput;
