/**
 * totalPlacesData 배열에서 categorySelected 배열 안에 있는 카테고리에 해당되는
 * 장소들을 찾아서 targetPlaceData에 넣어주는 함수
 * @param {Array} categorySelected
 * @param {Array} totalPlacesData
 * @param {object} updateTargetPlaceData
 * @returns
 */
export default function findTargetPlaceListByCategoryList(
  categorySelected, totalPlacesData) {
  if (totalPlacesData.length === 0) {
    return [];
  }
  if (categorySelected.length === 0) {
    return totalPlacesData;
  }
  const newTarget = totalPlacesData?.filter((place) => {
    if (categorySelected.includes(place.placeCategory)) {
      return true;
    }
    return false;
  });
  return newTarget;
}
