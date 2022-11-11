import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const conditionalChain = (condition, then, otherwise) => (condition ? then : otherwise);
const StyeldTextHolder = styled.p`
  font-weight: 300 !important;
  font-size: 14px !important;
  letter-spacing: -4% !important;
  height: ${(props) => (props.displayOverFlowed ? '58%' : conditionalChain(props.overflowed, '20%', '23%'))};
  white-space: pre-wrap;
  text-overflow: ${(props) => !props.displayOverFlowed && 'ellipsis'};
  overflow: ${(props) => (props.displayOverFlowed ? 'auto' : 'hidden')};
  word-break: break-all;
  display: ${(props) => !props.displayOverFlowed && '-webkit-box'};
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  border-bottom: ${(props) => !props.overflowed && '1px solid #bcc4c6'};
`;
const StyledTextSeeMore = styled.div`
  color: #bcc4c6;
  font-size: 12px;
  font-weight: 500;
  width: 100%;
  position: ${(props) => (props.displayCommentOverflowed ? 'absolute' : 'relative')};
  top:${(props) => (!props.displayCommentOverflowed && '10px')};
  bottom:${(props) => (props.displayCommentOverflowed && '14%')};
  cursor: pointer;
  background-color: var(--color-gray100);
  height:20px;
  border-bottom: 1px solid var(--color-gray400);
`;

export default function PlaceText({ text, controlOverflow, controlDisplay }) {
  const [isOverflowed, setIsOverFlowed] = controlOverflow;
  const [displayTextOverflowed, setDisplayTextOverFlowed] = controlDisplay;
  const textRef = useRef();

  const handleContentClick = () => {
    setDisplayTextOverFlowed((pre) => !pre);
  };

  useEffect(() => {
    if (textRef && !displayTextOverflowed) {
      const overFlowCheck = textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsOverFlowed(overFlowCheck);
    }
  }, [textRef, displayTextOverflowed]);

  return (
    <>
      <StyeldTextHolder
        ref={textRef}
        displayOverFlowed={displayTextOverflowed}
        overflowed={isOverflowed}
      >
        {text}
      </StyeldTextHolder>
      {
        !!isOverflowed && (
          <StyledTextSeeMore
            onClick={handleContentClick}
          >
            {!displayTextOverflowed ? '더보기' : '접기'}
          </StyledTextSeeMore>
        )
      }
    </>
  );
}
