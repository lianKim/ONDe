import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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
  const {
    loadJourneyItems,
    initDatas,
    updateSearchOptions,
    initSearchOptions,
  } = useJourneyListActions();
  const [journeyList, { keyword, themes, regions }] = useJourneyListValue();

  // 카테고리, 키워드 검색 결과 컴포넌트 가시성 관리
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [hasKeyword, setHasKeyword] = useState(false);

  const handleSetRegions = (selected) => {
    if (regions.includes(selected)) {
      const nextRegions = regions.filter((region) => region !== selected);
      updateSearchOptions('regions', nextRegions);
    } else {
      const nextRegions = [...regions, selected];
      updateSearchOptions('regions', nextRegions);
    }
  };

  const handleSetThemes = (selected) => {
    if (themes.includes(selected)) {
      const nextThemes = themes.filter((theme) => theme !== selected);
      updateSearchOptions('themes', nextThemes);
    } else {
      const nextThemes = [...themes, selected];
      updateSearchOptions('themes', nextThemes);
    }
  };

  const handleOpenCategory = ({ target }) => {
    target.classList.toggle('selected');
    setIsCategoryOpen(!isCategoryOpen);
  };

  const [page, setPage] = useState(0);
  const [ref, inView] = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [observer, setObserver] = useState(true);

  // // 서버에서 아이템을 가지고 오는 함수
  const getItems = useCallback(
    async (options) => {
      setIsLoading(true);

      const isLast = await loadJourneyItems(options, page);
      if (isLast) setObserver(false);
      else setObserver(true);

      setIsLoading(false);
    },
    [page],
  );

  // 검색 옵션이 변경되면 페이지 0으로 초기화
  useEffect(() => {
    // 검색 결과 박스 가시성 관리
    if (keyword.length) {
      setHasKeyword(true);
    } else {
      setHasKeyword(false);
    }

    return () => {
      initDatas();
      setObserver(true);
      setPage(0);
    };
  }, [themes, regions, keyword]);

  // getItems가 바뀔 때마다 함수 실행
  useEffect(() => {
    if (observer || page === 0) {
      const options = { keyword, themes, regions };
      getItems(options);
    }
  }, [page, keyword, themes, regions]);

  // 사용자가 옵저버를 보고 있고, 로딩 중이 아니라면 페이지 증가
  useEffect(() => {
    if (inView && !isLoading) {
      if (journeyList.length) {
        setPage((prev) => prev + 1);
      }
    }
  }, [inView]);

  useEffect(() => {
    console.log(journeyList);
  }, [journeyList]);

  // clean-up
  useEffect(
    () => () => {
      setPage(0);
      initSearchOptions();
      initDatas();
    },
    [],
  );

  return (
    <Wrapper>
      {hasKeyword && (
        <KeywordContainer>
          <span>{keyword}</span>
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
