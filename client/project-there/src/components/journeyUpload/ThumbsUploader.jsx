import React from 'react';
import styled from 'styled-components';
import FileDragUploader from './FileDragUploader';
import colors from '../../lib/constants/colors';

const { gray100, gray300 } = colors;

const Container = styled.div`
  position: fixed;
  width: calc(100vh - 60px);
  height: calc(100vh - 60px);
  min-width: 200px;

  background: ${gray100}
  border-right: 1px solid black;
`;

function ThumbsUploader() {
  return (
    <Container>
      <FileDragUploader />
    </Container>
  );
}

export default React.memo(ThumbsUploader);
