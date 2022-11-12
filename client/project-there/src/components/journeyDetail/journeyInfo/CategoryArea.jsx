import React from 'react';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/journeyDetail';
import colors from '../../../lib/constants/colors';

const { gray100, green300 } = colors;

const Wrapper = styled.div`
  margin: 48px 0;
`;

const Category = styled.div`
  margin-bottom: 16px;
`;

const Label = styled.span`
  margin-right: 16px;
`;

function CategoryArea() {
  const { journeyThemes, numberOfPeople, startDate, endDate } =
    useJourneyDetailValue();

  return (
    <Wrapper>
      <Category>
        <Label>테마</Label>
        {journeyThemes.map((theme) => (
          <button type="button" key={theme}>
            {theme}
          </button>
        ))}
      </Category>
      <Category>
        <Label>인원</Label>
        <button type="button">{numberOfPeople}</button>
      </Category>
      <Category>
        <Label>일정</Label>
        <button type="button">{`${startDate} - ${endDate}`}</button>
      </Category>
    </Wrapper>
  );
}

export default CategoryArea;
