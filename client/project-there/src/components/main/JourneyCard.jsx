import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useJourneyDetailActions } from '../../contexts/journeyDetail';

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
  cursor: pointer;

  & img {
    display: block;
    background: var(--color-gray300);
    width: 100%;
    height: 100%;
    padding: 12px;
  }
`;

const InfoBox = styled.div`
  & .title {
    font-size: 21px;
    margin-bottom: 8px;
    cursor: pointer;
  }

  & .region {
    margin-top: 14px;

    & button {
      background: var(--color-green200);
      color: var(--color-gray100);
    }
  }
`;

const HeartBox = styled.div`
  position: absolute;
  top: 58px;
  right: 12px;
  font-size: var(--font-micro);
`;

function JourneyCard({
  journeyId,
  memberId,
  title,
  region,
  journeyThumbnailUrl,
}) {
  const { getDatas } = useJourneyDetailActions();

  const navigate = useNavigate();

  const handleClickCard = () => {
    getDatas(journeyId);
    navigate(`journey/${journeyId}`);
  };

  return (
    <JourneyItem onClick={handleClickCard}>
      <RegionBox>
        <button type="button" key={region}>
          {region}
        </button>
      </RegionBox>
      <ThumbnailBox>
        <img src={journeyThumbnailUrl} alt="썸네일" />
      </ThumbnailBox>
      <InfoBox>
        <div className="title">{title}</div>
        <div>{`by ${memberId}`}</div>
      </InfoBox>
      <HeartBox>좋아요 개수</HeartBox>
    </JourneyItem>
  );
}

export default JourneyCard;
