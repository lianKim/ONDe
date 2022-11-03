/**
 * fileBlob을 base64로 인코딩 해주는 함수
 * @param {*} fileBlob
 * @param {Function} callback
 * @returns Promise
 */
const encodeFileToBase64 = (fileBlob, callback) => {
  // FileReader : File/Blob 객체 핸들링 할 때 사용
  const reader = new FileReader();
  // File/Blob을 읽은 뒤 base64로 인코딩한 문자열을 FileReader의 result 속성에 담아줌
  reader.readAsDataURL(fileBlob);

  return new Promise((resolve) => {
    reader.onload = () => {
      callback(reader.result);
      resolve();
    };
  });
};

export default encodeFileToBase64;
