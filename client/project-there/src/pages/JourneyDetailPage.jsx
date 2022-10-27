import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import JourneyDetails from '../components/journeyDetail/JourneyDetails';
import JourneyMap from '../components/journeyDetail/JourneyMap';
import { placeData } from '../datas/placeData';
import Places from '../contexts/Places';
import CategoryItemButton from '../components/journeyDetail/CategoryItemButton';

const JourneyHolder = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  border: 1px solid black;
  display: flex;
  align-items: center;
`;
const ButtonHolder = styled.button`
  position:absolute;
  z-index: 12;
  right: 30px;
  bottom: 30px;
  background-color: var(--color-green100);
  height: 39px;
`;
const CategoryDisplayButton = styled.button`
  background-color: var(--color-gray300);
  color: var(--color-green100);
  position:absolute;
  z-index: 12;
  top: 55px;
  font-size: var(--font-regular);
  width: 20%;
  border-radius: 0 0 30px 0;
  border-color: var(--color-gray300);
  display: flex;
  flex-direction: column;
`;
const CategoryList = styled.div`
  width: 100%;
  height: 140px;
  border-top: 1px solid var(--color-green100);
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  padding: 10px;
`;
const categoryOptions = [
  '자연',
  '숙박',
  '음식점',
  '레저',
  '테마파크',
  '쇼핑',
  '유적지',
  '박물관',
  '공연',
  '전시회',
  '캠핑',
  '키즈',
  '기타',
];
function PlaceInfoProvider({ children, value }) {
  return <Places.Provider value={value}>{children}</Places.Provider>;
}
export default function JourneyDetailPage() {
  const [totalPlacesData, setTotalPlacesData] = useState();
  const [targetPlacesData, setTargetPlacesData] = useState([]);
  const [focusedPlace, setFocusedPlace] = useState('');
  const [hoverPlace, setHoverPlace] = useState('');
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categorySelected, setCategorySelected] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/placeupload/${params.journeyId}`);
  };

  const handleCategoryButtonClick = () => {
    setCategoryOpen((res) => (!res));
  };

  useEffect(() => {
    const url = `http://localhost:8080/place/list?journeyId=${params.journeyId}`;
    axios.get(url)
      .then((res) => {
        console.log(res);
        setTotalPlacesData(res);
      })
      .catch((err) => { console.log(err); });
  }, []);

  useEffect(() => {
    setTotalPlacesData(placeData);
  }, []);

  useEffect(() => {
    console.log(categorySelected);
    if (categorySelected.length === 0) {
      if (totalPlacesData) {
        setTargetPlacesData(totalPlacesData.content);
      }
    } else {
      const { content } = totalPlacesData;
      const newTarget = content?.filter((place) => {
        if (categorySelected.includes(place.placeCategory)) {
          return true;
        }
        return false;
      });
      setTargetPlacesData(() => newTarget);
    }
  }, [categorySelected.length]);

  useEffect(() => {
    if (totalPlacesData) {
      setTargetPlacesData(totalPlacesData.content);
    }
  }, [totalPlacesData]);

  useEffect(() => {
    console.log(targetPlacesData);
  }, [targetPlacesData.length]);

  return (
    <div>
      <JourneyHolder>
        <PlaceInfoProvider value={targetPlacesData}>
          <CategoryDisplayButton
            onClick={handleCategoryButtonClick}
          >
            Category
            {categoryOpen && (
            <CategoryList>
              {categoryOptions?.map((category) => (
                <CategoryItemButton
                  key={category}
                  category={category}
                  setSelected={[categorySelected, setCategorySelected]}
                />
              ))}
            </CategoryList>
            )}
          </CategoryDisplayButton>
          <JourneyMap
            setFocus={setFocusedPlace}
            hoverPlace={hoverPlace}
          />
          <JourneyDetails
            focusedPlace={focusedPlace}
            hover={[hoverPlace, setHoverPlace]}
            journeyId={params.journeyId}
          />
        </PlaceInfoProvider>
        <ButtonHolder
          type="button"
          onClick={handleButtonClick}
        >
          장소 추가하기
        </ButtonHolder>
      </JourneyHolder>
    </div>
  );
}
