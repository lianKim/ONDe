import React from 'react';
import styled from 'styled-components';
import FileDragUploader from './FileDragUploader';
import colors from '../../lib/constants/colors';

const { gray100, gray300 } = colors;

const Container = styled.div`
  width: 100vh;
  height: 100vh;
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

export default ThumbsUploader;
