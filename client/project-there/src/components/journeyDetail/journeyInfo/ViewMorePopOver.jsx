import axios from 'axios';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/journeyDetail';
import { useNewJourneyActions } from '../../../contexts/newJourney';

const BtnContainer = styled.div`
  position: absolute;
  top: 140px;
  right: 98px;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  border-radius: var(--size-border-radius-small);
  overflow: hidden;

  & button {
    border: 0;
    border-radius: 0;
    background: var(--color-gray100);
    padding: 8px 24px;
    margin: 0;

    &:first-child {
      border-bottom: 1px solid var(--color-green200);
    }

    &:hover {
      background: var(--color-gray200);
    }
  }
`;

function ViewMorePopOver({ journeyId }) {
  const journey = useJourneyDetailValue();
  const { initDatas } = useNewJourneyActions();

  const navigate = useNavigate();

  const deleteDatas = useCallback(() => {
    const url = '';
    const params = {
      journeyId,
    };

    axios
      .delete(url, { params })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const handleEditBtnClick = () => {
    console.log('수정 페이지로 이동');
    initDatas(journey);
    navigate(`/journey/update/${journeyId}`);
  };

  const handleDeleteBtnClick = () => {
    alert('삭제 완료');
    navigate('/');
    // deleteDatas();
  };

  return (
    <BtnContainer>
      <button type="button" onClick={handleEditBtnClick}>
        수정
      </button>
      <button type="button" onClick={handleDeleteBtnClick}>
        삭제
      </button>
    </BtnContainer>
  );
}

export default ViewMorePopOver;
