import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';
import ContentsEditor from './ContentsEditor';
import ThumbsUploader from './ThumbsUploader';
import { useAuthValue } from '../../contexts/auth';
import { postJourneyAPI } from '../../lib/apis/journey';
import JourneyUploader from './JourneyUploader';

const JourneyFormBox = styled.form`
  position: relative;
  top: 60px;
  width: 100vw;
  height: calc(100vh - 60px);
  display: flex;
  overflow: auto;
`;

const SubmitBtnContainer = styled.div`
  position: absolute;
  top: 36px;
  right: 36px;

  & button {
    font-size: var(--font-micro);
    background: var(--color-green200);
    color: var(--color-gray100);
    border: none;

    &:first-child {
      margin-right: 14px;
      background: var(--color-gray400);
      color: var(--color-gray100);
    }
  }
`;

function JourneyUploadContainer() {
  const journeyInfo = useNewJourneyValue();
  const { updateData, initDatas } = useNewJourneyActions();
  const { id } = useAuthValue();

  const navigate = useNavigate();

  // 미입력 항목 여부 체크 함수
  const checkEmptyValue = () => {
    const {
      title,
      region,
      journeyThemes,
      numberOfPeople,
      startDate,
      endDate,
      introductionText,
      thumbnail,
    } = journeyInfo;

    if (!title || !title.length) {
      return alert('제목을 입력해주세요.');
    }

    if (!region || !region.length) {
      return alert('여행 지역을 선택해주세요.');
    }

    if (!journeyThemes || !journeyThemes.length) {
      return alert('여행 테마를 선택해주세요.');
    }

    if (!numberOfPeople) {
      return alert('여행 인원을 선택해주세요.');
    }

    if (!startDate || !startDate.length) {
      return alert('여행 날짜를 선택해주세요.');
    }

    if (!endDate || !endDate.length) {
      return alert('여행 날짜를 선택해주세요.');
    }

    if (!introductionText || !introductionText.length) {
      return alert('여행 소개글을 입력해주세요.');
    }

    if (!thumbnail) {
      return alert('썸네일을 등록해주세요.');
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    // 미입력 항목 여부 체크
    checkEmptyValue(journeyInfo);

    const newJourneyId = await postJourneyAPI(journeyInfo);
    if (newJourneyId) navigate(`/journey/${newJourneyId}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    // memberId 반영
    updateData('memberId', id);
  }, [id]);

  // clean-up
  useEffect(
    () => () => {
      initDatas();
    },
    [],
  );

  return (
    <JourneyUploader>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
      <button type="submit" onClick={handleSubmitForm}>
        등록
      </button>
    </JourneyUploader>
  );
}

export default React.memo(JourneyUploadContainer);
