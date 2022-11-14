import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { addBookmarkAPI, removeBookmarkAPI } from '../../../lib/apis/journey';

const Container = styled.div`
  position: absolute;
  top: 12px;
  right: 0;
`;

const Button = styled.button`
  && {
    border: 0;
    background: none;
    padding: 0;
  }
`;

const BookmarkIcon = styled(BsBookmark)`
  color: var(--color-green200);
  font-size: 24px;
`;

const BookmarkFillIcon = styled(BsBookmarkFill)`
  color: var(--color-green200);
  font-size: 24px;
`;

function Bookmark({ journeyId, bookmark, page }) {
  if (page === 'myJourney') return;

  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleAddBookmark = async () => {
    const status = await addBookmarkAPI(journeyId);
    if (status === 200) setIsBookmarked(true);
  };

  const handleRemoveBookmark = async () => {
    const status = await removeBookmarkAPI(journeyId);
    if (status === 200) {
      setIsBookmarked(false);

      if (page === 'bookmark') {
        window.location.reload();
      }
    }
  };

  // 기존 북마크 여부 받아오기
  useEffect(() => {
    if (bookmark || page === 'bookmark') {
      setIsBookmarked(true);
    }
  }, [bookmark]);

  return (
    <Container>
      {isBookmarked ? (
        <Button type="button" onClick={handleRemoveBookmark}>
          <BookmarkFillIcon />
        </Button>
      ) : (
        <Button type="button" onClick={handleAddBookmark}>
          <BookmarkIcon />
        </Button>
      )}
    </Container>
  );
}

export default Bookmark;
