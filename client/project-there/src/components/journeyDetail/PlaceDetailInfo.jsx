import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledInfoHolder = styled.div`
  width: 50%;
  height: 100%;
  padding: 2%;
  overflow: hidden;
`;
const StyledTitle = styled.h2`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -4%;
  margin-bottom: 10%;
`;
const StyeldContents = styled.p`
  font-weight: 300 !important;
  font-size: 14px !important;
  letter-spacing: -4% !important;
  max-height: 80%;
  /* height : ${(props) => props.displayOverFlowed && '80%'}; */
  text-overflow: ${(props) => !props.displayOverFlowed && 'ellipsis'};
  overflow: ${(props) => (props.displayOverFlowed ? 'auto' : 'hidden')};
  word-break: break-all;
  display: ${(props) => !props.displayOverFlowed && '-webkit-box'};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StyledContentDetail = styled.div`
  color: #bcc4c6;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  top:5px;
  cursor: pointer;
  ::after{
    content: "";
    display: block;
    width: 100%;
    border-bottom: 1px solid  #bcc4c6;
    position: relative;
    top: 5px;
  }
`;

export default function PlaceDetailInfo({ target }) {
  const [isOverflowed, setIsOverFlowed] = useState(false);
  const [displayOverflowed, setDisplayOverFlowed] = useState(false);
  const textRef = useRef();

  useEffect(() => {
    if (textRef && !displayOverflowed) {
      const overFlowCheck = textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsOverFlowed(overFlowCheck);
    }
  }, [textRef, displayOverflowed]);

  const handleContentClick = () => {
    setDisplayOverFlowed((pre) => !pre);
  };

  return (
    <StyledInfoHolder>
      <StyledTitle>{target.title}</StyledTitle>
      <StyeldContents
        ref={textRef}
        displayOverFlowed={displayOverflowed}
      >
        {target.text}
      </StyeldContents>
      {isOverflowed && (
      <StyledContentDetail
        onClick={handleContentClick}
      >
        {!displayOverflowed ? '더보기' : '접기'}
      </StyledContentDetail>
      )}
    </StyledInfoHolder>
  );
}
