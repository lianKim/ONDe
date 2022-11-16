export default function findDayColor(day) {
  switch (day) {
    case 1:
      return '#D8D546';
    case 2:
      return '#ED6530';
    case 3:
      return '#F1A0DB';
    case 4:
      return '#95C9F7';
    case 5:
      return '#F0B829';
    case 6:
      return '#8BD19E';
    case 7:
      return '#D570E5';
    case 8:
      return '#BDA8F6';
    case 9:
      return '#B7959F';
    case 10:
      return '#A7B5FF';
    default:
      return 'var(--color-green100)';
  }
}
