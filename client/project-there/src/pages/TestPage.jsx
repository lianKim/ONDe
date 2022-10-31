import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAccessToken } from '../lib/utills/controlAccessToken';

import { authAPI } from '../lib/utills/http';

const Wrapper = styled.div`
  padding: 320px;
`;

function TestPage(props) {
  const accessToken = getAccessToken();
  const [name, setName] = useState('');

  const authenticationUser = async () => {
    try {
      const nextName = await authAPI(accessToken);
      console.log(`nextName: ${nextName}`);
      setName(nextName);
    } catch (err) {
      const { errCode, errMessage } = err.response.data;
      console.log(errCode);
      console.log(errMessage);
    }
  };

  useEffect(() => {
    authenticationUser();
  }, []);

  return (
    <Wrapper>
      <div>인증이 필요한 페이지</div>
      {name && (
        <div>
          <span>안녕하세요, </span>
          <span>{`${name}님!`}</span>
        </div>
      )}
    </Wrapper>
  );
}

export default TestPage;
