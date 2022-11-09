import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import JourneyDetailInfo from './JourneyDetailInfo';
import JourneyMap from './JourneyMap';
import { baseAxios, authAxios } from '../../lib/utills/customAxios';
import { useAuthActions } from '../../contexts/auth';
import { getAccessToken } from '../../lib/utills/controlAccessToken';
import PlaceCategoryPicker from './PlaceCategoryPicker';
import PlaceAddButton from './PlaceAddButton';

const StyledJourneyHolder = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  border: 1px solid black;
  display: flex;
  align-items: center;
  min-width: 1200px;
`;

export default function JourneyDetailPage() {
  const [totalPlacesData, setTotalPlacesData] = useState([]);
  const [focusedPlace, setFocusedPlace] = useState('');
  const [hoverPlace, setHoverPlace] = useState('');
  const [editPossible, setEditPossible] = useState(false);
  const params = useParams();
  const { authenticateUser } = useAuthActions();

  // 서버로부터 데이터를 전송받아 totalPlacesData 값을 갱신해줌
  useEffect(() => {
    // access token을 가져와 userInfo를 갱신함
    const accessToken = getAccessToken();
    authenticateUser(accessToken);
    // 서버로부터 데이터를 받아옴
    const url = `place/list?journeyId=${params.journeyId}`;
    const customAxios = accessToken ? authAxios : baseAxios;
    customAxios.get(url)
      .then(({ data }) => {
        setTotalPlacesData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <StyledJourneyHolder>
      <PlaceCategoryPicker
        totalPlacesData={totalPlacesData}
      />
      <JourneyMap
        setFocus={setFocusedPlace}
        hoverPlace={hoverPlace}
      />
      <JourneyDetailInfo
        focusedPlace={focusedPlace}
        hover={[hoverPlace, setHoverPlace]}
        journeyId={params.journeyId}
        setEditPossible={setEditPossible}
        edit={editPossible}
        setTotalPlacesData={setTotalPlacesData}
      />
      {editPossible && (
        <PlaceAddButton
          possibleAddNumber={totalPlacesData.length}
          journeyId={params.journeyId}
        />
      )}
    </StyledJourneyHolder>
  );
}
