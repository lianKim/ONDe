import React, { useRef } from 'react';
import styled from 'styled-components';

const StyledInfoHolder = styled.div`
  width: 50%;
  height: 100%;
  padding: 2%;
  background-color: grey;
`;
const StyledTitle = styled.h2`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -4%;
`;

const StyeldContents = styled.pre`
  font-weight: 300;
  font-size: 14px;
  letter-spacing: -4%;
`;

export default function PlaceDetailInfo() {
  const content =
    `본문입니다.
본문입니다.
본문입니다.`;

  return (
    <StyledInfoHolder>
      <StyledTitle>타이틀타이틀타이틀</StyledTitle>
      <StyeldContents>{content}</StyeldContents>
    </StyledInfoHolder>
  );
}
