import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { number } from 'prop-types';
import PlaceComment from './PlaceComment';
import CommentList from '../../datas/comment';

const contentHeight = (condition, then, otherwise) => (condition ? then : otherwise);

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
const StyeldContents = styled.p`
  font-weight: 300 !important;
  font-size: 14px !important;
  letter-spacing: -4% !important;
  height: ${(props) => (props.displayOverFlowed ? '58%' : contentHeight(props.overflowed, '20%', '25%'))};
  white-space: pre-wrap;
  text-overflow: ${(props) => !props.displayOverFlowed && 'ellipsis'};
  overflow: ${(props) => (props.displayOverFlowed ? 'auto' : 'hidden')};
  word-break: break-all;
  display: ${(props) => !props.displayOverFlowed && '-webkit-box'};
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  border-bottom: ${(props) => !props.overflowed && '1px solid #bcc4c6'};
`;
const StyledContentDetail = styled.div`
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
const StyledCommentHolder = styled.ul`
  margin-top: ${(props) => (props.contentOverflowed ? '20px' : '20px')};
  height: ${(props) => (props.displayCommentOverflowed ? '60%' : contentHeight(props.commentOverflowed, '28%', '35%'))};
  border-bottom: ${(props) => !props.commentOverflowed && '1px solid #bcc4c6'};
  position: ${(props) => (props.displayCommentOverflowed ? 'absolute' : 'relative')};
  background-color: var(--color-gray100);
  top:${(props) => (props.displayCommentOverflowed && '18%')};
  left:${(props) => (props.displayCommentOverflowed && '10px')};
  width: 100%;
  span{
    color: var(--color-gray400);
    font-size: var(--font-micro);
  }
  overflow: ${(props) => (props.displayCommentOverflowed ? 'auto' : 'hidden')};
  display: flex;
  flex-direction: column;
`;
const StyledCommentInputHolder = styled.div`
  position: absolute;
  width: 94%;
  bottom: 0%;
  z-index: 12;
  background-color: var(--color-gray100);
  height: 60px;
  display: flex;
  padding-top: 10px;
  form{
    height:100%;
    width:100%;
    position:relative;
  }
  input{
    height: 80%;
    padding: 0px 30px 0px 10px;
    width: 90%;
    border: 1px solid var(--color-gray400);
  }
  button{
    position:absolute;
    right:0px;
    height: 80%;
  }
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
  const [isCommentOverflowed, setIsCommentOverflowed] = useState(false);
  const [displayOverflowed, setDisplayOverFlowed] = useState(false);
  const [displayCommentOverflowed, setDisplayCommentOverflowed] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const textRef = useRef();
  const commentRef = useRef();

  useEffect(() => {
    if (textRef && !displayOverflowed) {
      const overFlowCheck = textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsOverFlowed(overFlowCheck);
    }
  }, [textRef, displayOverflowed]);

  useEffect(() => {
    if (commentRef && !displayCommentOverflowed) {
      const overFlowCheck = commentRef.current.scrollHeight > commentRef.current.clientHeight;
      setIsCommentOverflowed(overFlowCheck);
    }
  }, [commentRef, displayCommentOverflowed, comments]);

  // 데이터 받아오는 부분
  useEffect(() => {
    if (CommentList) {
      setComments(CommentList);
    }
    setLikeCount(target.placeHeartSum);
  }, []);

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
  const handleCommentClick = () => {
    setDisplayCommentOverflowed((pre) => !pre);
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
        contentOverflowed={isOverflowed}
        commentOverflowed={isCommentOverflowed}
        displayCommentOverflowed={displayCommentOverflowed}
        ref={commentRef}
      >
        {comments?.length === 0 && (<span>댓글이 없습니다.</span>)}
        {comments?.length !== 0 &&
          (comments.map((comment) => <PlaceComment key={comment?.commentId} comment={comment} />))}
      </StyledCommentHolder>
      {!!isCommentOverflowed && (
        <StyledContentDetail
          onClick={handleCommentClick}
          displayCommentOverflowed={displayCommentOverflowed}
        >
          {!displayCommentOverflowed ? '더보기' : '접기'}
        </StyledContentDetail>
      )}
      <StyledCommentInputHolder>
        <form
          onSubmit={handleCommentInput}
        >
          <input type="text" placeholder="댓글 쓰기" />
          <button type="submit">등록</button>
        </form>
      </StyledCommentInputHolder>
    </StyledInfoHolder>
  );
}
