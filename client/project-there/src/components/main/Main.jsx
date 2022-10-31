import React, { useEffect, useRef, useState } from 'react';
import qs from 'qs';
import styled from 'styled-components';
import axios from 'axios';
import { useInView } from 'react-intersection-observer';
import DotLoader from 'react-spinners/DotLoader';
import CategoryBox from './CategoryBox';
import JourneyList from './JourneyList';
import journeyRegionCategories from '../../lib/constants/journeyRegionCategories';
import journeyThemeCategories from '../../lib/constants/journeyThemeCategories';
import {
  useJourneyListActions,
  useJourneyListValue,
} from '../../contexts/journeyList';

const Wrapper = styled.div`
  padding-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const KeywordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 120px;
  padding: 14px;
  font-size: var(--font-regular);

  & > span:first-child {
    font-size: var(--font-medium);
    font-weight: var(--weight-semi-bold);
  }
`;

const Categories = styled.div`
  margin: 60px 0 140px;

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

const Observer = styled.div`
  margin-top: 60px;
`;

function Main() {
  const { loadDatas, loadMoreDatas, updateSearchOptions, initSearchOptions } =
    useJourneyListActions();
  const [, searchOptions] = useJourneyListValue();

  // 카테고리, 키워드 검색 결과 컴포넌트 가시성 관리
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [hasKeyword, setHasKeyword] = useState(false);

  const handleSetRegions = (selected) => {
    if (searchOptions.regions.includes(selected)) {
      const nextRegions = searchOptions.regions.filter(
        (region) => region !== selected,
      );
      updateSearchOptions('regions', nextRegions);
    } else {
      const nextRegions = [...searchOptions.regions, selected];
      updateSearchOptions('regions', nextRegions);
    }
  };

  const handleSetThemes = (selected) => {
    if (searchOptions.themes.includes(selected)) {
      const nextThemes = searchOptions.themes.filter(
        (theme) => theme !== selected,
      );
      updateSearchOptions('themes', nextThemes);
    } else {
      const nextThemes = [...searchOptions.themes, selected];
      updateSearchOptions('themes', nextThemes);
    }
  };

  const handleOpenCategory = ({ target }) => {
    target.classList.toggle('selected');
    setIsCategoryOpen(!isCategoryOpen);
  };

  // 무한 스크롤
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [ref, inView] = useInView();
  const [observer, setObserver] = useState(true);

  // 유저가 옵저버를 보고 있고, 로딩 중이 아니라면 페이지 수 증가
  useEffect(() => {
    if (inView && !isLoading) {
      setIsLoading(true);
      setPage((prev) => prev + 1);
    }
  }, [inView, isLoading]);

  useEffect(() => {
    if (observer) {
      const hasDataLeft = loadMoreDatas(searchOptions, page);
      if (!hasDataLeft) setObserver(false);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  }, [page]);

  // 여정 목록 api 호출
  useEffect(() => {
    loadDatas(searchOptions);
    setObserver(true);

    if (searchOptions.keyword.length) {
      setHasKeyword(true);
    } else {
      setHasKeyword(false);
    }
  }, [searchOptions.keyword, searchOptions.themes, searchOptions.regions]);

  // clean-up
  useEffect(
    () => () => {
      initSearchOptions();
    },
    [],
  );

  return (
    <Wrapper>
      {hasKeyword && (
        <KeywordContainer>
          <span>{searchOptions.keyword}</span>
          <span>에 대한 검색 결과</span>
        </KeywordContainer>
      )}
      <Categories>
        <button type="button" onClick={handleOpenCategory}>
          Category
        </button>
        {isCategoryOpen && (
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
      {observer && (
        <Observer ref={ref}>
          <DotLoader color="#51A863" size="30px" />
        </Observer>
      )}
    </Wrapper>
  );
}

export default Main;
