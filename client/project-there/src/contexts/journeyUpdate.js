import axios from 'axios';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { addDatas } from '../lib/utills';

const JourneyUpdateValueContext = createContext();
const JourneyUpdateActionsContext = createContext();

const initialState = {
  journeyId: '1',
  memberEmail: '1',
  title: 'testTitle',
  startDate: '2022-10-16',
  endDate: '2022-10-17',
  numberOfPeople: 1,
  disclosure: 'public',
  thumbnail: {},
  introductionText: 'testIntroductionText',
  journeyThemes: ['힐링', '식도락'],
  region: '',
};

function JourneyUpdateProvider({ children }) {
  const [journeyPrevInfo, setJourneyPrevInfo] = useState(initialState);

  const actions = useMemo(
    () => ({
      setDatas(prevInfo) {
        setJourneyPrevInfo(prevInfo);
      },

      updateData(name, value) {
        setJourneyPrevInfo((prev) => ({ ...prev, [name]: value }));
      },

      updateJourneyInfo(newJourney) {
        console.log(newJourney);

        const url = '';
        const params = { journeyId: newJourney.journeyId };

        axios
          .put('url', { params })
          .then((res) => {
            console.log(res);
            // 다시 이 게시글 id의 정보를 get 요청해서
            // 이 게시글로 이동하기 useNavigate('/journey/${journeyId}')
          })
          .catch((err) => console.error(err));
      },

      initDatas(newDatas = initialState) {
        setJourneyPrevInfo(newDatas);
      },
    }),
    [],
  );

  return (
    <JourneyUpdateActionsContext.Provider value={actions}>
      <JourneyUpdateValueContext.Provider value={journeyPrevInfo}>
        {children}
      </JourneyUpdateValueContext.Provider>
    </JourneyUpdateActionsContext.Provider>
  );
}

const useJourneyUpdateValue = () => {
  const value = useContext(JourneyUpdateValueContext);
  if (value === undefined) {
    throw new Error(
      'useJourneyUpdateValue should be used within JourneysProvider',
    );
  }
  return value;
};

const useJourneyUpdateActions = () => {
  const value = useContext(JourneyUpdateActionsContext);
  if (value === undefined) {
    throw new Error(
      'useJourneyUpdateActions should be used within JourneysProvider',
    );
  }
  return value;
};

export { useJourneyUpdateValue, useJourneyUpdateActions };
export default JourneyUpdateProvider;
