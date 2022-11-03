import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import { usePlaceInfoValue, usePlaceInfoActions } from '../../../contexts/PlaceInfoContext';
import PlaceEventMarkerContainer from './PlaceEventMarkerContainer';
import PlaceSearchResultList from './PlaceSearchResultList';
import PlaceSelectButton from './PlaceSelectButton';
import PlaceCancleButton from './PlaceCancleButton';
import
{ coord2AddressSearch,
  addressToPlaceNameSearch,
  filterSearchPlaceList,
  makePlaceInfoLocation,
} from './placeSearchActions';

const LocationHolder = styled.div`
  width: 80%;
  height: 10%;
  display:flex;
  align-items: center;
  color: var(--color-gray500);
  margin-left: 2%;
  font-size: var(--font-small);
  .displayButton{
    margin-left: 60px;
    color: var(--color-green100);
    border: 0.5px solid var(--color-green100);
    padding: 0.5em 1em;
  };
  .modalBackground{
    position : fixed;
    top :0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.7);
    z-index:10;
  }
`;
const MapHolder = styled.div`
  position: fixed;
  top : 10vh;
  left : 20vw;
  width: 60vw;
  height: 80vh;
  background-color: white;
  z-index: 12;
  display: flex;
`;

export default function PlaceLocationSelector() {
  const [mapOpen, setMapOpen] = useState(false);
  const [mapCreate, setMapCreate] = useState(false);
  const [points, setPoints] = useState([]);
  const [pointAddress, setPointAddress] = useState([]);
  const [pointPlaces, setPointPlaces] = useState([]);
  const mapRef = useRef();
  const [placeHover, setPlaceHover] = useState('');
  const [placeSelected, setPlaceSelected] = useState('');
  const [selectedInfo, setSelectedInfo] = useState([]);
  const placeInfo = usePlaceInfoValue();
  const { updateMultiData } = usePlaceInfoActions();

  // 업데이트로 값이 갱신되었을 때, placeSelected와 pointPlace 변경시켜줌
  useEffect(() => {
    if (placeInfo.placeName !== '') {
      setPlaceSelected(placeInfo.placeName);
      const { placeName, addressName, latitude, longitude } = placeInfo;
      setPointPlaces([[placeName, addressName, latitude, longitude]]);
    }
  }, [placeInfo.placeName]);

  // 이미지가 업로드 되었을 때, point를 갱신해줌
  useEffect(() => {
    if (placeInfo?.imageTakenLocations?.length !== 0) {
      setPoints(() => placeInfo.imageTakenLocations);
    }
  }, [placeInfo.imageTakenLocations]);

  // point가 변경되었을 때, 좌표 값들에 해당하는 주소들을 pointAddress에 넣어줌
  useEffect(() => {
    if (points.length !== 0) {
      Promise.all(points?.map((point) => coord2AddressSearch(point.lng, point.lat)))
        .then((results) => {
          const uniqueResult = Array.from(new Set(results));
          setPointAddress(uniqueResult);
        });
    }
  }, [points]);

  // pointAddress가 변경되었을 때, 그 주소에 해당되는 장소들을 받아줌
  useEffect(() => {
    if (pointAddress?.length !== 0) {
      Promise.all(pointAddress?.map((address) => addressToPlaceNameSearch(address)))
        .then((results) => {
          let newResult = results.flat(1);
          if (newResult.length === 0) {
            setPointPlaces([]);
          } else {
            newResult = filterSearchPlaceList(newResult);
            setPointPlaces(newResult);
          }
        });
    }
  }, [pointAddress]);

  // 장소 주소들이 변경되었을 때, bounds가 변경되면 bounds를 변경해줌
  const bounds = useMemo(() => {
    const newBounds = new window.kakao.maps.LatLngBounds();
    pointPlaces?.forEach((place) => {
      newBounds.extend(new window.kakao.maps.LatLng(place[2], place[3]));
    });
    return newBounds;
  }, [pointPlaces]);

  // map이 생성되었을 때, map의 bound를 결정해줌
  useEffect(() => {
    const map = mapRef.current;
    if (map && pointPlaces.length !== 0) {
      map.setBounds(bounds);
    }
  }, [bounds, mapCreate, pointPlaces]);

  // 선택된 장소를 selectedInfo에 갱신해줌
  useEffect(() => {
    pointPlaces?.forEach((place) => {
      if (place[0] === placeSelected) {
        setSelectedInfo(place);
      }
    });
    if (placeSelected === '') {
      setSelectedInfo([]);
    }
  }, [placeSelected]);

  // 선택된 장소의 정보를 context에 넣어줌
  useEffect(() => {
    if (selectedInfo.length !== 0 && !mapOpen) {
      const [keyList, valueList] = makePlaceInfoLocation(selectedInfo);
      updateMultiData(keyList, valueList);
    }
  }, [mapOpen]);

  return (
    <LocationHolder>
      {!mapOpen && (
        <div>
          위치
          <button
            type="button"
            onClick={() => { setMapOpen(true); }}
            className="displayButton"
          >
            {placeSelected === '' ? '선택' : placeSelected}
          </button>
        </div>
      )}
      {mapOpen && <div className="modalBackground" />}
      {mapOpen && (
        <MapHolder>
          <PlaceSearchResultList
            setPoint={{ pointPlaces, setPointPlaces }}
            setHover={{ placeHover, setPlaceHover }}
            setSelected={{ placeSelected, setPlaceSelected }}
            setPointAddress={setPointAddress}
          />
          <Map
            center={{
              // 지도의 중심좌표
              lat: 33.450701,
              lng: 126.570667,
            }}
            style={{
              // 지도의 크기
              width: '100%',
              height: '100%',
            }}
            level={3}
            ref={mapRef}
            onCreate={() => { setMapCreate(true); }}
          >
            {pointPlaces?.map((point) => {
              let hoverd = false;
              let selected = false;
              if (placeHover === point[0]) {
                hoverd = true;
              }
              if (placeSelected === point[0]) {
                selected = true;
              }
              return (
                <PlaceEventMarkerContainer
                  key={`${point[0]}-${point[2]}-${point[3]}`}
                  position={{
                    lat: point[2],
                    lng: point[3],
                  }}
                  content={point[0]}
                  hoverd={hoverd}
                  selected={selected}
                />
              );
            })}
          </Map>
          <PlaceSelectButton
            selected={placeSelected !== ''}
            setMapOpen={setMapOpen}
          />
          <PlaceCancleButton
            selected={placeSelected !== ''}
            setPlaceSelected={setPlaceSelected}
          />
        </MapHolder>
      )}
    </LocationHolder>
  );
}
