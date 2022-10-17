import React, {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
} from 'react';

const JourneysValueContext = createContext();
const JourneysActionsContext = createContext();

function JourneysProvider({ children }) {
  const emailRef = useRef(2);
  const [journeys, setJourneys] = useState([
    {
      memberEmail: 1,
      title: 'testTitle',
      startDay: '2022-10-16',
      endDay: '2022-10-17',
      peopleCount: 0,
      disclosure: 'public',
      placeThumbnailUrl: 'testPlaceThumbnailUrl',
      introductionText: 'testIntroductionText',
      journeyThemes: ['힐링', '식도락'],
    },
  ]);

  const actions = useMemo(
    () => ({
      add(journey) {
        const memberEmail = emailRef.current;
        emailRef.current += 1;
        setJourneys((prev) => [
          ...prev,
          {
            memberEmail,
            journey,
          },
        ]);
      },
    }),
    [],
  );

  return (
    <JourneysActionsContext.Provider value={actions}>
      <JourneysValueContext.Provider value={journeys}>
        {children}
      </JourneysValueContext.Provider>
    </JourneysActionsContext.Provider>
  );
}

const useJourneysValue = () => {
  const value = useContext(JourneysValueContext);
  if (value === undefined) {
    throw new Error('useJourneyValue should be used within JourneysProvider');
  }
  return value;
};

const useJourneysActions = () => {
  const value = useContext(JourneysActionsContext);
  if (value === undefined) {
    throw new Error(
      'useJourneysActions should be used within JourneysProvider',
    );
  }
  return value;
};

export { useJourneysValue, useJourneysActions };
export default JourneysProvider;
