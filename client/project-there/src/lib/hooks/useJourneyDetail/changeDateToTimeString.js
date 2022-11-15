/**
 * Date object를 받아서, 해당하는 시간 및 분을 string 형태로 return해주는 함수
 * @param {Date} placeTime
 * @returns {string}
 */
export default function changeDateToTimeString(placeTime) {
  const date = new Date(placeTime);
  date.setHours(date.getHours() + 9);
  const timeDivider = date.getHours() >= 12 ? 'PM' : 'AM';
  const hour = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
  const minute = date.getMinutes();
  const hourString = hour >= 10 ? hour.toString() : `0${hour}`;
  const minuteString = minute >= 10 ? minute.toString() : `0${minute}`;
  return `${hourString}:${minuteString} ${timeDivider}`;
}
