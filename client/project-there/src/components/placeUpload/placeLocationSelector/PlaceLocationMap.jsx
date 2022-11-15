import React, { useState, useEffect, useRef, useMemo } from 'react';
import styled from 'styled-components';
import { Map } from 'react-kakao-maps-sdk';
import PlaceSearchResultList from './PlaceSearchResultList';
import PlaceEventMarkerContainer from './PlaceEventMarkerContainer';
import PlaceSelectButton from './PlaceSelectButton';
import PlaceCancleButton from './PlaceCancleButton';
import { findLocationByAddress, checkKakaoMapBound } from '../../../lib/hooks/usePlaceUpload';

const StyledMapHolder = styled.div`
  position: fixed;
  top : 10vh;
  left : 20vw;
  width: 60vw;
  height: 80vh;
  background-color: white;
  z-index: 12;
  display: flex;
`;

export default function PlaceLocationMap(
  { controlPointPlace, controlSelectPlace, controlMapOpen,
    controlPointAddress, controlSelectPlaceAddress }) {
  const [placeHover, setPlaceHover] = useState('');
  const [placeAddressHover, setPlaceAddressHover] = useState('');
  const [pointAddress, setPointAddress] = controlPointAddress;
  const [pointPlaces, setPointPlaces] = controlPointPlace;
  const [placeSelected, setPlaceSelected] = controlSelectPlace;
  const [placeSelectedAddress, setPlaceSeletedAddress] = controlSelectPlaceAddress;
  const mapRef = useRef();
  const [mapCreate, setMapCreate] = useState(false);
  const [bounds, setBounds] = useState('');

  // pointAddress가 변경되었을 때 해당되는 장소의 정보를 검색해서 pointPlaces에 넣어줌
  useEffect(() => {
    if (pointAddress?.length !== 0) {
      findLocationByAddress(pointAddress, setPointPlaces);
    }
  }, [pointAddress]);

  // 장소 주소들이 변경되었을 때, bounds가 변경되면 bounds를 변경해줌
  useEffect(() => {
    if (pointPlaces.length !== 0) {
      checkKakaoMapBound(pointPlaces, setBounds);
    }
  }, [pointPlaces]);

  // map이 생성되었을 때, map의 bound를 결정해줌
  useEffect(() => {
    const map = mapRef.current;
    if (map && pointPlaces.length !== 0 && bounds !== '') {
      map.setBounds(bounds);
    }
  }, [bounds, mapCreate, pointPlaces]);

  return (
    <StyledMapHolder>
      <PlaceSearchResultList
        setPoint={{ pointPlaces, setPointPlaces }}
        setHover={{ placeHover, setPlaceHover }}
        setAddressHoverd={{ placeAddressHover, setPlaceAddressHover }}
        setSelected={controlSelectPlace}
        setAddressSelected={controlSelectPlaceAddress}
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
          console.log(point);
          if (placeHover === point[0] && placeAddressHover === point[1]) {
            hoverd = true;
          }
          if (placeSelected === point[0] && placeSelectedAddress === point[1]) {
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
              setPlaceSelected={setPlaceSelected}
              setPlaceSelectedAddress={setPlaceSeletedAddress}
              selected={selected}
              address={point[1]}
            />
          );
        })}
      </Map>
      <PlaceSelectButton
        selected={placeSelected !== ''}
        setMapOpen={controlMapOpen}
      />
      <PlaceCancleButton
        selected={placeSelected !== ''}
        setPlaceSelected={setPlaceSelected}
      />
    </StyledMapHolder>
  );
}
