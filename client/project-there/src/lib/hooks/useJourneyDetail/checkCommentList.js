import customAxios from '../../apis/core/instance';

// commentList를 이용하여 서버에 comment 하나씩 전송해주는 함수
const addPlaceCommentList = async (commentList) => {
  const url = 'place/comment';
  /* eslint-disable no-await-in-loop */
  /* eslint-disable no-restricted-syntax */
  try {
    for (const comment of commentList) {
      const result = await customAxios.post(url, comment);
    }
  } catch (err) {
    console.log(err);
  }
};
// commment를 서버에서 제거 요청해주는 함수
const deletePlaceComment = (commentId) => {
  const url = `place/comment?commentId=${commentId}`;
  return customAxios.delete(url);
};
// comment를 서버에 수정 요청해주는 함수
const updatePlaceComment = (request) => {
  const url = 'place/comment';
  return customAxios.put(url, request);
};

/**
 * 처음 서버로부터 받은 commentList와 현재 commentList를 비교하여,
 * 댓글의 추가, 삭제, 수정 요청을 서버에 보내주는 함수
 * @param {array<object>} initialList
 * @param {array<object>} currentList
 */
export default function checkCommentList(initialList, currentList) {
  const deleteList = [];
  const addList = [];
  const fixList = [];

  // 추가 대상 및 수정 대상들을 탐색
  currentList?.forEach((element) => {
    if (element.commentId < 0) {
      const commentResult = {
        placeId: element.placeId,
        text: element.text,
      };
      addList.push(commentResult);
    } else {
      let isfixed = false;
      initialList.forEach((initialElement) => {
        if (initialElement.commentId === element.commentId) {
          if (element.text !== initialElement.text) {
            isfixed = true;
          }
        }
      });
      if (isfixed) {
        const fixedComment = {
          commentId: element.commentId,
          text: element.text,
        };
        fixList.push(fixedComment);
      }
    }
  });
  // 삭제 대상인 댓글들이 있는지 탐색
  initialList?.forEach((element) => {
    let isDelete = true;
    currentList.forEach((currentElement) => {
      if (element.commentId === currentElement.commentId) {
        isDelete = false;
      }
    });
    if (isDelete) {
      deleteList.push(element);
    }
  });

  // 추가 대상이 있을 경우 추가해줌
  if (addList?.length !== 0) {
    const reversedAddList = addList.reverse();
    addPlaceCommentList(reversedAddList);
  }
  // 삭제 대상이 있을 경우 삭제해줌
  if (deleteList?.length !== 0) {
    Promise.all(deleteList?.map((element) => deletePlaceComment(element.commentId)))
      .catch((err) => console.log(err));
  }

  // 수정 대상이 있을 경우 수정해줌
  if (fixList?.length !== 0) {
    Promise.all(fixList?.map((element) => updatePlaceComment(element)))
      .catch((err) => console.log(err));
  }
}
