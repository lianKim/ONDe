import findTargetPlaceListByCategoryList from '../findTargetPlaceListByCategoryList';

const totalPlacesData = [
  { placeCategory: '숙박' },
  { placeCategory: '숙박' },
  { placeCategory: '키즈' },
];
/* eslint no-undef: "off" */
test('check category not included', () => {
  const categorySelected = ['자연'];
  expect(findTargetPlaceListByCategoryList(categorySelected, totalPlacesData))
    .toStrictEqual([]);
});

/* eslint no-undef: "off" */
test('check category included', () => {
  const categorySelected = ['숙박', '키즈'];
  expect(findTargetPlaceListByCategoryList(categorySelected, totalPlacesData))
    .toStrictEqual([{ placeCategory: '숙박' }, { placeCategory: '숙박' }, { placeCategory: '키즈' }]);
});

/* eslint no-undef: "off" */
test('check category empty', () => {
  const categorySelected = [];
  expect(findTargetPlaceListByCategoryList(categorySelected, totalPlacesData))
    .toStrictEqual(totalPlacesData);
});
