import React from 'react';
import styled from 'styled-components';

const JourneyItemBox = styled.div`
  display: inline-block;
  width: 300px;
  height: 300px;
  padding: 16px;
  border: 1px solid black;
  background: lightsalmon;
  margin: 8px;
`;

function JourneyItem() {
  return (
    <JourneyItemBox>
      <div>타이틀</div>
      <div>글쓴이</div>
      <div>위치</div>
      <div>좋아요 개수</div>
    </JourneyItemBox>
  );
}

export default JourneyItem;
