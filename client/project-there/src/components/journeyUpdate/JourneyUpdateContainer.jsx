import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useNewJourneyActions,
  useNewJourneyValue,
} from '../../contexts/newJourney';
import { patchJourneyAPI } from '../../lib/apis/journey';
import JourneyUploader from '../journeyUpload/JourneyUploader';

function JourneyUpdateContainer({ journeyId }) {
  const { getItem } = useNewJourneyActions();
  const journeyInfo = useNewJourneyValue();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newJourneyId = await patchJourneyAPI(journeyInfo);
    if (newJourneyId) navigate(`/journey/${newJourneyId}`);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    getItem(journeyId);
  }, []);

  return (
    <JourneyUploader>
      <button type="button" onClick={handleCancel}>
        취소
      </button>
      <button type="submit" onClick={handleSubmit}>
        등록
      </button>
    </JourneyUploader>
  );
}

export default React.memo(JourneyUpdateContainer);
