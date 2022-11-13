import React, { createContext, useContext, useMemo, useState } from 'react';
import { getJourneyDetailAPI } from '../lib/apis/journey';

const JourneyDetailValueContext = createContext();
const JourneyDetailActionsContext = createContext();

const initialState = {
  journeyId: 0,
  memberId: '1',
  title: '',
  startDate: '',
  endDate: '',
  numberOfPeople: 0,
  disclosure: '',
  journeyThumbnailUrl: '',
  introductionText: '',
  journeyThemes: [],
  region: '',
};

function JourneyDetailProvider({ children }) {
  const [journey, setJourney] = useState(initialState);
  const actions = useMemo(() => ({
    async getItem(jounreyId) {
      if (!jounreyId) return alert('journey id가 없습니다.');

      const data = await getJourneyDetailAPI(jounreyId);
      setJourney(data);
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
