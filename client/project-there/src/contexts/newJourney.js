import axios from 'axios';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { addDatas } from '../lib/utills';

const NewJourneyValueContext = createContext();
const NewJourneyActionsContext = createContext();

const initialState = {
  memberEmail: 'memberId',
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
        addDatas(newJourney, 'http://localhost:8080/journey');
      },

      updateJourneyInfo(newJourney) {
        const formData = new FormData();
        const value = { ...newJourney };
        delete value.journeyThumbnailUrl;

        value.memberEmail = value.memberId;
        delete value.memberId;

        const url = 'http://localhost:8080/journey';

        if (value.thumbnail) {
          formData.append('thumbnail', value.thumbnail[0]);
        }
        delete value.thumbnail;

        const blob = new Blob([JSON.stringify(value)], {
          type: 'application/json',
        });
        formData.append('request', blob);

        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        axios
          .patch(url, formData, config)
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
