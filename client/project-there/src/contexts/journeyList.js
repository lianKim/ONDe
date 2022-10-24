import axios from 'axios';
import React, { createContext, useContext, useMemo, useState } from 'react';

const JourneyListValueContext = createContext();
const JourneyListActionsContext = createContext();

const initialState = [
  // {
  //   journeyId: 1,
  //   memberId: 'user1',
  //   title: '서울 여행 후기',
  //   startDate: '2021-01-16',
  //   endDate: '2021-01-17',
  //   numberOfPeople: 2,
  //   disclosure: 'public',
  //   journeyThemes: ['문화'],
  //   region: '서울',
  //   introductionText: '이것도 보고 저것도 보고',
  //   journeyThumbnailUrl: '',
  // },
  // {
  //   journeyId: 2,
  //   memberId: 'user2',
  //   title: '전남 스푸파',
  //   startDate: '2022-10-16',
  //   endDate: '2022-10-17',
  //   numberOfPeople: 7,
  //   disclosure: 'public',
  //   journeyThemes: ['식도락'],
  //   region: '전남',
  //   introductionText: '스트릿 푸드 파이터',
  //   journeyThumbnailUrl: '',
  // },
  // {
  //   journeyId: 3,
  //   memberId: 'user3',
  //   title: '강아지와 함께 제주 여행',
  //   startDate: '2022-10-16',
  //   endDate: '2022-10-17',
  //   numberOfPeople: 1,
  //   disclosure: 'public',
  //   journeyThemes: ['힐링', '반려동물'],
  //   region: '제주',
  //   introductionText: '쉽지 않다 쉽지 않아',
  //   journeyThumbnailUrl: '',
  // },
  // {
  //   journeyId: 4,
  //   memberId: 'user4',
  //   title: '서울 여행 후기',
  //   startDate: '2021-01-16',
  //   endDate: '2021-01-17',
  //   numberOfPeople: 2,
  //   disclosure: 'public',
  //   journeyThemes: ['문화'],
  //   region: '서울',
  //   introductionText: '이것도 보고 저것도 보고',
  //   journeyThumbnailUrl: '',
  // },
  // {
  //   journeyId: 5,
  //   memberId: 'user5',
  //   title: '전남 스푸파',
  //   startDate: '2022-10-16',
  //   endDate: '2022-10-17',
  //   numberOfPeople: 7,
  //   disclosure: 'public',
  //   journeyThemes: ['식도락'],
  //   region: '전남',
  //   introductionText: '스트릿 푸드 파이터',
  //   journeyThumbnailUrl: '',
  // },
  // {
  //   journeyId: 6,
  //   memberId: 'user6',
  //   title: '강아지와 함께 제주 여행',
  //   startDate: '2022-10-16',
  //   endDate: '2022-10-17',
  //   numberOfPeople: 1,
  //   disclosure: 'public',
  //   journeyThemes: ['힐링', '반려동물'],
  //   region: '제주',
  //   introductionText: '쉽지 않다 쉽지 않아',
  //   journeyThumbnailUrl: '',
  // },
];

function JourneyListProvider({ children }) {
  const [journeyList, setJourneyList] = useState(initialState);

  const actions = useMemo(() => ({
    loadDatas(page = 1) {
      // const url = `http:/localhost:8080/journey/list?page=${page}`;
      const url = 'http://localhost:8080/journey/list';
      const params = {};

      axios
        .get(url, { params })
        .then(({ data }) => {
          console.log(data);
          setJourneyList((prev) => [...prev, ...data]);
        })
        .catch((err) => console.error(err));
    },

    findData(name, value) {
      const journey = journeyList.find(
        (item) => String(item[name]) === String(value),
      );
      return journey;
    },
  }));

  return (
    <JourneyListActionsContext.Provider value={actions}>
      <JourneyListValueContext.Provider value={journeyList}>
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
