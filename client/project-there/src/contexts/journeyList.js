import axios from 'axios';
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { SERVER_BASE_URL } from '../lib/constants/serverBaseUrl';

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
    loadJourneyItems(params, page) {
      const url = `${SERVER_BASE_URL}/journey/filtered-list?page=${page}&size=3`;
      const options = { ...params };

      Object.entries(options).forEach(([key, value]) => {
        if (!value.length) options[key] = '';
        else if (Array.isArray(value)) options[key] = options[key].join(',');
      });

      axios
        .get(url, { params: options })
        .then(({ data }) => {
          if (!data?.content?.length) return false;

          setJourneyList((prev) => [...prev, ...data.content]);
          return true;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 페이징 기능 추가 필요
    loadMyJourneyItems(memberId, page) {
      const url = `${SERVER_BASE_URL}/journey/my-list?memberId=${memberId}&size=3&page=${page}`;

      axios
        .get(url)
        .then(({ data }) => {
          if (!data?.content?.length) return false;

          setJourneyList((prev) => [...prev, ...data.content]);
          return true;
        })
        .catch((err) => console.error(err));
    },

    // 페이징 기능 추가 필요
    loadBookmarkedItems(memberId, page) {
      const url = `${SERVER_BASE_URL}/bookmark?memberId=${memberId}&size=3&page=${page}`;

      axios
        .get(url)
        .then(({ data }) => {
          if (!data?.content?.length) return false;

          setJourneyList((prev) => [...prev, ...data.content]);
          return true;
        })
        .catch((err) => console.error(err));
    },

    // 여정 목록 초기화
    initDatas() {
      setJourneyList([]);
    },

    updateSearchOptions(name, value) {
      setSearchOptions((prev) => ({ ...prev, [name]: value }));
    },

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
