import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react';

const PlaceInfoValueContext = createContext();
const PlaceInfoActionsContext = createContext();

const InitialPlaceInfo = {
  latitude: '',
  longitude: '',
  title: '',
  text: '',
  placeCategory: '',
  addressName: '',
  region1: '',
  region2: '',
  region3: '',
  region4: '',
  placeTime: new Date(),
  placeName: '',
  images: [],
  imageTakenLocations: [],
  journeyId: 1,
};

function PlaceInfoProvider({ children }) {
  const [placeInfo, setPlaceInfo] = useState(InitialPlaceInfo);

  const actions = useMemo(
    () => ({
      updateData(key, value) {
        setPlaceInfo((prev) => ({ ...prev, [key]: value }));
      },
      updateMultiData(keyList, valueList) {
        setPlaceInfo((prev) => {
          let newPlaceInfo = { ...prev };
          keyList.forEach((element, index) => {
            newPlaceInfo = {
              ...newPlaceInfo,
              [element]: valueList[index],
            };
          });
          return newPlaceInfo;
        });
      },
    }),
    [],
  );

  return (
    <PlaceInfoActionsContext.Provider value={actions}>
      <PlaceInfoValueContext.Provider value={placeInfo}>
        {children}
      </PlaceInfoValueContext.Provider>
    </PlaceInfoActionsContext.Provider>
  );
}

const usePlaceInfoValue = () => {
  const value = useContext(PlaceInfoValueContext);
  if (value === undefined) {
    throw new Error(
      'usePlaceInfoValue should be used within PlaceInfoProvider',
    );
  }
  return value;
};

const usePlaceInfoActions = () => {
  const actions = useContext(PlaceInfoActionsContext);
  if (actions === undefined) {
    throw new Error(
      'usePlaceInfoActions should be used within PlaceInfoProvider',
    );
  }
  return actions;
};

export { usePlaceInfoValue, usePlaceInfoActions };
export default PlaceInfoProvider;
