import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import imageCompression from 'browser-image-compression';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/NewJourneyContext';

const UploadedImage = styled.div`
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 16px;
  z-index: 0;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const baseStyle = {
  position: 'relative',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
  zIndex: 1,
};

const activeStyle = {
  backgroundColor: 'black',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function FileDragUploader() {
  const { journeyThumbnailUrl } = useNewJourneyValue();
  const { updateData } = useNewJourneyActions();
  const [files, setFiles] = useState([]);
  const [imgSrc, setImgSrc] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles[0]);

    const file = acceptedFiles[0];

    // 이미지 리사이징 후 data에 저장
    imageCompression(file, {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
    }).then((compressedFile) => {
      const newFile = new File([compressedFile], file.name, {
        type: file.type,
      });
      console.log(newFile);
      updateData('thumbnail', newFile);
    });

    // 미리보기 이미지
    setFiles(
      acceptedFiles.map((imgFile) =>
        Object.assign(imgFile, {
          preview: URL.createObjectURL(imgFile),
        }),
      ),
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
    },
  });

  // 기존 이미지가 있으면 미리보기 생성
  useEffect(() => {
    if (journeyThumbnailUrl) {
      setImgSrc(journeyThumbnailUrl);
    }
  }, [journeyThumbnailUrl]);

  // 이미지 업로드 시 미리보기 생성
  useEffect(() => {
    if (files.length) {
      setImgSrc(files[files.length - 1].preview);
    }

    // clean-up
    return () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive && activeStyle),
      ...(isDragAccept && acceptStyle),
      ...(isDragReject && rejectStyle),
    }),
    [isDragActive, isDragAccept, isDragReject],
  );

  return (
    <section style={{ width: '100%', height: '100%' }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {!imgSrc && <div>Drag and drop your images here.</div>}
      </div>
      <aside
        style={{
          display: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
        }}
      >
        {imgSrc && (
          <UploadedImage>
            <img src={imgSrc} alt="" />
          </UploadedImage>
        )}
      </aside>
    </section>
  );
}

export default FileDragUploader;
