import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import JourneyDetails from '../components/places/JourneyDetails';
import JourneyMap from '../components/places/JourneyMap';
import { placeData } from '../datas/placeData';
import Places from '../contexts/Places';

const JourneyHolder = styled.div`
  width: 96%;
  height: 80%;
  left: 2%;
  position: fixed;
  top: 15%;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;

function PlaceInfoProvider({ children, value }) {
  return <Places.Provider value={value}>{children}</Places.Provider>;
}
export default function PlacesPage() {
  const [totalPlacesData, setTotalPlacesData] = useState();
  const [targetPlacesData, setTargetPlacesData] = useState([]);
  useEffect(() => {
    setTotalPlacesData(placeData);
  }, []);

  useEffect(() => {
    if (totalPlacesData) {
      setTargetPlacesData(totalPlacesData.content);
    }
  }, [totalPlacesData]);

  return (
    <JourneyHolder>
      <PlaceInfoProvider value={targetPlacesData}>
        <JourneyMap />
        <JourneyDetails />
      </PlaceInfoProvider>
    </JourneyHolder>
  );
}
