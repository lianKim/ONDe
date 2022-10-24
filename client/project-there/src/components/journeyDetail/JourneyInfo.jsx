import React from 'react';
import styled from 'styled-components';

const JourneyInfoHolder = styled.div`
  width: 100%;
  height: 40%;
  border : 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function JourneyInfo() {
  return (
    <JourneyInfoHolder>
      여정의 머리말 부분을 보여주는 부분
    </JourneyInfoHolder>
  );
}
