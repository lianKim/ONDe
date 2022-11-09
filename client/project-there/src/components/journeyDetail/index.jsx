import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import JourneyDetailInfo from './JourneyDetailInfo';
import JourneyMap from './JourneyMap';
import { useAuthActions } from '../../contexts/auth';
import { getAccessToken } from '../../lib/utills/controlAccessToken';
import PlaceCategoryPicker from './PlaceCategoryPicker';
import PlaceAddButton from './PlaceAddButton';
import { getTotalPlaceListFromServer } from '../../lib/hooks/useJourneyDetail';
import { useTotalPlaceInfoActions } from '../../contexts/TotalPlaceInfoContext';

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
  const [focusedPlace, setFocusedPlace] = useState('');
  const [hoverPlace, setHoverPlace] = useState('');
  const [editPossible, setEditPossible] = useState(false);
  const params = useParams();
  const { authenticateUser } = useAuthActions();
  const { updateTotalPlaceData } = useTotalPlaceInfoActions();

  useEffect(() => {
    // 사용자 정보 갱신
    // 전체 데이터를 불러와 TotalPlaceInfoContext의 값을 갱신해줌
    const accessToken = getAccessToken();
    authenticateUser(accessToken);
    getTotalPlaceListFromServer(params.journeyId, updateTotalPlaceData);
  }, []);

  return (
    <StyledJourneyHolder>
      <PlaceCategoryPicker />
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
      />
      {editPossible && (
        <PlaceAddButton
          journeyId={params.journeyId}
        />
      )}
    </StyledJourneyHolder>
  );
}
