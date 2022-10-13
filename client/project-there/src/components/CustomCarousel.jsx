import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carouselstyle.css';
import { Carousel } from 'react-responsive-carousel';
import Resizer from 'react-image-file-resizer';
import CustomDropZone from './CustomDropZone';

const resizeFile = (file) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    300,
    300,
    'JPEG',
    100,
    0,
    (uri) => {
      resolve(uri);
    },
    'base64',
  );
});

export default function CustomCarousel() {
  const [acceptedImages, setAcceptedImages] = useState([]);
  const [rejectedImages, setRejectedImages] = useState([]);
  const [resizedImages, setResizedImages] = useState([]);

  const addAcceptedImages = (preImages, curImages) => {
    setAcceptedImages([...preImages, ...curImages]);
  };
  const addRejectedImages = (curImages) => {
    setRejectedImages([...curImages]);
  };
  useEffect(() => {
    Promise.all(acceptedImages?.map((image) => resizeFile(image))).then((result) => {
      setResizedImages(result);
    });
  }, [acceptedImages]);

  console.log(rejectedImages);

  return (
    <Carousel autoPlay={false} infiniteLoop>
      {resizedImages?.map((imageUrl) => (<img key={imageUrl} src={imageUrl} alt="" />))}
      <CustomDropZone info={[acceptedImages, addAcceptedImages, addRejectedImages]} />
    </Carousel>
  );
}
