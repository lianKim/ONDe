/**
 * 장소에 적힌 댓글을 삭제해주는 함수
 * @param {*} comments
 * @param {*} setComments
 * @param {*} setTotalComments
 * @param {*} deleteTarget
 */
export default function deleteCommentFromCommentList(comments, setComments,
  setTotalComments, deleteTarget) {
  const newCommentList = comments.filter((comment) => {
    if (comment.commentId === deleteTarget) {
      return false;
    }
    return true;
  });
  if (newCommentList?.length !== comments?.length) {
    setComments(newCommentList);
    setTotalComments((prev) => prev - 1);
  }
}
