import axios from 'axios';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { addDatas } from '../lib/utills';

const NewJourneyValueContext = createContext();
const NewJourneyActionsContext = createContext();

const initialState = {
  memberId: 'memberId',
  title: '',
  startDate: '',
  endDate: '',
  numberOfPeople: 1,
  disclosure: 'public',
  thumbnail: {},
  introductionText: '',
  journeyThemes: [],
  region: '',
};

function NewJourneyProvider({ children }) {
  const [journeyInfo, setJourneyInfo] = useState(initialState);

  const actions = useMemo(
    () => ({
      updateData(name, value) {
        setJourneyInfo((prev) => ({ ...prev, [name]: value }));
      },

      addNewJourney(newJourney) {
        console.log(newJourney);
        addDatas(newJourney, 'http://localhost:8080/journey');
      },

      updateJourneyInfo(newJourney) {
        console.log(newJourney);

        const url = 'http://localhost:8080/journey';

        axios
          .put(url)
          .then((res) => console.log(res))
          .catch((err) => console.error(err));
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
