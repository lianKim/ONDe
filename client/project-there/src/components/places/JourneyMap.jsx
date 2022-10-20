import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Places from '../../contexts/Places';

const JourneyMapHolder = styled.div`
  width: 40%;
  height: 100%;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function JourneyMap() {
  const { placesData, setPlacesData } = useContext(Places);

  useEffect(() => {
    console.log(placesData);
  }, [placesData]);
  return (
    <JourneyMapHolder>
      지도를 보여주는 element
    </JourneyMapHolder>
  );
}
