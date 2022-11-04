import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import ImageInputCarousel from '../placeUpload/ImageInputCarousel';
import PlaceInfoHolder from '../placeUpload/PlaceInfoHolder';
import { usePlaceInfoActions } from '../../contexts/PlaceInfoContext';
import { authAxios, baseAxios } from '../../lib/utills/customAxios';

const StyledPlaceUploadHolder = styled.div`
  width: 70vw;
  height: 70vh;
  position: relative;
  left: 15vw;
  top: 15vh;
  display: flex;
  border: 1px solid #dde4e5;
  .submit{
    position: absolute;
    right: 30px;
    bottom: 20px;
    width: 88px;
    height: 39px;
    border-radius: 20px;
    background-color: var(--color-green100);
    letter-spacing: -5%;
    color:white;
  }
  .cancle{
    position: absolute;
    right: 140px;
    bottom: 20px;
    width: 88px;
    height: 39px;
    border-radius: 20px;
    background-color: var(--color-gray400);
    letter-spacing: -5%;
    border: none;
  }
`;

export default function PlaceUpdate() {
  const { uploadData } = usePlaceInfoActions();
  const navigation = useNavigate();
  const params = useParams();

  const handleSubmitClick = async (e) => {
    e.preventDefault();
    uploadData(params);
  };
  const handleCancleClick = () => {
    navigation(-1);
  };

  const InitialSetting = async () => {
    const placeId = params?.placeId;
    const url = `place?placeId=${placeId}`;
    const { data } = await baseAxios.get(url);

    // 임시로 이미지 url 앞에 http를 추가해줌
    let { imageUrls } = data;
    imageUrls = imageUrls.map((image) => `http://${image}`);

    // 이미지 파일들을 받아줌
    const imageFiles = await Promise.all(
      imageUrls.map((imageUrl) => {
        const imageRequestUrl = `image/file?imageUrl=${imageUrl}`;
        return baseAxios.get(imageRequestUrl);
      }),
    );

    console.log(imageFiles);
  };

  useEffect(() => {
    InitialSetting();
  }, []);

  return (
    <StyledPlaceUploadHolder>
      <ImageInputCarousel />
      <PlaceInfoHolder />
      <button className="submit" type="button" onClick={handleSubmitClick}>
        등록
      </button>
      <button className="cancle" type="button" onClick={handleCancleClick}>
        취소
      </button>
    </StyledPlaceUploadHolder>
  );
}
