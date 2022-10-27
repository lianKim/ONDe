import React, { useState, useEffect } from 'react';
import { useMap, MapMarker } from 'react-kakao-maps-sdk';

export default function EventMarkerContainer({ position, content, hoverd, selected }) {
  const map = useMap();
  const [isVisible, setIsVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (hoverd || selected) {
      setIsFocused(true);
    } else {
      setIsFocused(false);
    }
  }, [hoverd, selected]);

  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      // @ts-ignore
      onClick={(marker) => map.panTo(marker.getPosition())}
      onMouseOver={() => setIsVisible(true)}
      onMouseOut={() => setIsVisible(false)}
    >
      {(isVisible || isFocused) && content}
    </MapMarker>
  );
}
