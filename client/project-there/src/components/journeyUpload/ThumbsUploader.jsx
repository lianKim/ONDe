import React from 'react';
import styled from 'styled-components';
import FileDragUploader from './FileDragUploader';

const Container = styled.div`
  width: 50%;
  height: 100%;
  background: lightsalmon;
  border-right: 1px solid black;
`;

function ThumbsUploader() {
  return (
    <Container>
      <FileDragUploader />
    </Container>
  );
}

export default ThumbsUploader;
