import React from 'react';
import { useParams } from 'react-router-dom';
import BookmarkedJourney from '../components/bookMarkedJourney/BookmarkedJourney';

function BookmarkedJourneyPage() {
  const { memberId } = useParams();

  return <BookmarkedJourney memberId={memberId} />;
}

export default BookmarkedJourneyPage;
