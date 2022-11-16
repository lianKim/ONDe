export default function findDayColor(day) {
  switch (day) {
    case 1:
      return 'red';
    case 2:
      return 'orange';
    case 3:
      return 'yellow';
    case 4:
      return 'green';
    case 5:
      return 'blue';
    case 6:
      return 'indigo';
    default:
      return 'purple';
  }
}
