import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import JourneyDetailInfo from './JourneyDetailInfo';
import JourneyMap from './JourneyMap';
import { useAuthActions, useAuthValue } from '../../contexts/AuthContext';
import { getAccessToken } from '../../lib/utills/controlAccessToken';
import PlaceCategoryPicker from './PlaceCategoryPicker';
import PlaceAddButton from './PlaceAddButton';
import {
  getTotalPlaceListFromServer,
  deletePlaceFromServer,
} from '../../lib/hooks/useJourneyDetail';
import {
  useTotalPlaceInfoActions,
  useTotalPlaceInfoValue,
} from '../../contexts/TotalPlaceInfoContext';

const StyledJourneyHolder = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  border: 1px solid black;
  display: flex;
  align-items: center;
  min-width: 1200px;
  font-family: 'Poppins','Noto Sans KR',sans-serif !important;
`;

export default function JourneyDetailPage() {
  const [focusedPlace, setFocusedPlace] = useState('');
  const [hoverPlace, setHoverPlace] = useState('');
  const [editPossible, setEditPossible] = useState(false);
  const params = useParams();
  const { authenticateUser } = useAuthActions();
  const { updateTotalPlaceData } = useTotalPlaceInfoActions();
  const initialTotalPlaceListRef = useRef();
  const currentTotalPlaceListRef = useRef();
  const [initialTotalPlaceList, setInitialTotalPlaceList] = useState([]);
  const totalPlaceList = useTotalPlaceInfoValue();

  useEffect(() => {
    // 사용자 정보 갱신
    // 전체 데이터를 불러와 TotalPlaceInfoContext의 값을 갱신해줌
    const accessToken = getAccessToken();
    authenticateUser(accessToken);

    const placeListParams = {
      journeyId: params.journeyId,
      updateTotalPlaceData,
      setInitialTotalPlaceList,
    };
    getTotalPlaceListFromServer(placeListParams);
    return () => {
      deletePlaceFromServer(
        initialTotalPlaceListRef.current,
        currentTotalPlaceListRef.current,
      );
    };
  }, []);

  useEffect(() => {
    // 초기 data가 들어왔을 경우, initialTotalPlaceListRef에 저장해줌
    initialTotalPlaceListRef.current = initialTotalPlaceList;
  }, [initialTotalPlaceList]);

  useEffect(() => {
    // 현재 totalPlaceList가 변경되었을 때, 이를 감지해줌
    currentTotalPlaceListRef.current = totalPlaceList;
  }, [totalPlaceList]);

  return (
    <StyledJourneyHolder>
      <PlaceCategoryPicker />
      <JourneyMap setFocus={setFocusedPlace} hoverPlace={hoverPlace} />
      <JourneyDetailInfo
        focusedPlace={focusedPlace}
        hover={[hoverPlace, setHoverPlace]}
        journeyId={params.journeyId}
        setEditPossible={setEditPossible}
        edit={editPossible}
      />
      {editPossible && <PlaceAddButton journeyId={params.journeyId} />}
    </StyledJourneyHolder>
  );
}
