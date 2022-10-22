import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const JourneyItemBox = styled.div`
  display: inline-block;
  width: 300px;
  height: 300px;
  padding: 16px;
  border: 1px solid black;
  background: lightsalmon;
  margin: 8px;
`;

function JourneyCard({
  journeyId,
  memberId,
  title,
  region,
  journeyThumbnailUrl,
}) {
  const navigate = useNavigate();

  const handleClickCard = () => {
    navigate(`journey/${journeyId}`);
  };

  return (
    <JourneyItemBox onClick={handleClickCard}>
      <div className="thumbnail">
        <img src={journeyThumbnailUrl} alt="썸네일" />
      </div>
      <div className="journeyInfo">
        <div>{title}</div>
        <div>{memberId}</div>
        <div>
          <button type="button" key={region}>
            {region}
          </button>
        </div>
        <div>좋아요 개수</div>
      </div>
    </JourneyItemBox>
  );
}

export default JourneyCard;
