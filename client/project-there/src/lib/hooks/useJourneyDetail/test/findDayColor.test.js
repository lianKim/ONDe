import findDayColor from '../findDayColor';
/* eslint no-undef: "off" */
test('day one is red', () => {
  expect(findDayColor(1)).toBe('red');
});

test('day six is indigo', () => {
  expect(findDayColor(6)).toBe('indigo');
});
