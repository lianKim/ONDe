import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import customAxios from '../../../lib/apis/core/instance';
import { useAuthValue } from '../../../contexts/AuthContext';
import { useTotalPlaceInfoActions } from '../../../contexts/TotalPlaceInfoContext';

const StyledLikeHolder = styled.div`
  padding: 0 0 5px 0;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  span {
    margin-left: 2px;
    color: var(--color-green200);
    font-size: var(--font-micro);
    font-weight: var(--weight-regular);
  }
`;
const StyledLikeIconHolder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    width: 20px;
    height: 20px;
    color: var(--color-red100);
  }
`;

export default function PlaceLike({ target }) {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const likeRef = useRef(isLiked);
  const memberInfo = useAuthValue();
  const { updateTotalPlaceData } = useTotalPlaceInfoActions();

  // 좋아요 표시한 부분에 변경이 있었는지 확인해주는 함수
  const checkLiked = () => {
    if (likeRef.current !== target.heartedCheck) {
      if (likeRef.current) {
        // 좋아요가 새로 눌렸을 때,
        const url = `place/heart?placeId=${target.placeId}`;
        customAxios.post(url).catch((err) => {
          console.log(err);
        });
        // totalPlacesData 수정해줌
        updateTotalPlaceData((prev) =>
          prev.map((place) => {
            if (place.placeId === target.placeId) {
              const newPlace = { ...place };
              newPlace.heartedCheck = true;
              const { placeHeartCount } = newPlace;
              if (placeHeartCount.indexOf('k') === -1) {
                newPlace.placeHeartCount = String(Number(placeHeartCount) + 1);
              }
              return newPlace;
            }
            return place;
          }),
        );
      } else {
        // 좋아요가 다시 눌려서 풀렸을 때,
        const url = `place/unheart?placeId=${target.placeId}`;
        customAxios.post(url).catch((err) => {
          console.log(err);
        });
        // totalPlacesData 수정해줌
        updateTotalPlaceData((prev) =>
          prev.map((place) => {
            if (place.placeId === target.placeId) {
              const newPlace = { ...place };
              newPlace.heartedCheck = false;
              const { placeHeartCount } = newPlace;
              if (placeHeartCount.indexOf('k') === -1) {
                newPlace.placeHeartCount = String(Number(placeHeartCount) - 1);
              }
              return newPlace;
            }
            return place;
          }),
        );
      }
    }
  };
  const handleLikeButtonClick = () => {
    if (!memberInfo?.nickName) {
      window.alert('로그인이 필요한 서비스입니다.');
    } else {
      setIsLiked((pre) => !pre);
      if (typeof likeCount === 'number') {
        if (isLiked) {
          setLikeCount((pre) => pre - 1);
        } else {
          setLikeCount((pre) => pre + 1);
        }
      }
    }
  };

  // 좋아요 데이터 받아오기
  useEffect(() => {
    // 좋아요 수를 반영해줌
    const { placeHeartCount } = target;
    if (placeHeartCount.indexOf('k') === -1) {
      setLikeCount(Number(placeHeartCount));
    } else {
      setLikeCount(placeHeartCount);
    }
    // 좋아요 유무를 반영해줌
    if (target.heartedCheck) {
      setIsLiked(true);
    }
    return checkLiked;
  }, []);

  // 마지막에 좋아요 바뀌었는지 유무를 보내주기 위해 ref 업데이트를 해주는 부분
  useEffect(() => {
    likeRef.current = isLiked;
  }, [isLiked]);

  return (
    <StyledLikeHolder>
      <StyledLikeIconHolder onClick={handleLikeButtonClick}>
        {isLiked ? <AiFillHeart /> : <AiOutlineHeart />}
      </StyledLikeIconHolder>
      <span>{likeCount}</span>
    </StyledLikeHolder>
  );
}
