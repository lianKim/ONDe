import React from 'react';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/journeyDetail';
import colors from '../../../lib/constants/colors';

const { gray300 } = colors;

const Container = styled.div`
  position: relative;

  &::after {
    content: '';
    display: block;
    margin-top: 24px;
    width: 100%;
    border: 0.5px solid ${gray300};
  }
`;

const Title = styled.h3`
  margin: 20px 0;
  margin-bottom: 36px;
  font-size: 42px;
  font-weight: 100;
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  & > img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }
`;

function TitleArea() {
  const { title, region, profileImageUrl, nickName } = useJourneyDetailValue();

  return (
    <Container>
      <button type="button">{region}</button>
      <Title>{title}</Title>
      <WriterInfo>
        <img src={profileImageUrl} alt="" />
        <span>{nickName}</span>
      </WriterInfo>
    </Container>
  );
}

export default TitleArea;
