import changeDateToTimeString from '../changeDateToTimeString';

const placeTime = '2022-10-22T03:56:46';

/* eslint no-undef: "off" */
test('check convert stringTime', () => {
  expect(changeDateToTimeString(placeTime)).toBe('12:56 PM');
});
