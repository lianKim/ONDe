import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Bookmark from '../common/journey/Bookmark';

const JourneyItem = styled.div`
  position: relative;
  width: 300px;
  transform: scale(1);
  transition: 0.2s ease-in-out;

  &:hover {
    -webkit-transform: scale(1.01);
    transform: sacle(1.3);
  }
`;

const RegionBox = styled.div`
  margin-bottom: 10px;
  display: flex;
  align-items: flex-end;
  font-size: var(--font-small);
  font-weight: var(--weight-semi-bold);
  gap: 4px;

  & button {
    background: var(--color-green200);
    border: 0.5px solid var(--color-green200);
    color: var(--color-gray100);
  }
`;

const ThumbnailBox = styled.div`
  width: 300px;
  height: 300px;
  margin-bottom: 18px;
  overflow: hidden;
  cursor: pointer;

  & > img {
    display: block;
    background: var(--color-gray300);
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: var(--size-border-radius-small);
  }
`;

const InfoBox = styled.div`
  & > div:first-child {
    font-size: 21px;
    cursor: pointer;
  }
`;

const Writer = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 10px;

  & > span {
    font-size: var(--font-small);
    font-weight: var(--weight-semi-bold);
    cursor: pointer;
  }
`;

const ProfileImageContainer = styled.div`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-gray300);
  cursor: pointer;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function JourneyCard({ cardInfo, page }) {
  const {
    journeyId,
    nickName,
    profileImageUrl,
    title,
    region,
    journeyThumbnailUrl,
    bookmark,
  } = cardInfo;

  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/journey/${journeyId}`);
  };

  const handleClickWriter = ({ target }) => {
    if (!target.matches('SPAN') && !target.matches('IMG')) return;

    navigate(`/journeys/${nickName}`);
  };

  return (
    <JourneyItem>
      {/* <Bookmark journeyId={journeyId} bookmark={bookmark} page={page} /> */}
      <RegionBox>
        <FaMapMarkerAlt size="20" />
        <span>{region}</span>
        {/* <button type="button" key={region}>
          {region}
        </button> */}
      </RegionBox>
      <ThumbnailBox onClick={handleClickCard}>
        <img src={journeyThumbnailUrl} alt="썸네일" />
      </ThumbnailBox>
      <InfoBox>
        <div>{title}</div>
        <Writer onClick={handleClickWriter}>
          <ProfileImageContainer>
            {profileImageUrl && <img src={profileImageUrl} alt="" />}
          </ProfileImageContainer>
          <span>{nickName}</span>
        </Writer>
      </InfoBox>
      <Bookmark journeyId={journeyId} bookmark={bookmark} page={page} />
    </JourneyItem>
  );
}

export default JourneyCard;
