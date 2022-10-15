import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  position: absolute;
  right: 3%;
  bottom: 3%;
  width: 10%;
  height: 5%;
`;

export default function SubmitButton() {
  return <StyledButton>제출</StyledButton>;
}
