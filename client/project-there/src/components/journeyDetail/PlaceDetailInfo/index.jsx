import React, { useState } from 'react';
import styled from 'styled-components';
import PlaceCommentList from './PlaceCommentList';
import PlaceLike from './PlaceLike';
import PlaceText from './PlaceText';

const StyledInfoHolder = styled.div`
  width: 50%;
  height: 100%;
  padding: 2%;
  overflow: hidden;
  position: relative;
`;
const StyledTitle = styled.h2`
  font-size: 24px !important;
  font-weight: 300;
  letter-spacing: -4%;
  margin-bottom: 12%;
`;

export default function PlaceDetailInfo({ target }) {
  const [isTextOverflowed, setIsTextOverFlowed] = useState(false);
  const [displayTextOverflowed, setDisplayTextOverFlowed] = useState(false);
  return (
    <StyledInfoHolder>
      <PlaceLike
        target={target}
      />
      <StyledTitle>{target.title}</StyledTitle>
      <PlaceText
        text={target.text}
        controlOverflow={[isTextOverflowed, setIsTextOverFlowed]}
        controlDisplay={[displayTextOverflowed, setDisplayTextOverFlowed]}
      />
      <PlaceCommentList
        isTextOverflowed={isTextOverflowed}
        isTextDisplayOverflowed={displayTextOverflowed}
        placeId={target?.placeId}
      />
    </StyledInfoHolder>
  );
}
