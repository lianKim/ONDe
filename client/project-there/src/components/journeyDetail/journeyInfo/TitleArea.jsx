import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/JourneyDetailContext';

const Container = styled.div`
  position: relative;

  &::after {
    content: '';
    display: block;
    margin-top: 24px;
    width: 100%;
    border: 0.5px solid var(--color-gray300);
  }
`;

const Title = styled.h3`
  margin: 20px 0;
  margin-bottom: 36px;
  font-size: 42px;
  font-weight: 100;
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
  }

  & > span {
    font-size: var(--font-micro);
    font-weight: var(--weight-semi-bold);
    cursor: pointer;
  }
`;

function TitleArea() {
  const { title, region, profileImageUrl, nickName } = useJourneyDetailValue();

  const navigate = useNavigate();

  const handleClickWriter = ({ target }) => {
    if (!target.matches('SPAN') && !target.matches('IMG')) return;

    navigate(`/journeys/${nickName}`);
  };

  return (
    <Container>
      <button type="button">{region}</button>
      <Title>{title}</Title>
      <Writer onClick={handleClickWriter}>
        <img src={profileImageUrl} alt="" />
        <span>{nickName}</span>
      </Writer>
    </Container>
  );
}

export default TitleArea;
