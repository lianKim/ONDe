// import React, { useEffect } from 'react';
// import styled from 'styled-components';
// import {
//   useJourneyDetailActions,
//   useJourneyDetailValue,
// } from '../../../contexts/journeyDetail';

// import NewJourneyProvider from '../../../contexts/newJourney';
// import colors from '../../../lib/constants/colors';
// import ContentArea from './ContentArea';
// import TitleArea from './TitleArea';

// const { gray100, green300 } = colors;

// const Container = styled.div`
//   width: 66.66vw;
//   padding: 140px 100px;
//   background: ${gray100};
//   color: ${green300};
//   border: 1px solid red;
//   height: 100vh;

//   & button {
//     color: ${green300};
//     font-size: 0.95rem;
//     font-weight: 400;
//     padding: 6px 14px;
//     margin-right: 8px;
//     background: ${gray100};
//     border: 0.5px solid ${green300};
//     border-radius: 24px;
//   }
// `;

// function JourneyInfo({ journeyId }) {
//   const { getDatas } = useJourneyDetailActions();
//   const journey = useJourneyDetailValue();
//   console.log(`journey: ${journey.journeyId}`);

//   useEffect(() => {
//     console.log(`journeyId: ${journey.journeyId}`);
//     getDatas(journeyId);
//   }, []);

//   return (
//     <NewJourneyProvider>
//       <Container>
//         <TitleArea />
//         <ContentArea />
//       </Container>
//     </NewJourneyProvider>
//   );
// }

// export default JourneyInfo;

import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  useJourneyDetailActions,
  useJourneyDetailValue,
} from '../../../contexts/journeyDetail';

import NewJourneyProvider, {
  useNewJourneyValue,
} from '../../../contexts/newJourney';
import colors from '../../../lib/constants/colors';
import ContentArea from './ContentArea';
import TitleArea from './TitleArea';
import ViewMorePopOver from './ViewMorePopOver';

const { gray100, green300 } = colors;

const Container = styled.div`
  position: relative;
  width: 66.66vw;
  padding: 140px 100px;
  background: ${gray100};
  color: ${green300};
  border: 1px solid red;
  height: 100vh;

  & button {
    color: ${green300};
    font-size: 0.95rem;
    font-weight: 400;
    padding: 6px 14px;
    margin-right: 8px;
    background: ${gray100};
    border: 0.5px solid ${green300};
    border-radius: 24px;

    &.btnViewMore {
      position: absolute;
      top: 140px;
      right: 100px;
      background: none;
      border: 0;
      padding: 0;
      margin: 0;
      font-weight: bold;
    }
  }
`;

const ViewMore = styled.div`
  position: relative;

  & button {
    position: absolute;
    top: 140px;
    right: 100px;
    background: none;
    border: 0;
    font-weight: bold;
  }
`;

function JourneyInfo({ journeyId }) {
  const journeyInfo = useNewJourneyValue();
  const { getDatas, updateData } = useJourneyDetailActions();
  const journey = useJourneyDetailValue();
  console.log(`journeyId: ${journey.journeyId}`);

  useEffect(() => {
    getDatas(journeyId);
  }, [journey]);

  const [visible, setVisible] = useState(false);

  const handleOpenPopOver = () => {
    setVisible(!visible);
  };

  return (
    <NewJourneyProvider>
      <Container>
        <TitleArea />
        <ContentArea />
        <div>
          <button
            type="button"
            className="btnViewMore"
            onClick={handleOpenPopOver}
          >
            더보기
          </button>
          {visible && <ViewMorePopOver journeyId={journeyId} />}
        </div>
      </Container>
    </NewJourneyProvider>
  );
}

export default JourneyInfo;
