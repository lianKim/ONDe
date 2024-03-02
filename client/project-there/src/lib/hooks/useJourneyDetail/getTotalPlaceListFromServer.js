import customAxios from '../../apis/core/instance';

/**
 * journeyId에 해당하는 장소 리스트를 서버로부터 받아오는 함수
 * @param {number} journeyId
 * @param {*} updateTotalPlaceData
 */
export default async function getTotalPlaceListFromServer({ journeyId,
  updateTotalPlaceData, setInitialTotalPlaceList }) {
  const url = `place/list?journeyId=${journeyId}`;
  try {
    const response = await customAxios.get(url);
    const { data } = response;
    updateTotalPlaceData(data);
    setInitialTotalPlaceList(data);
  } catch (error) {
    console.log(error);
  }
}
