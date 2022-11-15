/**
 * 카테고리 버튼을 클릭했을 때, 해당되는 카테고리가 이미 선택이 되어 있다면,
 * 선택된 카테고리에서 제거해주고, 선택되어 있지 않다면, 선택된 카테고리에 포함시켜줌
 * @param {Array<string>} categorySelected
 * @param {string} category
 * @param {object} setCategorySelected
 */
export default function checkPlaceCategoryInclude(
  categorySelected, category, setCategorySelected) {
  // 이미 포함하고 있을 경우 제외해 줌
  if (categorySelected.includes(category)) {
    const newSelected = categorySelected.filter((element) => {
      if (element === category) {
        return false;
      }
      return true;
    });
    setCategorySelected(newSelected);
  } else {
    // 포함되어 있지 않다면 포함해 줌
    setCategorySelected((pre) => ([...pre, category]));
  }
}
