import React, { createContext, useContext, useMemo, useState } from 'react';

const TotalPlaceInfoValueContext = createContext();
const TotalPlaceInfoActionsContext = createContext();

function TotalPlaceInfoProvider({ children }) {
  const [totalPlacesData, setTotalPlacesData] = useState([]);

  const actions = useMemo(() => ({
    updateTotalPlaceData(totalList) {
      setTotalPlacesData(totalList);
    },
  }), []);

  return (
    <TotalPlaceInfoActionsContext.Provider value={actions}>
      <TotalPlaceInfoValueContext.Provider value={totalPlacesData}>
        {children}
      </TotalPlaceInfoValueContext.Provider>
    </TotalPlaceInfoActionsContext.Provider>
  );
}

const useTotalPlaceInfoValue = () => {
  const value = useContext(TotalPlaceInfoValueContext);
  if (value === undefined) {
    throw new Error(
      'useTotalPlaceInfoValue should be used within TotalPlaceInfoProvider',
    );
  }
  return value;
};

const useTotalPlaceInfoActions = () => {
  const actions = useContext(TotalPlaceInfoActionsContext);
  if (actions === undefined) {
    throw new Error(
      'useTotalPlaceInfoActions should be used within TotalPlaceInfoProvider',
    );
  }
  return actions;
};

export { useTotalPlaceInfoValue, useTotalPlaceInfoActions };
export default TotalPlaceInfoProvider;
