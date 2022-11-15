import customAxios from '../../apis/core/instance';

/**
 * 초기 totalPlaceList와 현재 totalPlaceList를 받아서,
 * 초기에는 있지만, 현재에는 없는 place들을 서버에 삭제 요청 보내는 함수
 * @param {array<object>} initialTotalList
 * @param {array<object>} currentTotalList
 */
export default function deletePlaceFromServer(initialTotalList, currentTotalList) {
  const deleteTargetPlaces = initialTotalList.filter((place) => {
    let isTarget = true;
    currentTotalList.forEach((currentPlace) => {
      if (place.placeId === currentPlace.placeId) {
        isTarget = false;
      }
    });
    if (isTarget) {
      return true;
    }
    return false;
  });
  Promise.all(deleteTargetPlaces?.map((place) => {
    const url = `/place?placeId=${place.placeId}`;
    return customAxios.delete(url);
  })).catch((err) => {
    console.log(err);
  });
}
