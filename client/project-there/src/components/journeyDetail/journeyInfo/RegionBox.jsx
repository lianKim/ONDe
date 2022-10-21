import React from 'react';
import styled from 'styled-components';
import colors from '../../../lib/constants/colors';

const { gray100, green300 } = colors;

function RegionBox() {
  return (
    <div>
      <button type="button">서울</button>
      <button type="button">용인</button>
    </div>
  );
}

export default RegionBox;
