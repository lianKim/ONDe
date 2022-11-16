export default function dividePositionForMapLine(targetPlacesData) {
  let countDay = 1;
  const dividedCount = [];
  let dayPoint = [];
  let ruleDay = '';

  targetPlacesData.forEach((place, index) => {
    const currentDay = place.placeTime.slice(0, 10);
    const lat = place.latitude;
    const lng = place.longitude;
    if (index === 0) {
      ruleDay = currentDay;
    }
    if (currentDay !== ruleDay) {
      dayPoint.push({ lat, lng });
      dividedCount.push([countDay, dayPoint]);
      ruleDay = currentDay;
      countDay += 1;
      dayPoint = [];
    }
    dayPoint.push({ lat, lng });
  });
  dividedCount.push([countDay, dayPoint]);

  return dividedCount;
}
