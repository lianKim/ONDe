import React, { createContext, useContext, useMemo, useState } from 'react';
import { getJourneyDetailAPI, postJourneyAPI } from '../lib/apis/journey';

const NewJourneyValueContext = createContext();
const NewJourneyActionsContext = createContext();

const initialState = {
  memberId: '',
  title: '',
  startDate: '',
  endDate: '',
  numberOfPeople: 1,
  disclosure: 'public',
  thumbnail: null,
  introductionText: '',
  journeyThemes: [],
  region: '',
};

function NewJourneyProvider({ children }) {
  const [journeyInfo, setJourneyInfo] = useState(initialState);

  const actions = useMemo(
    () => ({
      async getItem(jounreyId) {
        if (!jounreyId) return alert('journey id가 없습니다.');

        const data = await getJourneyDetailAPI(jounreyId);
        setJourneyInfo(data);
      },

      updateData(name, value) {
        setJourneyInfo((prev) => ({ ...prev, [name]: value }));
      },

      async updateJourneyInfo(nextInfo) {
        const journeyId = await postJourneyAPI(nextInfo);
        return journeyId;
      },

      initDatas(newDatas = initialState) {
        setJourneyInfo({ ...newDatas });
      },
    }),
    [],
  );

  return (
    <NewJourneyActionsContext.Provider value={actions}>
      <NewJourneyValueContext.Provider value={journeyInfo}>
        {children}
      </NewJourneyValueContext.Provider>
    </NewJourneyActionsContext.Provider>
  );
}

const useNewJourneyValue = () => {
  const value = useContext(NewJourneyValueContext);
  if (value === undefined) {
    throw new Error(
      'useNewJourneyValue should be used within JourneysProvider',
    );
  }
  return value;
};

const useNewJourneyActions = () => {
  const value = useContext(NewJourneyActionsContext);
  if (value === undefined) {
    throw new Error(
      'useNewJourneyActions should be used within JourneysProvider',
    );
  }
  return value;
};

export { useNewJourneyValue, useNewJourneyActions };
export default NewJourneyProvider;
