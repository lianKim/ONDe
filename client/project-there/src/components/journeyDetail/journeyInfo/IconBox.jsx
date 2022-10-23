import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`;

function IconBox() {
  return (
    <Container>
      <span>북마크 </span>
      <span>공유</span>
    </Container>
  );
}

export default IconBox;
