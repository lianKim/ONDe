import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useJourneyDetailValue } from '../../../contexts/JourneyDetailContext';

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

  // 날짜 포맷 yyyy-mm-dd -> yyyy년 mm월 dd일 변경해주는 함수
  const changeDateFormatKR = useCallback(() => {
    const newDate1 = startDate.split('-');
    const newDate2 = endDate.split('-');
    return `${newDate1[0]}년 ${newDate1[1]}월 ${newDate1[2]}일 -
      ${newDate2[0]}년 ${newDate2[1]}월 ${newDate2[2]}일`;
  }, [startDate, endDate]);

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
        <button type="button">{changeDateFormatKR()}</button>
      </Category>
    </Wrapper>
  );
}

export default CategoryArea;
