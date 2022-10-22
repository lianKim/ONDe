import axios from 'axios';
import React, { createContext, useContext, useMemo, useState } from 'react';

const JourneyListValueContext = createContext();
const JourneyListActionsContext = createContext();

const initialState = [
  {
    journeyId: 1,
    memberId: 'test',
    title: 'testTitle',
    startDate: '2022-10-16',
    endDate: '2022-10-17',
    numberOfPeople: 7,
    disclosure: 'public',
    journeyThemes: ['힐링', '식도락'],
    region: '대구',
    introductionText: 'testIntroductionText',
    journeyThumbnailUrl: '',
  },
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
