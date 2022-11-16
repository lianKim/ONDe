import React from 'react';
import styled from 'styled-components';
import FileDragUploader from './FileDragUploader';

const Container = styled.div`
  position: fixed;
  width: calc(100vh - 60px);
  height: calc(100vh - 60px);
  min-width: 200px;

  background: var(--color-gray100);
`;

function ThumbsUploader() {
  return (
    <Container>
      <FileDragUploader />
    </Container>
  );
}

export default React.memo(ThumbsUploader);
