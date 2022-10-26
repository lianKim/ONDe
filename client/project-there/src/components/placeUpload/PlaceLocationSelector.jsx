import React, {
  useState, useMemo, useRef, useEffect, useContext,
} from 'react';
import styled from 'styled-components';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import PlaceContext from '../../contexts/PlaceContext';
import PlaceEventMarkerContainer from './PlaceEventMarkerContainer';
import PlaceSearchResultList from './PlaceSearchResultList';
import PlaceSelectButton from './PlaceSelectButton';
import PlaceCancleButton from './PlaceCancleButton';

const LocationHolder = styled.div`
  width: 80%;
  height: 10%;
  display:flex;
  align-items: center;
  color: var(--color-gray500);
  margin-left: 2%;
  font-size: var(--font-small);
`;

const StyledButton = styled.button`
  margin-left: 60px;
  color: var(--color-green100);
  border: 0.5px solid var(--color-green100);
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
  display: flex;
`;

const coord2AddressSearch = (lng, lat) => new Promise((resolve, reject) => {
  const geocoder = new window.kakao.maps.services.Geocoder();
  geocoder.coord2Address(lng, lat, (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      resolve(result[0].address.address_name);
    } else {
      reject(status);
    }
  });
});

const addressToPlaceNameSearch = (address) => new Promise((resolve, reject) => {
  const ps = new window.kakao.maps.services.Places();
  ps.keywordSearch(address, (result, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      resolve(result);
    } else {
      resolve([]);
    }
  });
});

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
  const [placeInfo, setPlaceInfo] = useContext(PlaceContext);

  // 이미지가 업로드 되었을 때, point를 갱신해줌
  useEffect(() => {
    setPoints(() => placeInfo.imageTakenLocations);
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
    if (pointAddress.length !== 0) {
      Promise.all(pointAddress?.map((address) => addressToPlaceNameSearch(address)))
        .then((results) => {
          let newResult = results.flat(1);
          if (newResult.length === 0) {
            setPointPlaces([]);
          } else {
            newResult = newResult.reduce((acc, cur) => {
              let include = false;
              const placeName = cur.place_name;
              const placeAddressName = cur.address_name;
              const placeLat = cur.y;
              const placeLng = cur.x;
              acc?.forEach((place) => {
                if (place[0] === placeName) {
                  include = true;
                }
              });
              if (!include) {
                return [...acc, [placeName, placeAddressName, placeLat, placeLng]];
              }
              return acc;
            }, []);
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
      setPlaceInfo((pre) => ({
        ...pre,
        placeName: selectedInfo[0],
        addressName: selectedInfo[1],
        latitude: selectedInfo[2],
        longitude: selectedInfo[3],
        region1: selectedInfo[1].split(' ')[0],
        region2: selectedInfo[1].split(' ')[1],
        region3: selectedInfo[1].split(' ')[2],
        region4: selectedInfo[1].split(' ')[3],
      }));
    }
  }, [mapOpen]);

  return (
    <LocationHolder>
      {!mapOpen && (
        <div>
          위치
          <StyledButton
            type="button"
            onClick={() => { setMapOpen(true); }}
          >
            {placeSelected === '' ? '선택' : placeSelected}
          </StyledButton>
        </div>
      )}
      {mapOpen && <ModalBackground />}
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
