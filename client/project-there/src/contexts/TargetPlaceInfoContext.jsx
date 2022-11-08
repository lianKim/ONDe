import React, { createContext, useContext, useMemo, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAxios, baseAxios } from '../lib/utills/customAxios';

const TargetPlaceInfoValueContext = createContext();
const TargetPlaceInfoActionsContext = createContext();

function TargetPlaceInfoProvider({ children }) {
  const [targetPlacesData, setTargetPlacesData] = useState([]);
  const navigation = useNavigate();

  const actions = useMemo(() => ({
    updateTargetPlaceData(targetList) {
      setTargetPlacesData(targetList);
    },
  }), []);

  return (
    <TargetPlaceInfoActionsContext.Provider value={actions}>
      <TargetPlaceInfoValueContext.Provider value={targetPlacesData}>
        {children}
      </TargetPlaceInfoValueContext.Provider>
    </TargetPlaceInfoActionsContext.Provider>
  );
}

const useTargetPlaceInfoValue = () => {
  const value = useContext(TargetPlaceInfoValueContext);
  if (value === undefined) {
    throw new Error(
      'useTargetPlaceInfoValue should be used within TargetPlaceInfoProvider',
    );
  }
  return value;
};

const useTargetPlaceInfoActions = () => {
  const actions = useContext(TargetPlaceInfoActionsContext);
  if (actions === undefined) {
    throw new Error(
      'useTargetPlaceInfoActions should be used within TargetPlaceInfoProvider',
    );
  }
  return actions;
};

export { useTargetPlaceInfoValue, useTargetPlaceInfoActions };
export default TargetPlaceInfoProvider;
