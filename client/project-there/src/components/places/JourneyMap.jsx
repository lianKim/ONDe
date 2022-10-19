import React from 'react';
import styled from 'styled-components';

const JourneyMapHolder = styled.div`
  width: 40%;
  height: 100%;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function JourneyMap() {
  return (
    <JourneyMapHolder>
      지도를 보여주는 element
    </JourneyMapHolder>
  );
}
