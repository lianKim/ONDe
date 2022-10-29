import React from 'react';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/journeyDetail';
import colors from '../../../lib/constants/colors';

const { gray100, green300 } = colors;

const Wrapper = styled.div`
  margin: 48px 0;
`;

const CategoryContainer = styled.div`
  margin-bottom: 16px;
`;

const CategoryName = styled.span`
  margin-right: 16px;
`;

function CategoryArea() {
  const { journeyThemes, numberOfPeople, startDate, endDate } =
    useJourneyDetailValue();

  const themes = journeyThemes.map((theme) => (
    <button type="button" key={theme}>
      {theme}
    </button>
  ));

  return (
    <Wrapper>
      <CategoryContainer className="theme">
        <CategoryName>테마</CategoryName>
        {themes}
      </CategoryContainer>
      <CategoryContainer className="numOfPeople">
        <CategoryName>인원</CategoryName>
        <button type="button">{numberOfPeople}</button>
      </CategoryContainer>
      <CategoryContainer>
        <CategoryName>일정</CategoryName>
        <button type="button">{`${startDate} - ${endDate}`}</button>
      </CategoryContainer>
    </Wrapper>
  );
}

export default CategoryArea;
