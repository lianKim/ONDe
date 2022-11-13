import customAxios from './core/instance';

// 필터링 여정 조회
export const getJourneyListAPI = async (options, page = 0) => {
  try {
    const params = { ...options };
    Object.entries(params).forEach(([key, value]) => {
      if (!value.length) params[key] = '';
      else if (Array.isArray(value)) params[key] = params[key].join(',');
    });

    const { data } = await customAxios.get(
      `/journey/filtered-list?page=${page}&size=6`,
      { params },
    );

    return { content: data.content, isLast: data.last };
  } catch (err) {
    console.log(err.response.data);
  }
};

// 나의 여정 조회
export const getMyJourneyListAPI = async (memberId, page = 0) => {
  try {
    const { data } = await customAxios.get(
      `/journey/my-list?memberId=${memberId}&size=6&page=${page}`,
    );

    return { content: data.content, isLast: data.last };
  } catch (err) {
    console.log(err.response.data);
  }
};

// 다른 유저의 여정 목록 조회
export const getOthersJourneyListAPI = async (nickName, page = 0) => {
  try {
    const { data } = await customAxios.get(
      `/journey/nickName-list?nickName=${nickName}&size=6&page=${page}`,
    );

    return { content: data.content, isLast: data.last };
  } catch (err) {
    console.log(err.response.data);
  }
};

// 북마크 여정 목록 조회
export const getBookmarkedJourneyListAPI = async (page = 0) => {
  try {
    const { data } = await customAxios.get(`/bookmark?page=${page}&size=6`);

    return { content: data.content, isLast: data.last };
  } catch (err) {
    console.log(err.response.data);
  }
};
