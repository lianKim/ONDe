import React from 'react';
import styled from 'styled-components';
import { ReactComponent as LogoImg } from '../../../assets/logo/logo.svg';

const ResizedLogo = styled(LogoImg)`
  width: 80%;
`;

function Logo() {
  return (
    <h1>
      <ResizedLogo />
    </h1>
  );
}

export default Logo;
