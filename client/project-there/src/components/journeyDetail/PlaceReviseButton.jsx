import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ButtonHolder = styled.div`
  position: absolute;
  right: 30px;
  top: 30px;
  z-index: 12;
`;

const RevisedButton = styled.button`
  width: 30px;
  border: none;
  font-size: 20px;
`;

const Wrapper = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const DeleteButton = styled.button`
  color: red;
`;
const FixButton = styled.button`
  color:blue;
`;

export default function PlaceReviseButton({ target }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigation = useNavigate();

  const handleReviseButtonCilck = () => {
    setIsOpen((pre) => !pre);
  };

  const handleDelete = () => {
    const url = `http://localhost:8080/place/delete?placeId=${target.placeId}`;
    const navigationPath = `/journey/${target.journeyId}`;
    axios
      .delete(url)
      .then((res) => {
        window.alert(`${target.placeId}가 성공적으로 제거되었습니다.`);
        window.location.reload();
      })
      .catch((err) => {
        window.alert(`${err}가 발생하였습니다.`);
        window.location.reload();
      });
  };

  const handleFix = () => {
    navigation(`/placeupdate/${target.placeId}`);
  };

  return (
    <ButtonHolder>
      <RevisedButton
        onClick={handleReviseButtonCilck}
      >
        ...
      </RevisedButton>
      {isOpen && (
        <Wrapper>
          <FixButton
            onClick={handleFix}
          >
            수정
          </FixButton>
          <DeleteButton
            onClick={handleDelete}
          >
            삭제
          </DeleteButton>
        </Wrapper>
      )}
    </ButtonHolder>
  );
}
