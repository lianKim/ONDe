import React, {
  useState, useMemo, useRef, useEffect,
} from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

const LocationHolder = styled.div`
  width: 80%;
  height: 10%;
  background-color: #bdbebd;
  display:flex;
  justify-content: center;
  align-items: center;
`;
const ModalBackground = styled.div`
  position : fixed;
  top :0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.7);
  z-index:10;
`;
const MapHolder = styled.div`
  position: fixed;
  top : 10vh;
  left : 20vw;
  width: 60vw;
  height: 80vh;
  background-color: white;
  z-index: 12;
`;

export default function PlaceLocationSelector({ locationDatas }) {
  const [mapOpen, setMapOpen] = useState(false);
  const [mapCreate, setMapCreate] = useState(false);
  const [imageTakenPlaces, setPlaceLocation] = locationDatas;
  const [points, setPoints] = useState([]);
  const mapRef = useRef();

  const bounds = useMemo(() => {
    const newBounds = new window.kakao.maps.LatLngBounds();
    console.log(newBounds);
    points?.forEach((point) => {
      newBounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
    });
    return newBounds;
  }, [points]);

  useEffect(() => {
    setPoints([...imageTakenPlaces]);
  }, [imageTakenPlaces]);

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      console.log(map);
      console.log(bounds);
      map.setBounds(bounds);
    }
  }, [mapCreate]);

  console.log(setPlaceLocation);

  return (
    <LocationHolder>
      {!mapOpen && <button type="button" onClick={() => { setMapOpen(true); }}>클릭하여 장소를 선택해주세요</button>}
      {mapOpen && <ModalBackground />}
      {mapOpen && (
      <MapHolder>
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
          {points?.map((point) => (
            <MapMarker
              key={`${point.lat}-${point.lng}`}
              position={{
                lat: point.lat,
                lng: point.lng,
              }}
            />
          ))}
        </Map>
      </MapHolder>
      )}
    </LocationHolder>
  );
}
