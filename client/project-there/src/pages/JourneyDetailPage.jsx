import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
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
const PlaceUploadButton = styled.button`
  position: absolute;
  z-index: 12;
  right:20px;
  bottom: 20px;
  width: 10%;
  height: 5%;
`;

function PlaceInfoProvider({ children, value }) {
  return <Places.Provider value={value}>{children}</Places.Provider>;
}
export default function PlacesPage() {
  const [totalPlacesData, setTotalPlacesData] = useState();
  const [targetPlacesData, setTargetPlacesData] = useState([]);
  const [focusedPlace, setFocusedPlace] = useState('');
  const [hoverPlace, setHoverPlace] = useState('');
  const params = useParams();
  const navigate = useNavigate();

  const uploadPlace = () => {
    navigate(`/placeupload/${params.journeyId}`);
  };

  useEffect(() => {
    const { journeyId } = params;
    const url = `http://localhost:8080/place/list?journeyId=${journeyId}`;
    console.log(url);
    axios.get(url)
      .then((res) => {
        console.log(res);
        setTotalPlacesData(res);
      })
      .catch((err) => { console.log(err); });
  }, []);

  // useEffect(() => {
  //   setTotalPlacesData(placeData);
  // }, []);

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
      <PlaceUploadButton type="button" onClick={uploadPlace}>장소 추가하기</PlaceUploadButton>
    </JourneyHolder>
  );
}
