import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import JourneyDetails from './JourneyDetails';
import JourneyMap from './JourneyMap';
import { baseAxios } from '../../lib/utills/customAxios';
import { useAuthValue, useAuthActions } from '../../contexts/auth';
import { getAccessToken } from '../../lib/utills/controlAccessToken';
import PlaceCategoryPicker from './PlaceCategoryPicker';
import { useTargetPlaceInfoActions } from '../../contexts/TargetPlaceInfoContext';
import PlaceAddButton from './PlaceAddButton';

const JourneyHolder = styled.div`
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
  const [targetPlacesData, setTargetPlacesData] = useState([]);
  const [focusedPlace, setFocusedPlace] = useState('');
  const [hoverPlace, setHoverPlace] = useState('');
  const [categorySelected, setCategorySelected] = useState([]);
  const [nickName, setNickName] = useState('');
  const [editPossible, setEditPossible] = useState(false);
  const params = useParams();
  const userInfo = useAuthValue();
  const { authenticateUser } = useAuthActions();
  const { updateTargetPlaceData } = useTargetPlaceInfoActions();

  // 서버로부터 데이터를 전송받아 totalPlacesData 값을 갱신해줌
  useEffect(() => {
    // access token을 가져와 userInfo를 갱신함
    const accessToken = getAccessToken();
    authenticateUser(accessToken);
    // 서버로부터 데이터를 받아옴
    const url = `place/list?journeyId=${params.journeyId}`;
    baseAxios.get(url)
      .then(({ data }) => {
        setTotalPlacesData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // 서버로부터 데이터가 들어왔을 때, 먼저 TargetPlaces data에 전부 넣어줌
  useEffect(() => {
    if (totalPlacesData?.length !== 0) {
      setTargetPlacesData(totalPlacesData);
    }
  }, [totalPlacesData]);
  // 카테고리에 따라, totalPlacesData에서 targetPlaces data를 찾아줌
  useEffect(() => {
    if (categorySelected.length === 0) {
      if (totalPlacesData.length !== 0) {
        setTargetPlacesData(totalPlacesData);
      }
    } else {
      const newTarget = totalPlacesData?.filter((place) => {
        if (categorySelected.includes(place.placeCategory)) {
          return true;
        }
        return false;
      });
      setTargetPlacesData(newTarget);
    }
  }, [categorySelected.length]);
  // targetPlaces data가 변할 때마다 이를 context에 넣어줌
  useEffect(() => {
    updateTargetPlaceData(targetPlacesData);
  }, [targetPlacesData.length]);
  // nickName이 일치할 때에만 여정 및 장소 조작 버튼을 활성화시켜줌
  useEffect(() => {
    if (userInfo !== '' && nickName !== '') {
      if (userInfo?.nickName === nickName) {
        setEditPossible(true);
      }
    }
  }, [userInfo, nickName]);

  return (
    <JourneyHolder>
      <PlaceCategoryPicker
        controlCategorySelected={[categorySelected, setCategorySelected]}
      />
      <JourneyMap
        setFocus={setFocusedPlace}
        hoverPlace={hoverPlace}
      />
      <JourneyDetails
        focusedPlace={focusedPlace}
        hover={[hoverPlace, setHoverPlace]}
        journeyId={params.journeyId}
        controlNickName={[nickName, setNickName]}
        edit={editPossible}
      />
      {editPossible && (
        <PlaceAddButton
          possibleAddNumber={totalPlacesData.length}
          journeyId={params.journeyId}
        />
      )}
    </JourneyHolder>
  );
}
