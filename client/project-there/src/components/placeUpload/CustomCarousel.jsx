import React, { useState, useEffect, useContext } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './carouselstyle.css';
import { Carousel } from 'react-responsive-carousel';
import Resizer from 'react-image-file-resizer';
import exifr from 'exifr';
import CustomDropZone from './CustomDropZone';
import PlaceContext from '../../contexts/PlaceContext';

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

export default function CustomCarousel() {
  const [acceptedImages, setAcceptedImages] = useState([]);
  const [, setRejectedImages] = useState([]);
  const [resizedImages, setResizedImages] = useState([]);
  const [, setPlaceInfo] = useContext(PlaceContext);

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
      setPlaceInfo((pre) => ({ ...pre, images: result }));
    });
    Promise.all(acceptedImages?.map((image) => exifr.parse(image)))
      .then((result) => {
        let placeVisitedTime = new Date();
        const imageTakenLocations = [];
        const findDuplicate = [];
        result.forEach((info) => {
          if (info) {
            const { CreateDate, latitude, longitude } = info;
            if (CreateDate) {
              placeVisitedTime = CreateDate < placeVisitedTime ? CreateDate : placeVisitedTime;
            }
            if (latitude && longitude) {
              if (!findDuplicate.includes(`${latitude}${longitude}`)) {
                findDuplicate.push(`${latitude}${longitude}`);
                imageTakenLocations.push({ lat: latitude, lng: longitude });
              }
            }
          }
        });
        setPlaceInfo((pre) => ({
          ...pre,
          placeTime: placeVisitedTime,
          imageTakenLocations,
        }));
      });
  }, [acceptedImages]);

  return (
    <Carousel autoPlay={false} infiniteLoop showThumbs={false}>
      {resizedImages?.map((imageUrl) => (<img key={imageUrl} src={imageUrl} alt="" />))}
      <CustomDropZone info={[acceptedImages, addAcceptedImages, addRejectedImages]} />
    </Carousel>
  );
}
