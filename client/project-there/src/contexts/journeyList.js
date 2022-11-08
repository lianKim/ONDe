import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { authAxios, baseAxios } from '../lib/utills/customAxios';

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
    async loadJourneyItems(options, page = 0) {
      const params = { ...options };
      Object.entries(params).forEach(([key, value]) => {
        if (!value.length) params[key] = '';
        else if (Array.isArray(value)) params[key] = params[key].join(',');
      });

      try {
        const { data } = await baseAxios.get(
          `/journey/filtered-list?page=${page}&size=6`,
          { params },
        );
        console.log(data);

        if (data?.content?.length) {
          setJourneyList((prev) => [...prev, ...data.content]);
        }

        return data.last;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    // 나의 여정 목록 조회
    async loadMyJourneyItems(memberId, page) {
      try {
        const { data } = await authAxios.get(
          `/journey/my-list?memberId=${memberId}&size=6&page=${page}`,
        );
        console.log(data);

        if (data?.content?.length) {
          setJourneyList((prev) => [...prev, ...data.content]);
        }

        return data.last;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    // 다른 사람의 여정 목록 조회 (닉네임 클릭 접근)
    async loadOthersJourneyItems(nickName, page) {
      try {
        const { data } = await authAxios.get(
          `/journey/my-list?nickName=${nickName}&size=6&page=${page}`,
        );
        console.log(data);

        if (data?.content?.length) {
          setJourneyList((prev) => [...prev, ...data.content]);
        }

        return data.last;
      } catch (err) {
        console.log(err.response.data);
      }
    },

    // 북마크 여정 목록 조회 (페이징 기능 추가 필요)
    loadBookmarkedItems(memberId, page = 0) {
      authAxios
        .get(`/bookmark?size=3&page=${page}`)
        .then(({ data }) => {
          console.log(data);

          if (!data.content) return false;

          setJourneyList((prev) => [...prev, ...data.content]);
          return true;
        })
        .catch((err) => console.error(err));
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
