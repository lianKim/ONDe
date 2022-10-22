import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import JourneyDetails from '../components/journeyDetail/JourneyDetails';
import JourneyMap from '../components/journeyDetail/JourneyMap';
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
  const [focusedPlace, setFocusedPlace] = useState('');
  const [hoverPlace, setHoverPlace] = useState('');
  const [submit, setSubmit] = useState(false);

  const handleClick = () => {
    setSubmit((pre) => !pre);
  };

  useEffect(() => {
    const url = 'http://localhost:8080/place/list?journeyId=1';
    axios.get(url)
      .then((res) => console.log(res))
      .catch((err) => { console.log(err); });
  }, []);

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
        <JourneyMap
          setFocus={setFocusedPlace}
          hoverPlace={hoverPlace}
        />
        <JourneyDetails
          focusedPlace={focusedPlace}
          hover={[hoverPlace, setHoverPlace]}
        />
      </PlaceInfoProvider>
    </JourneyHolder>
  );
}
