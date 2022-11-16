import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PlaceCommentReviseButton from './PlaceCommentReviseButton';

const StyledComment = styled.li`
  display: flex;
  position: relative;
  width: 95%;
  font-size: var(--font-micro) !important;
  margin: 4.5px;

  img {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    object-fit: cover;
    min-width: 28px;
    min-height: 28px;
  }

  .nickName {
    margin: 2px 8px;
    width: 100px;
    font-size: var(--font-micro) !important;
    overflow: hidden;
    display: flex;
    font-weight: var(--weight-semi-bold) !important;
  }

  .comment {
    width: 100%;
    margin: 2px;
    font-size: var(--font-micro) !important;
    font-weight: var(--weight-regular) !important;
    white-space: normal;
    /* overflow: auto; */
  }
`;

export default function PlaceComment({
  comment,
  controlDelete,
  controlFix,
  userNickName,
}) {
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
        />
      )}
    </StyledComment>
  );
}
