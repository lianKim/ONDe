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

  .noPlaceInform {
    width: 100%;
    height: 30vh;
    padding-left: 3vw;
    color: var(--color-gray400);
    font-size: var(--font-regular);
  }
  .vertical-timeline {
    padding-left: 3vw;
    padding-top: 0px;
  }
`;
const StyledVerticalTimeline = styled(VerticalTimeline)`
  ::before {
    width: 0.5px !important;
    margin-left: 3vw;
  }
`;

export default function PlaceTimeLine({ hover, edit }) {
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
    // timeLineElement에 hover되었을 때, 해당 element를 hover 되었다고 받아줌
    if (holderRef) {
      const $timeLineElement = holderRef.current.querySelectorAll(
        '.vertical-timeline-element',
      );
      $timeLineElement?.forEach((element) => {
        element.addEventListener('mouseover', handleMouseOver);
        element.addEventListener('mouseleave', () => setHoverPlace(''));
      });
    }
  }, [timeLineList]);

  return (
    <PlacesDetailsHolder ref={holderRef}>
      {targetPlacesData?.length === 0 && (
        <div className="noPlaceInform">등록된 장소가 없습니다.</div>
      )}
      {targetPlacesData?.length !== 0 && (
        <StyledVerticalTimeline layout="1-column-left" lineColor="black">
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
                edit={edit}
              />
            );
          })}
        </StyledVerticalTimeline>
      )}
    </PlacesDetailsHolder>
  );
}
