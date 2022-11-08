import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import JourneyDetails from './JourneyDetails';
import JourneyMap from './JourneyMap';
import { baseAxios } from '../../lib/utills/customAxios';
import { useAuthValue, useAuthActions } from '../../contexts/auth';
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
  const [nickName, setNickName] = useState('');
  const [editPossible, setEditPossible] = useState(false);
  const params = useParams();
  const userInfo = useAuthValue();
  const { authenticateUser } = useAuthActions();

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

  // nickName이 일치할 때에만 여정 및 장소 조작 버튼을 활성화시켜줌
  useEffect(() => {
    if (userInfo !== '' && nickName !== '') {
      if (userInfo?.nickName === nickName) {
        setEditPossible(true);
      }
    }
  }, [userInfo, nickName]);

  return (
    <StyledJourneyHolder>
      <PlaceCategoryPicker
        totalPlacesData={totalPlacesData}
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
    </StyledJourneyHolder>
  );
}
