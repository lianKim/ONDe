import checkPlaceCategoryInclude from '../checkPlaceCategoryInclude';

const categoryList = [
  '자연',
  '키즈',
  '숙박',
];
/* eslint no-undef: "off" */
test('카테고리가 카테고리 리스트에 없을 때', () => {
  const category = '박물관';
  expect(checkPlaceCategoryInclude(categoryList, category))
    .toStrictEqual(['자연', '키즈', '숙박', '박물관']);
});

/* eslint no-undef: "off" */
test('카테고리가 카테고리 리스트에 있을 때', () => {
  const category = '자연';
  expect(checkPlaceCategoryInclude(categoryList, category))
    .toStrictEqual(['키즈', '숙박']);
});
