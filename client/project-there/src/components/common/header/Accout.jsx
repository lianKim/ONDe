import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthValue } from '../../../contexts/AuthContext';
import MyPagePopOver from './MyPagePopOver';

const Wrapper = styled.div`
  position: relative;

  & button {
  }
`;

const Button = styled.button`
  background: none;
  border: 0;
  padding: 0;
  margin: 0;

  color: var(--color-gray100);
  letter-spacing: normal;
  font-size: var(--font-small);
`;

function Accout() {
  const { id } = useAuthValue();
  const [visible, setVisible] = useState(false);

  const handleToggleMyPage = () => {
    setVisible(!visible);
  };

  const closeMyPage = () => {
    setVisible(false);
  };

  return (
    <Wrapper>
      {id ? (
        <>
          <Button type="button" onClick={handleToggleMyPage}>
            {id}
          </Button>
          {visible && <MyPagePopOver onClose={closeMyPage} />}
        </>
      ) : (
        <Link to="/signin">
          <Button type="button">login</Button>
        </Link>
      )}
    </Wrapper>
  );
}

export default Accout;
