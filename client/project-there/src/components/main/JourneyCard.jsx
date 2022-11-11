import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useJourneyDetailActions } from '../../contexts/journeyDetail';
import Bookmark from '../common/journey/Bookmark';

const JourneyItem = styled.div`
  position: relative;
  width: 300px;
`;

const RegionBox = styled.div`
  margin-bottom: 10px;

  & button {
    background: var(--color-green200);
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
  }
`;

const InfoBox = styled.div`
  & > div:first-child {
    font-size: 21px;
    margin-bottom: 8px;
    cursor: pointer;
  }
`;

const WriterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const ProfileImageContainer = styled.div`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-gray300);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function JourneyCard(props) {
  const {
    journeyId,
    nickNmae,
    title,
    region,
    journeyThumbnailUrl,
    profileImageUrl,
  } = props;

  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`/journey/${journeyId}`);
  };

  return (
    <JourneyItem>
      <RegionBox>
        <button type="button" key={region}>
          {region}
        </button>
      </RegionBox>
      <ThumbnailBox onClick={handleClickCard}>
        <img src={journeyThumbnailUrl} alt="썸네일" />
      </ThumbnailBox>
      <InfoBox>
        <div>{title}</div>
        <WriterInfo>
          <ProfileImageContainer>
            {profileImageUrl && <img src={profileImageUrl} alt="" />}
          </ProfileImageContainer>
          <span>{nickNmae}</span>
        </WriterInfo>
      </InfoBox>
      <Bookmark journeyId={journeyId} />
    </JourneyItem>
  );
}

export default JourneyCard;
