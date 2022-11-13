import React, { createContext, useContext, useMemo, useState } from 'react';
import {
  getFilteredJourneyListAPI,
  getJourneyListAPI,
} from '../lib/apis/journey';

const JourneyListValueContext = createContext();
const JourneyListActionsContext = createContext();

const initialState = [];

function JourneyListProvider({ children }) {
  const [journeyList, setJourneyList] = useState(initialState);
  const [searchOptions, setSearchOptions] = useState({
    keyword: '',
    themes: '',
    regions: '',
  });

  const values = useMemo(
    () => [journeyList, searchOptions],
    [
      journeyList.length,
      searchOptions.keyword,
      searchOptions.regions,
      searchOptions.themes,
    ],
  );

  const actions = useMemo(() => ({
    // 메인 페이지 여정 목록 조회 (필터링 기능)
    async loadJourneyItems(page, options) {
      const { content, isLast } = await getFilteredJourneyListAPI(
        `/journey/filtered-list?page=${page}&size=6`,
        options,
      );
      if (content?.length) {
        setJourneyList((prev) => [...prev, ...content]);
      }
      return isLast;
    },

    // 나의 여정 목록 조회
    async loadMyJourneyItems(page) {
      const { content, isLast } = await getJourneyListAPI(
        `/journey/my-list?page=${page}&size=6`,
      );
      if (content?.length) {
        setJourneyList((prev) => [...prev, ...content]);
      }
      return isLast;
    },

    // 다른 사람의 여정 목록 조회 (닉네임 클릭 접근)
    async loadOthersJourneyItems(page, nickName) {
      const { content, isLast } = await getJourneyListAPI(
        `/journey/nickName-list?nickName=${nickName}&page=${page}&size=6`,
      );
      if (content?.length) {
        setJourneyList((prev) => [...prev, ...content]);
      }
      return isLast;
    },

    // 북마크 여정 목록 조회
    async loadBookmarkedItems(page) {
      const { content, isLast } = await getJourneyListAPI(
        `/bookmark?page=${page}&size=6`,
      );
      if (content?.length) {
        setJourneyList((prev) => [...prev, ...content]);
      }
      return isLast;
    },

    // 여정 목록 초기화
    initDatas() {
      setJourneyList([]);
    },

    // 검색 옵션 업데이트
    updateSearchOptions(name, value) {
      setSearchOptions((prev) => ({ ...prev, [name]: value }));
    },

    // 검색 옵션 초기화
    initSearchOptions() {
      setSearchOptions({ keyword: '', themes: '', regions: '' });
    },
  }));

  return (
    <JourneyListActionsContext.Provider value={actions}>
      <JourneyListValueContext.Provider value={values}>
        {children}
      </JourneyListValueContext.Provider>
    </JourneyListActionsContext.Provider>
  );
}

const useJourneyListValue = () => {
  const value = useContext(JourneyListValueContext);
  if (value === undefined) {
    throw new Error(
      'useJourneyListValue should be used within JourneysProvider',
    );
  }
  return value;
};

const useJourneyListActions = () => {
  const value = useContext(JourneyListActionsContext);
  if (value === undefined) {
    throw new Error(
      'useJourneyListActions should be used within JourneysProvider',
    );
  }
  return value;
};

export { useJourneyListValue, useJourneyListActions };
export default JourneyListProvider;
