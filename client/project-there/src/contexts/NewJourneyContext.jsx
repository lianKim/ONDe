import React, { createContext, useContext, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getJourneyDetailAPI } from '../lib/apis/journey';
import { authAxios } from '../lib/utills/customAxios';

const NewJourneyValueContext = createContext();
const NewJourneyActionsContext = createContext();

const initialState = {
  memberId: '',
  title: '',
  startDate: '',
  endDate: '',
  numberOfPeople: 1,
  disclosure: 'public',
  thumbnail: null,
  introductionText: '',
  journeyThemes: [],
  region: '',
};

function NewJourneyProvider({ children }) {
  const [journeyInfo, setJourneyInfo] = useState(initialState);

  const actions = useMemo(
    () => ({
      async getItem(jounreyId) {
        if (!jounreyId) return alert('journey id가 없습니다.');

        const data = await getJourneyDetailAPI(jounreyId);
        setJourneyInfo(data);
      },

      updateData(name, value) {
        setJourneyInfo((prev) => ({ ...prev, [name]: value }));
      },

      async updateJourneyInfo(newJourney) {
        const formData = new FormData();
        const value = { ...newJourney };
        // 여정 썸네일 url 삭제
        delete value.journeyThumbnailUrl;
        // // 닉네임 삭제
        // delete value.nickName;
        // // 북마크 여부 삭제
        // delete value.bookmark;
        // // 프로필 이미지 url 삭제
        // delete value.profileImageUrl;

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
          const { data } = await authAxios.patch('/journey', formData, config);
          return data?.journeyId;
        } catch (err) {
          console.log(err.response.data);
        }
      },

      initDatas(newDatas = initialState) {
        setJourneyInfo({ ...newDatas });
      },
    }),
    [],
  );

  return (
    <NewJourneyActionsContext.Provider value={actions}>
      <NewJourneyValueContext.Provider value={journeyInfo}>
        {children}
      </NewJourneyValueContext.Provider>
    </NewJourneyActionsContext.Provider>
  );
}

const useNewJourneyValue = () => {
  const value = useContext(NewJourneyValueContext);
  if (value === undefined) {
    throw new Error(
      'useNewJourneyValue should be used within JourneysProvider',
    );
  }
  return value;
};

const useNewJourneyActions = () => {
  const value = useContext(NewJourneyActionsContext);
  if (value === undefined) {
    throw new Error(
      'useNewJourneyActions should be used within JourneysProvider',
    );
  }
  return value;
};

export { useNewJourneyValue, useNewJourneyActions };
export default NewJourneyProvider;
