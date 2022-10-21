import axios from 'axios';

/**
 * axios 데이터 전송 함수
 * @param {object} obj
 * @param {string} url
 */
const addDatas = (datas, url) => {
  // formData 객체를 통해 데이터 전달
  const formData = new FormData();

  // formData에 데이터(JSON 객체) 추가
  Object.keys(datas).forEach((key) => {
    if (key === 'thumbnail') {
      formData.append(key, datas[key][0]);
    } else {
      formData.append(
        key,
        new Blob([
          JSON.stringify(datas[key], {
            type: 'application/json',
          }),
        ]),
      );
    }
  });

  // 파일이 포함된 데이터 전송 시 아래와 같이 config 설정 필요
  const config = {
    headers: {
      'content-type': 'multipart/form-data',
    },
  };

  axios
    // url로 fromData를 config에 맞게 전송
    .post(url, formData, config)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      alert(`등록 실패 : ${err}`);
    });
};

export default addDatas;
