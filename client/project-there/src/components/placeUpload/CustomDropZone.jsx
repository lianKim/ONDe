import React from 'react';
import { DropZone } from './DropZone';

export default function CustomDropZone({ info }) {
  const [acceptedImages, addAcceptedImages, addRejectedImages] = info;
  const handelDropImages = (acceptedFiles, rejectedFiles) => {
    if (acceptedImages.length >= 10) {
      window.alert('10개를 초과하여 더 이상 추가할 수 없습니다.');
      return;
    }
    addAcceptedImages(acceptedImages, acceptedFiles);
    addRejectedImages(rejectedFiles);
  };
  return <DropZone onDrop={handelDropImages} />;
}
