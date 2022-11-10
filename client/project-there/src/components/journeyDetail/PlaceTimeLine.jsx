import React, { useContext, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import PlaceTimeLineElement from './PlaceTimeLineElement';
import PlaceTimeLineTimeIndicator from './PlaceTimeLineTimeIndicator';
import { useTargetPlaceInfoValue } from '../../contexts/TargetPlaceInfoContext';
import { makeTimeLineListFromTargetPlace } from '../../lib/hooks/useJourneyDetail';

const PlacesDetailsHolder = styled.div`
  width: 100%;
  height: 60%;
  .noPlaceInform{
    width: 100%;
    height: 30vh;
    padding-left: 5vw;
    color: var(--color-gray400);
    font-size: var(--font-medium);
  }
  .vertical-timeline {
    padding-left: 5vw;
    padding-top: 0px;
  }
`;
const StyledVerticalTimeline = styled(VerticalTimeline)`
  ::before {
    width: 2px !important;
    margin-left: 5vw;
  }
`;

export default function PlaceTimeLine({ focusedPlace, hover, edit }) {
  const targetPlacesData = useTargetPlaceInfoValue();
  const [timeLineList, setTimeLineList] = useState([]);
  const holderRef = useRef();
  const [hoverPlace, setHoverPlace] = hover;

  const handleMouseOver = (e) => {
    const targetElement = e.currentTarget.className.split(' ')[2].slice(24);
    if (hoverPlace !== targetElement) {
      setHoverPlace(targetElement);
    }
  };

  useEffect(() => {
    makeTimeLineListFromTargetPlace(targetPlacesData, setTimeLineList);
  }, [targetPlacesData?.length]);

  useEffect(() => {
    // timeLineElement에 hover event를 걸어줌
    if (holderRef) {
      const $timeLineElement = holderRef.current.querySelectorAll(
        '.vertical-timeline-element',
      );
      $timeLineElement?.forEach((element) => {
        element.addEventListener('mouseover', handleMouseOver);
      });
    }
  }, [timeLineList]);

  return (
    <PlacesDetailsHolder ref={holderRef}>
      {targetPlacesData?.length === 0 && (<div className="noPlaceInform">등록된 장소가 없습니다.</div>)}
      {targetPlacesData?.length !== 0 && (
      <StyledVerticalTimeline layout="1-column-left" lineColor="#51A863">
        {timeLineList?.map((element) => {
          if (element.elapsedTime) {
            return (
              <PlaceTimeLineTimeIndicator
                elapsedTime={element.elapsedTime}
                date={element.date}
                key={element.elapsedTime}
              />
            );
          }
          return (
            <PlaceTimeLineElement
              target={element}
              key={`${element.placeId}-${element.placeName}`}
              focusedPlace={focusedPlace}
              edit={edit}
            />
          );
        })}
      </StyledVerticalTimeline>
      )}
    </PlacesDetailsHolder>
  );
}
