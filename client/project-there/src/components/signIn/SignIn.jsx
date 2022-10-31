import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';
import { setRefreshToken } from '../../lib/utills/controlRefreshToken';
import { setAccessToken } from '../../lib/utills/controlAccessToken';
import { signinAPI } from '../../lib/utills/http';

const Wrapper = styled.div`
  width: 100%;
  padding-top: 100px;
  font-size: var(--font-small);
`;

const Form = styled.form`
  margin: 0 auto;
  margin-bottom: 16px;
  width: 30%;
  padding: 20px 20px;
`;

const InputLabel = styled.div`
  padding: 8px 8px 8px 0;
  width: 80%;
  margin: 0 auto;
`;

const H2 = styled.h2`
  text-align: center;
  margin-bottom: 24px;
  font-size: var(--font-regular);
`;

const SignInButton = styled.button`
  display: block;
  width: 80%;
  margin: 18px auto;
  padding: 8px 0;
  font-size: var(--font-small);
  background-color: var(--color-green100);
  color: var(--color-gray100);
  font-weight: var(--weight-bold);
  border: none;
`;

const Row = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 18px;
  padding: 8px;
  width: 80%;
`;

const TextInput = styled.input`
  width: 70%;
  padding: 8px;
  border: 0.5px solid var(--color-green100);
  font-size: 1em;

  &:focus {
    outline: none;
    border: 1px solid #51a863;
  }
`;

function SignIn() {
  // 폼데이터 관리용 상태
  const [loginForm, setLoginForm] = useState({
    id: '',
    password: '',
  });

  const handleClickLogin = async (e) => {
    e.preventDefault();

    console.log(loginForm);

    try {
      const {
        accessToken,
        grantType,
        refreshToken,
        refreshTokenExpirationTime,
      } = await signinAPI(loginForm);

      setRefreshToken(refreshToken, refreshTokenExpirationTime);
      setAccessToken(accessToken);

      // 수정 필요해보임
      window.location.replace('/test');
    } catch (err) {
      const { errCode, errMessage } = err.response.data;
      alert(errMessage);
    }
  };

  // 폼데이터 상태 관리
  const handleChangeForm = ({ target }) => {
    setLoginForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <Wrapper>
      <H2>로그인</H2>
      <Form>
        <InputLabel>아이디</InputLabel>
        <Row>
          <TextInput
            placeholder="아이디"
            name="id"
            onChange={handleChangeForm}
          />
        </Row>
        <InputLabel>비밀번호</InputLabel>
        <Row>
          <TextInput
            type="password"
            placeholder="비밀번호"
            name="password"
            onChange={handleChangeForm}
          />
        </Row>
        <Row>
          <span>회원이 아니신가요?</span>
          <Link to="/signup">회원가입</Link>
        </Row>
        <SignInButton onClick={handleClickLogin}>로그인</SignInButton>
        <a href="http://localhost:8080/oauth2/authorization/google">
          <SignInButton type="button">구글 로그인</SignInButton>
        </a>
      </Form>
    </Wrapper>
  );
}

export default SignIn;
