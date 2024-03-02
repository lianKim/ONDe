import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledCommentFixHolder = styled.section`
  position:absolute;
  padding-top: 10px;
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height:100%;
  left:0;
  top:0;
  background-color: var(--color-gray100);
  border: 1px solid var(--color-gray400);
  z-index: 20;
  input{
    margin-top: 10%;
    width: 90%;
    font-size: var(--font-micro);
    height: 2em;
    padding: 0 0.5em;
  }
  button{
    padding: 0.5em 1em !important;
    position: absolute;
    right:10px;
    bottom: 10px;
  }
`;

export default function PlaceCommentFix({ controlComments, controlFixtarget }) {
  const [fixValue, setFixValue] = useState('');
  const [comments, setComments] = controlComments;
  const [fixTarget, setFixTarget] = controlFixtarget;

  const changeFixInputValue = (e) => {
    setFixValue(e.target.value);
  };
  const fixComfirmButtonClick = (e) => {
    e.stopPropagation();
    const newComments = comments?.map((comment) => {
      if (comment?.commentId === fixTarget) {
        const newComment = { ...comment };
        newComment.text = fixValue;
        return newComment;
      }
      return comment;
    });
    setComments(newComments);
    setFixTarget(0);
  };

  // 수정 버튼을 눌렀을 때 input창에 나오는 초기 text를 설정해줌
  useEffect(() => {
    if (fixTarget !== 0) {
      let textValue = '';
      comments?.forEach((comment) => {
        if (comment.commentId === fixTarget) {
          textValue = comment.text;
        }
      });
      setFixValue(textValue);
    }
  }, [fixTarget]);

  return (
    <StyledCommentFixHolder>
      댓글 수정하기
      <input
        value={fixValue}
        onChange={changeFixInputValue}
      />
      <button
        type="button"
        onClick={fixComfirmButtonClick}
      >
        확인
      </button>
    </StyledCommentFixHolder>
  );
}
