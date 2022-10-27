import React, { useEffect, useState } from 'react';
import qs from 'qs';
import styled from 'styled-components';
import axios from 'axios';
import CategoryBox from './CategoryBox';
import JourneyList from './JourneyList';
import journeyRegionCategories from '../../lib/constants/journeyRegionCategories';
import journeyThemeCategories from '../../lib/constants/journeyThemeCategories';
import { useJourneyListActions } from '../../contexts/journeyList';

const Wrapper = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Categories = styled.div`
  margin: 100px 0 140px;

  & > button:first-child {
    padding: 12px 27px;
    width: 100%;
    border-radius: 0;
    font-size: var(--font-small);
    letter-spacing: 0;
    text-align: left;
    background: var(--color-gray100);
    color: var(--color-green100);
    border: 1px solid var(--color-green100);
  }
`;

const CategoryBoxesContainer = styled.div`
  display: flex;
  border: 1px solid var(--color-green100);
  border-top: 0;
  border-radius: 0px 0px 50px 50px;
  overflow: hidden;

  & > div:last-child {
    border-left: 1px solid var(--color-green100);
  }
`;

function Main() {
  const { loadDatas } = useJourneyListActions();

  const [visible, setVisible] = useState(false);

  const [regions, setRegions] = useState([]);
  const [themes, setThemes] = useState([]);

  const handleSetRegions = (selected) => {
    if (regions.includes(selected)) {
      const nextRegions = regions.filter((region) => region !== selected);
      setRegions(nextRegions);
    } else {
      setRegions([...regions, selected]);
    }
  };

  const handleSetThemes = (selected) => {
    if (themes.includes(selected)) {
      const nextThemes = themes.filter((theme) => theme !== selected);
      setThemes(nextThemes);
    } else {
      setThemes([...themes, selected]);
    }
  };

  const handleOpenCategory = ({ target }) => {
    target.classList.toggle('selected');
    setVisible(!visible);
  };

  // 첫 렌더링 시 여정 목록 api 호출
  useEffect(() => {
    loadDatas();
  }, []);

  // 카테고리 선택 시 필터링 된 여정 목록 api 호출
  useEffect(() => {
    if (!regions.length && !themes.length) return;

    const params = {
      regions: regions.join(','),
      themes: themes.join(','),
    };

    if (regions.length && !themes.length) {
      delete params.themes;
    } else if (!regions.length && themes.length) {
      delete params.regions;
    }

    loadDatas(params);
  }, [regions, themes]);

  return (
    <Wrapper>
      <Categories>
        <button type="button" onClick={handleOpenCategory}>
          Category
        </button>
        {visible && (
          <CategoryBoxesContainer>
            <CategoryBox
              category={journeyRegionCategories}
              onSetState={handleSetRegions}
            >
              지역
            </CategoryBox>
            <CategoryBox
              category={journeyThemeCategories}
              onSetState={handleSetThemes}
            >
              테마
            </CategoryBox>
          </CategoryBoxesContainer>
        )}
      </Categories>

      <JourneyList />
    </Wrapper>
  );
}

export default Main;
