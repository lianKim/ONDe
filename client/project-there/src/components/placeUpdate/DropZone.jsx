import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const StyledInputFileArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(0,0,0,0.5);
  height: ${(props) => `${props.height}px`};
`;

function DropZone({ onDrop, height }) {
  const [containerHeight, setContainerHeight] = useState(height);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': [],
    },
  });

  useEffect(() => {
    setContainerHeight(height);
  }, [height]);
  return (
    <StyledInputFileArea
      {...getRootProps()}
      height={height}
    >
      <input {...getInputProps()} />
      <div>
        {isDragActive ? (
          <p>이미지 파일들을 여기에 넣어주세요</p>
        ) : (
          <p>
            이미지 파일들을 추가할 수 있습니다.
            <br />
            (최대 10개 가능)
          </p>
        )}
      </div>
    </StyledInputFileArea>
  );
}

export { DropZone };
