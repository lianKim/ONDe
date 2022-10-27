import axios from 'axios';
import React, { createContext, useContext, useMemo, useState } from 'react';

const JourneyDetailValueContext = createContext();
const JourneyDetailActionsContext = createContext();

const initialState = {
  journeyId: 1,
  memberId: '1',
  title: '대구에서 한 달 살기',
  startDate: '2022-10-01',
  endDate: '2022-10-30',
  numberOfPeople: 2,
  disclosure: 'public',
  journeyThumbnailUrl: '',
  introductionText: '여행 가고싶다',
  journeyThemes: ['반려동물', '힐링'],
  region: '대구',
};

function JourneyDetailProvider({ children }) {
  const [journey, setJourney] = useState(initialState);
  const actions = useMemo(() => ({
    getDatas(jounreyId) {
      if (!jounreyId) {
        throw new Error('journeyId does not exist');
      }
      const url = `http://localhost:8080/journey/detail?journeyId=${jounreyId}`;
      axios
        .get(url)
        .then(({ data }) => {
          console.log(data);
          setJourney({ ...data });
        })
        .catch((err) => console.error(err));
    },

    updateData(name, value) {
      setJourney((prev) => ({ ...prev, [name]: value }));
    },
  }));

  return (
    <JourneyDetailActionsContext.Provider value={actions}>
      <JourneyDetailValueContext.Provider value={journey}>
        {children}
      </JourneyDetailValueContext.Provider>
    </JourneyDetailActionsContext.Provider>
  );
}

const useJourneyDetailValue = () => {
  const value = useContext(JourneyDetailValueContext);
  if (value === undefined) {
    throw new Error(
      'useJourneyDetailValue should be used within JourneysProvider',
    );
  }
  return value;
};

const useJourneyDetailActions = () => {
  const value = useContext(JourneyDetailActionsContext);
  if (value === undefined) {
    throw new Error(
      'useJourneyDetailActions should be used within JourneysProvider',
    );
  }
  return value;
};

export { useJourneyDetailValue, useJourneyDetailActions };
export default JourneyDetailProvider;
