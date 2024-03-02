import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

const StyledCommentInputHolder = styled.div`
  position: absolute;
  width: 94%;
  bottom: 0%;
  z-index: 12;
  background-color: var(--color-gray100);
  height: 60px;
  display: flex;
  padding-top: 10px;
  form {
    height: 100%;
    width: 100%;
    position: relative;
  }
  input {
    height: 80%;
    padding: 0px 30px 0px 10px;
    width: 90%;
    border: 0.5px solid var(--color-gray400);
    background: none;
    border-left: 0;
  }
  button {
    position: absolute;
    right: 0px;
    height: 80%;
    color: var(--color-green200);
    border: 0.5px solid var(--color-green200);
  }
`;

export default function PlaceCommentInput({
  placeId,
  userInfo,
  setComments,
  setTotalComments,
}) {
  const [tmpCommentId, setTmpCommentId] = useState(-1);

  const handleCommentInput = (e) => {
    e.preventDefault();

    if (!userInfo?.nickName) {
      window.alert('로그인이 필요한 서비스입니다.');
    } else {
      const { value } = e.target.querySelector('input');
      if (value !== '') {
        const newComment = {
          memberNickName: userInfo?.nickName,
          text: value,
          memberProfileImageUrl: userInfo?.profileImageUrl,
          commentId: tmpCommentId,
          placeId,
        };
        setTmpCommentId((pre) => pre - 1);
        setComments((prev) => [newComment, ...prev]);
        setTotalComments((prev) => prev + 1);
        e.target.querySelector('input').value = '';
      }
    }
  };
  return (
    <StyledCommentInputHolder>
      <form onSubmit={handleCommentInput}>
        <input type="text" placeholder="댓글 쓰기" />
        <button type="submit">등록</button>
      </form>
    </StyledCommentInputHolder>
  );
}
