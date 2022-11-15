/**
 * 현재 카테고리가 선택되었는지, 선택되지 않았는지 판단하여,
 * isSelected에 반영해주는 함수
 * @param {Array<string>} categorySelected
 * @param {string} category
 * @param {object} setIsSelected
 */
export default function checkPlaceCategorySelected(
  categorySelected, category, setIsSelected) {
  if (categorySelected.includes(category)) {
    setIsSelected(true);
  } else {
    setIsSelected(false);
  }
}
