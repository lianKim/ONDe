import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import encodeFileToBase64 from '../../lib/utills/encodeFileToBase64';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  background: var(--color-gray300);
  border-radius: 50%;
  overflow: hidden;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 3;
  }
`;

const FileInput = styled.input`
  display: none;
`;

const EditButton = styled.button`
  padding: 8px 16px;
  line-height: 1;

  color: var(--color-green200);
  border: 0.5px solid var(--color-green200);

  margin-top: 12px;
`;

function ImageUploader({ onChangeForm, imgUrl }) {
  // 파일업로드 UI 커스텀 하기 위해 hidden으로 숨기고 ref를 이용하여 호출하기 위한 코드
  const fileInput = useRef();
  const [imgSrc, setImgSrc] = useState('');

  // 이미지 업로드
  const handleUploadImage = ({ target }) => {
    if (!target.files) return;

    const file = target.files[0];

    console.log(file);
    encodeFileToBase64(file, setImgSrc);

    // 이미지 리사이징 후 data에 저장
    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], file.name, {
        type: file.type,
      });
      console.log(newFile);

      onChangeForm((prev) => ({
        ...prev,
        [target.name]: newFile,
      }));
    });

    // onChangeForm((prev) => ({
    //   ...prev,
    //   [target.name]: file,
    // }));
  };

  // 이미지 업로드 버튼을 클릭하면 숨겨뒀던 파일 업로드가 클릭되게 한다.
  const handleClickImgUploadBtn = (e) => {
    if (!fileInput?.current) return;

    e.preventDefault();
    fileInput?.current.click();
  };

  // 등록된 프로필 이미지가 있으면 보여주기
  useEffect(() => {
    if (imgUrl) setImgSrc(imgUrl);
  }, [imgUrl]);

  return (
    <Wrapper>
      <ImageContainer>{imgSrc && <img src={imgSrc} alt="" />}</ImageContainer>
      <div>
        <FileInput
          type="file"
          accept="image/*"
          ref={fileInput}
          name="profileImageFile"
          onChange={handleUploadImage}
        />
        <EditButton type="button" onClick={handleClickImgUploadBtn}>
          변경
        </EditButton>
      </div>
    </Wrapper>
  );
}

export default ImageUploader;
