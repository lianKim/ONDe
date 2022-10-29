import axios from 'axios';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  thumbnail: [],
  introductionText: '',
  journeyThemes: [],
  region: '',
};

function NewJourneyProvider({ children }) {
  const [journeyInfo, setJourneyInfo] = useState(initialState);

  const navigate = useNavigate();

  const actions = useMemo(
    () => ({
      updateData(name, value) {
        setJourneyInfo((prev) => ({ ...prev, [name]: value }));
      },

      addNewJourney(newJourney) {
        const { journeyId } = addDatas(
          newJourney,
          'http://localhost:8080/journey',
        );
        if (journeyId) navigate(`/journey/${journeyId}`);
      },

      // 미선택 항목 여부 체크하는 함수
      hasEmptyValue(newJourney) {
        const datasArr = Object.entries(newJourney);
        for (let i = 0; i < datasArr.length; i += 1) {
          if (datasArr[i][1].length === 0) {
            alert(`${datasArr[i][0]}이(가) 입력되지 않았습니다.`);
            throw new Error(`${datasArr[i][0]} is NOT entered`);
          }
        }
      },

      updateJourneyInfo(newJourney) {
        const formData = new FormData();
        const value = { ...newJourney };
        delete value.journeyThumbnailUrl;
        console.log(newJourney);
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
