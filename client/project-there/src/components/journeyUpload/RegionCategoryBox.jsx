import React, { useState } from 'react';
import styled from 'styled-components';
import RegionCategory from './RegionCategory';

const CategoryBox = styled.div`
  position: relative;
  width: 100%;
  height: 8%;
  margin-top: 16px;
  background: lightgrey;
  border: 1px solid black;
`;

const SelectButton = styled.button`
  width: 100%;
  height: 100%;
  background: white;
  border: none;
  text-align: left;
`;

const SelectButtonsContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  background: lightblue;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const regions = ['서울', '대구', '부산', '대전', '제주'];

function RegionCategoryBox({ datas, onUpdate }) {
  const [visible, setVisible] = useState(false);

  const updateRegion = ($target) => {
    onUpdate({ ...datas, region: $target.textConent });
  };

  const handleClickCategory = ({ target }) => {
    updateRegion(target);
    setVisible(false);
  };

  const handleCategoryOpen = () => {
    setVisible(!visible);
  };

  return (
    <CategoryBox>
      <SelectButton type="button" onClick={handleCategoryOpen}>
        지역 선택
      </SelectButton>
      {visible && (
        <SelectButtonsContainer>
          {regions.map((region) => (
            <RegionCategory key={region} onClick={handleClickCategory}>
              {region}
            </RegionCategory>
          ))}
        </SelectButtonsContainer>
      )}
    </CategoryBox>
  );
}

export default RegionCategoryBox;
