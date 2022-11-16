/**
 * 장소에 적힌 댓글을 삭제해주는 함수
 * @param {*} comments
 * @param {*} deleteTarget
 */
export default function deleteCommentFromCommentList(comments, deleteTarget) {
  const newCommentList = comments.filter((comment) => {
    if (comment.commentId === deleteTarget) {
      return false;
    }
    return true;
  });
  return newCommentList;
}
