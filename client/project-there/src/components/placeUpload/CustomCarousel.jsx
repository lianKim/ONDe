import React, { useState, useEffect } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carouselstyle.css';
import { Carousel } from 'react-responsive-carousel';
import Resizer from 'react-image-file-resizer';
import exifr from 'exifr';
import CustomDropZone from './CustomDropZone';

const resizeFileToBase64 = (file) => new Promise((resolve) => {
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
const resizeFileToFile = (file) => new Promise((resolve) => {
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
    'file',
  );
});

export default function CustomCarousel({ getImageMetaData }) {
  const [setResizedImageFiles, setImageTakenTime, setImageTakenPlaces] = getImageMetaData;
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
    Promise.all(acceptedImages?.map((image) => resizeFileToBase64(image))).then((result) => {
      setResizedImages(result);
    });
    Promise.all(acceptedImages?.map((image) => resizeFileToFile(image))).then((result) => {
      setResizedImageFiles(result);
    });
    Promise.all(acceptedImages?.map((image) => exifr.parse(image)))
      .then((result) => {
        let time = new Date();
        const locations = [];
        const findDuplicate = [];
        result.forEach((info) => {
          if (info) {
            const { CreateDate, latitude, longitude } = info;
            if (CreateDate) {
              time = CreateDate < time ? CreateDate : time;
            }
            if (latitude && longitude) {
              if (!findDuplicate.includes(`${latitude}${longitude}`)) {
                findDuplicate.push(`${latitude}${longitude}`);
                locations.push({ lat: latitude, lng: longitude });
              }
            }
          }
        });
        setImageTakenTime(time);
        setImageTakenPlaces(locations);
      });
  }, [acceptedImages]);

  return (
    <Carousel autoPlay={false} infiniteLoop>
      {resizedImages?.map((imageUrl) => (<img key={imageUrl} src={imageUrl} alt="" />))}
      <CustomDropZone info={[acceptedImages, addAcceptedImages, addRejectedImages]} />
    </Carousel>
  );
}
