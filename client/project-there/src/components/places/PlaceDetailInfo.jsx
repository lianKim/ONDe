import React, { useRef, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledInfoHolder = styled.div`
  width: 50%;
  height: 100%;
  padding: 2%;
  overflow: hidden;
`;
const StyledTitle = styled.h2`
  font-size: 24px;
  font-weight: 300;
  letter-spacing: -4%;
  margin-bottom: 10%;
`;
const StyeldContents = styled.p`
  font-weight: 300 !important;
  font-size: 14px !important;
  letter-spacing: -4% !important;
  max-height: 80%;
  /* height : ${(props) => props.displayOverFlowed && '80%'}; */
  text-overflow: ${(props) => !props.displayOverFlowed && 'ellipsis'};
  overflow: ${(props) => (props.displayOverFlowed ? 'auto' : 'hidden')};
  word-break: break-all;
  display: ${(props) => !props.displayOverFlowed && '-webkit-box'};
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const StyledContentDetail = styled.div`
  color: #bcc4c6;
  font-size: 12px;
  font-weight: 500;
  position: relative;
  top:5px;
  cursor: pointer;
  ::after{
    content: "";
    display: block;
    width: 100%;
    border-bottom: 1px solid  #bcc4c6;
    position: relative;
    top: 5px;
  }
`;

export default function PlaceDetailInfo() {
  const [isOverflowed, setIsOverFlowed] = useState(false);
  const [displayOverflowed, setDisplayOverFlowed] = useState(false);
  const textRef = useRef();
  const content = `본문입니다. 글이 많을 경우 ellipsis로 표시될 것입니다. 따라서 이것은 테스트입니다. 어떻게 되는지 한 번 봅시다.
  더 많은 글이 있을 경우 어떻게 될까요?? 이게 짤릴까요?? 그러면 어떻게 표시해야 할까요??
  더 많은 글을 적어봅니다. 완전 많이 적는 거죠 그래서 max height를 초과했을 경우 어떻게 표시되는지 
  테스트해봅시다.
  아직까지 안되었네.. 완전 많이 적을 수 있구나
  그러면 완전 좋지요~~!
  아직 멀었다. 완전 많이 적자
  적자 적자 많이 적자
  흑자가 좋지요
  또 또 이거 댜러ㅐㄷ저랮댜ㅓ랮댜ㅓ래쟈덜먀ㅓㄹ;먀덜;ㅑ덜
  ㅁㅈ댜ㅐ럼;ㅐㅈ댜러;ㅁㅈ댜ㅐㅓㄹ;매ㅑㅈㄷ;ㄹ먀재덜ㅈㄷ
  ㅁ;재ㅑㅐ덜;매재ㅑㄷ럼;절ㅈㄷㄹ
  ;매ㅑㅈ덜;매ㅑㅓㄹㄷ매;ㅑㅈ러
  `;

  useEffect(() => {
    if (textRef && !displayOverflowed) {
      const overFlowCheck = textRef.current.scrollHeight > textRef.current.clientHeight;
      setIsOverFlowed(overFlowCheck);
    }
  }, [textRef, displayOverflowed]);

  const handleContentClick = () => {
    setDisplayOverFlowed((pre) => !pre);
  };

  return (
    <StyledInfoHolder>
      <StyledTitle>타이틀타이틀타이틀</StyledTitle>
      <StyeldContents
        ref={textRef}
        displayOverFlowed={displayOverflowed}
      >
        {content}
      </StyeldContents>
      {isOverflowed && (
      <StyledContentDetail
        onClick={handleContentClick}
      >
        {!displayOverflowed ? '더보기' : '접기'}
      </StyledContentDetail>
      )}
    </StyledInfoHolder>
  );
}
