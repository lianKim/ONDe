import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BookmarkedJourney from '../components/bookMarkedJourney/BookmarkedJourney';
import { useAuthActions } from '../contexts/AuthContext';
import { getAccessToken } from '../lib/utills/controlAccessToken';

const TestDiv = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 180px;
`;

function BookmarkedJourneyPage() {
  const navigate = useNavigate();

  const { memberId } = useParams();

  // 유저 인증
  const { authenticateUser } = useAuthActions();

  useEffect(() => {
    // 마운트 될 때 accessToken으로 받은 유저 정보 업데이트
    const accessToken = getAccessToken();
    const authenticate = async () => {
      const res = await authenticateUser(accessToken);
      if (!res) navigate('/signin');
    };

    if (accessToken) authenticate();
    else navigate('/signin');
  }, []);

  return (
    <TestDiv>
      <BookmarkedJourney memberId={memberId} />
    </TestDiv>
  );
}

export default BookmarkedJourneyPage;
