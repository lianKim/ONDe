import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';
import { addBookmarkAPI, removeBookmarkAPI } from '../../../lib/apis/journey';
import { ReactComponent as BookmarkSVG } from '../../../assets/icons/bookmark.svg';
import { ReactComponent as BookmarkSelectedSVG } from '../../../assets/icons/bookmark-selected.svg';

const Container = styled.div`
  position: absolute;
  top: ${(props) => (props.page === 'detail' ? '14px' : '38px')};
  right: ${(props) => (props.page === 'detail' ? '0' : '8px')};
`;

const Button = styled.button`
  && {
    border: 0;
    background: none;
    padding: 0;
    margin: 0;
  }
`;

// const BookmarkIcon = styled(BsBookmark)`
//   color: var(--color-green200);
//   font-size: 24px;

//   & > * {
//     fill: blue;
//     background: green;
//   }
// `;

// const BookmarkIcon = styled(BsBookmarkFill)`
//   color: var(--color-gray100);
//   opacity: 1;
//   font-size: 24px;
//   -webkit-text-stroke: 5px blue;
// `;

// const BookmarkFillIcon = styled(BsBookmarkFill)`
//   color: var(--color-green200);
//   font-size: 24px;
// `;

const BookmarkIcon = styled(BookmarkSVG)`
  width: 82%;
`;

const BookmarkFillIcon = styled(BookmarkSelectedSVG)`
  width: 82%;
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
    <Container page={page || ''}>
      {isBookmarked ? (
        <Button type="button" onClick={handleRemoveBookmark}>
          <BookmarkFillIcon />
        </Button>
      ) : (
        <Button type="button" onClick={handleAddBookmark}>
          <BookmarkIcon />
          {/* <BsBookmarkFill size="24" outline /> */}
        </Button>
      )}
    </Container>
  );
}

export default Bookmark;
