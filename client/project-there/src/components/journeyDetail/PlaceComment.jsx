import React from 'react';
import styled from 'styled-components';

const StyledComment = styled.li`
  display: flex;
  width: 95%;
  align-items: center;
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

export default function PlaceComment({ comment }) {
  return (
    <StyledComment>
      <img src={comment.thumbnail} alt="프로필이미지" />
      <p className="nickName">{comment.memberId}</p>
      <p className="comment">{comment.comment}</p>
    </StyledComment>
  );
}
