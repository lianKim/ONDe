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
  display: flex;
  align-items: center;
  gap: 8px;

  color: var(--color-green300);
  letter-spacing: normal;
  font-size: var(--font-small);

  & > span {
    font-family: 'Poppins', sans-serif;
    letter-spacing: -0.03em;
    font-size: var(--font-small);
    font-weight: var(--weight-semi-bold);
  }
`;

const ProfileImageBox = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background: var(--color-gray400);

  & > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

function Accout() {
  const { id, profileImageUrl } = useAuthValue();
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
            <ProfileImageBox>
              <img src={profileImageUrl || ''} alt="" />
            </ProfileImageBox>
            <span>{id}</span>
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
