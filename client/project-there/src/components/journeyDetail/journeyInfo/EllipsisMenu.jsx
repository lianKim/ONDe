import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineEllipsis } from 'react-icons/ai';
import { useAuthValue } from '../../../contexts/AuthContext';
import { useJourneyDetailValue } from '../../../contexts/JourneyDetailContext';
import { deleteJourneyAPI } from '../../../lib/apis/journey';

const Wrapper = styled.div`
  position: absolute;
  top: 128px;
  right: 5vw;

  display: flex;
  flex-direction: column;
  align-items: flex-end;

  && button {
    margin: 0;
  }
`;

const IconButton = styled.button`
  && {
    background: none;
    border: 0;
    padding: 0;
    margin: 0;
    font-weight: bold;
  }
`;

const ControllerButtons = styled.div`
  display: flex;
  flex-direction: column;
  border: 0.5px solid var(--color-green200);
  border-radius: var(--size-border-radius-small);
  overflow: hidden;

  && > button {
    border: var(--size-border-radius-small);
    border-radius: 0;
    background: var(--color-gray100);
    padding: 8px 22px;
    margin: 0;

    &:first-child {
      border-bottom: 0.5px solid var(--color-green200);
    }

    &:hover {
      background: var(--color-gray200);
    }
  }
`;

function EllipsisMenu({ journeyId }) {
  const navigate = useNavigate();

  const journey = useJourneyDetailValue();
  const { nickName } = useAuthValue();
  const [visible, setVisible] = useState(false);

  const handleTogglevisible = () => {
    setVisible(!visible);
  };

  const handleEditBtnClick = () => {
    if (nickName !== journey.nickName) {
      return alert('수정 권한이 없습니다.');
    }

    navigate(`/journey/update/${journeyId}`);
  };

  const handleDeleteBtnClick = async () => {
    if (nickName !== journey.nickName) {
      return alert('삭제 권한이 없습니다.');
    }

    const removedJourneyId = await deleteJourneyAPI(journeyId);
    if (removedJourneyId) navigate('/');
  };

  return (
    <Wrapper>
      <IconButton type="button" onClick={handleTogglevisible}>
        <AiOutlineEllipsis size="24px" />
      </IconButton>
      {visible && (
        <ControllerButtons>
          <button type="button" onClick={handleEditBtnClick}>
            수정
          </button>
          <button type="button" onClick={handleDeleteBtnClick}>
            삭제
          </button>
        </ControllerButtons>
      )}
    </Wrapper>
  );
}

export default EllipsisMenu;
