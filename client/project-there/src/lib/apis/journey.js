import customAxios from './core/instance';

// 여정 생성
export const postJourneyAPI = async (datas) => {
  try {
    const formData = new FormData();
    const value = { ...datas };

    // 이미지 file 추가
    formData.append('thumbnail', value.thumbnail);
    delete value.thumbnail;

    // 데이터 blob 추가
    const blob = new Blob([JSON.stringify(value)], {
      type: 'application/json',
    });
    formData.append('request', blob);

    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    const { data } = await customAxios.post('/journey', formData, config);

    return data?.journeyId;
  } catch (err) {
    console.log(err);
  }
};

// 여정 수정
export const patchJourneyAPI = async (datas) => {
  const formData = new FormData();
  const value = { ...datas };
  // 여정 썸네일 url 삭제
  delete value.journeyThumbnailUrl;

  formData.append('thumbnail', value.thumbnail || null);
  delete value.thumbnail;

  const blob = new Blob([JSON.stringify(value)], {
    type: 'application/json',
  });
  formData.append('request', blob);

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  console.log(value);

  // formData key/value 확인
  formData.forEach((val, key) => {
    console.log(`key: ${key}, value: ${val}`);
  });

  try {
    const { data } = await customAxios.patch('/journey', formData, config);
    return data?.journeyId;
  } catch (err) {
    console.log(err.response.data);
  }
};

// 여정 삭제
export const deleteJourneyAPI = async (journeyId) => {
  try {
    const { data } = await customAxios.delete(
      `/journey?journeyId=${journeyId}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 여정 디테일 조회
export const getJourneyDetailAPI = async (journeyId) => {
  try {
    const { data } = await customAxios.get(
      `/journey/detail?journeyId=${journeyId}`,
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

// 여정 조회
export const getJourneyListAPI = async (url) => {
  try {
    const { data } = await customAxios.get(url);

    return { content: data.content, isLast: data.last };
  } catch (err) {
    console.log(err.response.data);
  }
};

// 필터링 여정 조회
export const getFilteredJourneyListAPI = async (url, options) => {
  try {
    const params = { ...options };

    Object.entries(params).forEach(([key, value]) => {
      if (!value.length) params[key] = '';
      else if (Array.isArray(value)) params[key] = params[key].join(',');
    });

    const { data } = await customAxios.get(url, { params });

    return { content: data.content, isLast: data.last };
  } catch (err) {
    console.log(err.response.data);
  }
};

// 북마크 추가
export const addBookmarkAPI = async (journeyId) => {
  try {
    const { status } = await customAxios.post(
      `/bookmark?journeyId=${journeyId}`,
    );

    return status;
  } catch (err) {
    console.log(err);
  }
};

// 북마크 삭제
export const removeBookmarkAPI = async (journeyId) => {
  try {
    const { status } = await customAxios.delete(
      `/bookmark?journeyId=${journeyId}`,
    );

    return status;
  } catch (err) {
    console.log(err);
  }
};
