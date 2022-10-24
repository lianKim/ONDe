import React, {
  useState, useMemo, useRef, useEffect, useContext,
} from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PlaceContext from '../../contexts/PlaceContext';

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

export default function PlaceLocationSelector() {
  const [mapOpen, setMapOpen] = useState(false);
  const [mapCreate, setMapCreate] = useState(false);
  const [points, setPoints] = useState([]);
  const [pointAddress, setPointAddress] = useState([]);
  const [pointPlaces, setPointPlaces] = useState([]);
  const mapRef = useRef();
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);

  // 이미지가 업로드 되었을 때, point를 갱신해줌
  useEffect(() => {
    setPoints(() => placeInfo.imageTakenLocations);
  }, [placeInfo.imageTakenLocations]);

  const bounds = useMemo(() => {
    const newBounds = new window.kakao.maps.LatLngBounds();
    points?.forEach((point) => {
      newBounds.extend(new window.kakao.maps.LatLng(point.lat, point.lng));
    });
    return newBounds;
  }, [points]);

  // map이 생성되었을 때, map의 bound를 결정해줌
  useEffect(() => {
    const map = mapRef.current;
    if (map && points.length !== 0) {
      map.setBounds(bounds);
    }
  }, [mapCreate]);

  const findPointAdress = (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const addressName = result[0].address.address_name;
      setPointAddress((pre) => {
        if (!pre.includes(addressName)) {
          return [...pre, addressName];
        }
        return pre;
      });
    }
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const placeData = [];
      data?.forEach((place) => {
        let include = false;
        const addressName = place.address_name;
        const placeName = place.place_name;
        const lat = place.y;
        const lng = place.x;
        placeData?.forEach((element) => {
          if (element[1] === placeName) {
            include = true;
          }
        });
        if (!include) {
          placeData.push([addressName, placeName, lat, lng]);
        }
      });
      setPointPlaces((pre) => [...pre, ...placeData]);
    }
  };

  // point가 변경되었을 때, 좌표 값들에 해당하는 주소들을 찾아줌
  useEffect(() => {
    const geocoder = new window.kakao.maps.services.Geocoder();
    points?.forEach((point) => {
      geocoder.coord2Address(point.lng, point.lat, findPointAdress);
    });
  }, [points]);

  useEffect(() => {
    const ps = new window.kakao.maps.services.Places();
    pointAddress?.forEach((address) => {
      ps.keywordSearch(address, placesSearchCB);
    });
    console.log(pointAddress);
  }, [pointAddress]);

  useEffect(() => {
    console.log(pointPlaces);
  }, [pointPlaces]);

  return (
    <LocationHolder>
      {!mapOpen && (
        <button
          type="button"
          onClick={() => { setMapOpen(true); }}
        >
          클릭하여 장소를 선택해주세요
        </button>
      )}
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
