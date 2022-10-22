import React from 'react';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/journeyDetail';
import colors from '../../../lib/constants/colors';

const { gray300 } = colors;

const Container = styled.div`
  position: relative;
  padding: 36px 0;

  &::after {
    content: '';
    display: block;
    margin-top: 36px;
    width: 100%;
    border: 0.5px solid ${gray300};
  }
`;

const Title = styled.h3`
  margin: 20px 0;
  margin-bottom: 40px;
  font-size: 42px;
  font-weight: 100;
`;

const BtnMore = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  font-weight: bold;
`;

function TitleArea() {
  const { title, region } = useJourneyDetailValue();
  console.log(region);

  return (
    <Container>
      <button type="button">{region}</button>
      <Title>{title}</Title>
      <div>
        <span>Img </span>
        <span>Nickname</span>
      </div>
      <BtnMore type="button">더보기</BtnMore>
    </Container>
  );
}

export default TitleArea;
