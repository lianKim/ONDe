/**
 * 삭제 대상인 장소 id를 받아서, totalPlaceList에서 제거해주는 함수
 * @param {array<object>} totalPlaceList
 * @param {number} targetPlaceId
 * @param {*} setTotalPlaceList
 */
export default function deletePlaceFromTotalPlaceList(
  totalPlaceList, targetPlaceId, setTotalPlaceList) {
  const newTotalPlaceList = totalPlaceList?.filter((place) => {
    if (place.placeId === targetPlaceId) {
      return false;
    }
    return true;
  });
  setTotalPlaceList(newTotalPlaceList);
}
