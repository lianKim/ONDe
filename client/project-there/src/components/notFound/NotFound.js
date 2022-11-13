import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 45vh;
  font-size: var(--font-medium);
  font-weight: var(--weight-light);
  text-align: center;
`;

function NotFound() {
  return <Wrapper>페이지를 표시할 수 없습니다.</Wrapper>;
}

export default NotFound;
