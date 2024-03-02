/**
 * targetPlaceData가 변했을 때, 이에 해당되는 kakao map bound를 설정하여 return해줌
 * @param {array<object>} targetPlacesData
 * @returns
 */
export default function changeKakaoMapBound(targetPlacesData) {
  const newBounds = new window.kakao.maps.LatLngBounds();
  targetPlacesData?.forEach((place) => {
    newBounds.extend(new window.kakao.maps.LatLng(place.latitude, place.longitude));
  });
  return newBounds;
}
