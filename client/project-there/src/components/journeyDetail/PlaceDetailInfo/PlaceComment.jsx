import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlaceCommentReviseButton from './PlaceCommentReviseButton';

const StyledComment = styled.li`
  display: flex;
  position:relative;
  width: 90%;
  align-items: center;
  justify-content: center;
  font-size: var(--font-micro) !important;
  margin: 6px 10px;
  img{
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
  .nickName{
    margin: 0 10px;
    width: 100px;
    font-size: var(--font-micro) !important;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }
  .comment{
    width: 60%;
    display: flex;
    align-items: center;
    margin:0px;
    font-size: var(--font-micro) !important;
    overflow: auto;
  }
`;

export default function PlaceComment({ comment, controlDelete, controlFix, userNickName }) {
  const { memberProfileImageUrl, memberNickName, text } = comment;
  const [editPossible, setEditPossible] = useState(false);

  useEffect(() => {
    if (userNickName === memberNickName) {
      setEditPossible(true);
    }
  }, []);

  return (
    <StyledComment>
      <img src={memberProfileImageUrl} alt="p" />
      <p className="nickName">{memberNickName}</p>
      <p className="comment">{text}</p>
      {editPossible && (
        <PlaceCommentReviseButton
          controlDelete={controlDelete}
          controlFix={controlFix}
          commentId={comment.commentId}
        />)}
    </StyledComment>
  );
}
