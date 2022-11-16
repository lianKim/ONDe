import customAxios from '../../apis/core/instance';

/**
 * 서버로부터 장소에 적힌 댓글들을 받아옴
 * @param {*} param0
 */
export default function getCommentListFromServer({ placeId, page, setIsLastPage,
  setComments, setTotalComments, setInitialComments }) {
  const url = `place/comment?placeId=${placeId}&page=${page}&size=${10}&sort=commentId.desc`;
  customAxios.get(url).then(({ data }) => {
    const { totalElements, last, content } = data;
    if (last) {
      setIsLastPage(true);
    }
    if (totalElements !== 0) {
      setComments((prev) => [...prev, ...content]);
      setInitialComments((prev) => [...prev, ...content]);
      if (page === 0) {
        setTotalComments(totalElements);
      }
    }
  }).catch((err) => {
    console.log(err);
  });
}
