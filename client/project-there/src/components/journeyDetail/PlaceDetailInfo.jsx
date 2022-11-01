import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { number } from 'prop-types';

const StyledInfoHolder = styled.div`
  width: 50%;
  height: 100%;
  padding: 2%;
  overflow: hidden;
  position: relative;
`;
const StyledTitle = styled.h2`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -4%;
  margin-bottom: 15%;
`;
const StyeldContents = styled.p`
  font-weight: 300 !important;
  font-size: 14px !important;
  letter-spacing: -4% !important;
  height: ${(props) => (props.displayOverFlowed ? '65%' : '15%')};
  white-space: pre-wrap;
  text-overflow: ${(props) => !props.displayOverFlowed && 'ellipsis'};
  overflow: ${(props) => (props.displayOverFlowed ? 'auto' : 'hidden')};
  word-break: break-all;
  display: ${(props) => !props.displayOverFlowed && '-webkit-box'};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  border-bottom: ${(props) => !props.overflowed && '1px solid #bcc4c6'};
`;
const StyledContentDetail = styled.div`
  color: #bcc4c6;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  top:15px;
  cursor: pointer;
  ::after{
    content: "";
    display: block;
    width: 100%;
    border-bottom: 1px solid  #bcc4c6;
    position: relative;
    top: 10px;
  }
`;
const StyledCommentHolder = styled.div`
  margin-top: ${(props) => (props.overflowed ? '40px' : '20px')};
  height: 30%;
  border-bottom: 1px solid #bcc4c6;
`;
const StyledCommentInputHolder = styled.div`
  position: absolute;
  width: 100%;
  bottom: 3%;
  z-index: 12;
  /* background-color: var(--color-gray100); */
  background-color: red;
  height: 10%;
  display: flex;
  align-items: center;
`;
const StyledCommentInput = styled.input`
  width: 100%;
`;
const StyledCommentInputSubmitButton = styled.button`
  color: var(--color-green100);
`;
const StyledLikeHolder = styled.div`
  padding: 0 0 5px 0;
  display: flex;
  align-items: center;
  span{
    margin-left: 6px;
    font-size: var(--font-regular);
    height:25px;
    font-weight: var(--weight-bold);
    padding-top: 2px;
  }
  margin-bottom: 10px;
`;
const StyledLikeIconHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg{
    width: 20px;
    height: 20px;
    color: red;
  }
`;

export default function PlaceDetailInfo({ target }) {
  const [isOverflowed, setIsOverFlowed] = useState(false);
  const [displayOverflowed, setDisplayOverFlowed] = useState(false);
  const [likeCount, setLikeCount] = useState(target.placeHeartCount);
  const [isLiked, setIsLiked] = useState(false);
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
  const handleCommentInput = (e) => {
    e.preventDefault();
    const { value } = e.target.querySelector('input');
    if (value !== '') {
      console.log(value);
    }
  };

  const handleLikeButtonClick = () => {
    setIsLiked((pre) => !pre);
    if (typeof (likeCount) === 'number') {
      if (isLiked) {
        setLikeCount((pre) => pre - 1);
      } else {
        setLikeCount((pre) => pre + 1);
      }
    }
  };

  return (
    <StyledInfoHolder>
      <StyledLikeHolder>
        <StyledLikeIconHolder
          onClick={handleLikeButtonClick}
        >
          {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
        </StyledLikeIconHolder>
        <span>
          {likeCount}
        </span>
      </StyledLikeHolder>
      <StyledTitle>{target.title}</StyledTitle>
      <StyeldContents
        ref={textRef}
        displayOverFlowed={displayOverflowed}
        overflowed={isOverflowed}
      >
        {target.text}
      </StyeldContents>
      {!!isOverflowed && (
        <StyledContentDetail
          onClick={handleContentClick}
        >
          {!displayOverflowed ? '더보기' : '접기'}
        </StyledContentDetail>
      )}
      <StyledCommentHolder
        overflowed={isOverflowed}
      >
        댓글창
      </StyledCommentHolder>
      <StyledCommentInputHolder>
        <form
          onSubmit={handleCommentInput}
        >
          <StyledCommentInput type="text" />
          <StyledCommentInputSubmitButton type="submit">등록</StyledCommentInputSubmitButton>
        </form>
      </StyledCommentInputHolder>
    </StyledInfoHolder>
  );
}
