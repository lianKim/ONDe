import React from 'react';
import { GiEgyptianTemple, GiCampingTent } from 'react-icons/gi';
import { CiZoomIn } from 'react-icons/ci';
import { BsTree } from 'react-icons/bs';
import { AiOutlineHome } from 'react-icons/ai';
import { HiShoppingBag } from 'react-icons/hi';
import { MdMuseum } from 'react-icons/md';
import { RiGalleryLine } from 'react-icons/ri';
import { FaTheaterMasks } from 'react-icons/fa';
import { TbBuildingCarousel, TbMoodKid } from 'react-icons/tb';
import { IoRestaurantOutline, IoBicycle } from 'react-icons/io5';

export default function CategoryIcons({ category }) {
  const findIcon = () => {
    switch (category) {
      case '자연':
        return <BsTree />;
      case '숙박':
        return <AiOutlineHome />;
      case '음식점':
        return <IoRestaurantOutline />;
      case '레저':
        return <IoBicycle />;
      case '테마파크':
        return <TbBuildingCarousel />;
      case '쇼핑':
        return <HiShoppingBag />;
      case '유적지':
        return <GiEgyptianTemple />;
      case '박물관':
        return <MdMuseum />;
      case '공연':
        return <FaTheaterMasks />;
      case '전시회':
        return <RiGalleryLine />;
      case '캠핑':
        return <GiCampingTent />;
      case '키즈':
        return <TbMoodKid />;
      default:
        return <CiZoomIn />;
    }
  };
  return (
    findIcon()
  );
}
