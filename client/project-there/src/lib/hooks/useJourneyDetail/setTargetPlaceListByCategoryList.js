/**
 * totalPlacesData 배열에서 categorySelected 배열 안에 있는 카테고리에 해당되는
 * 장소들을 찾아서 targetPlaceData에 넣어주는 함수
 * @param {Array} categorySelected
 * @param {Array} totalPlacesData
 * @param {object} updateTargetPlaceData
 * @returns
 */
export default function setTargetPlaceListByCategoryList(
  categorySelected, totalPlacesData, updateTargetPlaceData) {
  if (totalPlacesData.length === 0) {
    updateTargetPlaceData([]);
    return;
  }
  if (categorySelected.length === 0) {
    updateTargetPlaceData(totalPlacesData);
    return;
  }
  const newTarget = totalPlacesData?.filter((place) => {
    if (categorySelected.includes(place.placeCategory)) {
      return true;
    }
    return false;
  });
  updateTargetPlaceData(newTarget);
}
