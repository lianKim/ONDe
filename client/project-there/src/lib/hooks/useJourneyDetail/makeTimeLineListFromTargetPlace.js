/**
 * targetplaceList를 받아서, 해당 장소에 포함된 시간들을 탐색하여
 * 시작일에 1을 표시하고, 날이 달라질 경우 elapsed time을 증가시켜줌
 * @param {Array<object>} targetPlacesData
 * @param {} setTimeLineList
 */
export default function makeTimeLineListFromTargetPlace(
  targetPlacesData, setTimeLineList) {
  if (targetPlacesData?.length !== 0) {
    let preDate = targetPlacesData[0].placeTime.slice(0, 10);
    let elapsedTime = 1;
    const timeLineList = [];
    timeLineList.push({ date: preDate, elapsedTime });
    targetPlacesData?.forEach((target) => {
      const targetDate = target.placeTime.slice(0, 10);
      const newTarget = { ...target };
      if (targetDate !== preDate) {
        preDate = targetDate;
        elapsedTime += 1;
        timeLineList.push({ date: preDate, elapsedTime });
      }
      newTarget.elapsedDayTime = elapsedTime;
      timeLineList.push(newTarget);
    });
    setTimeLineList(timeLineList);
  }
}
