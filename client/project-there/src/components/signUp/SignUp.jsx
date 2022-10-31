import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { checkEmailAPI, checkIdAPI, signupAPI } from '../../lib/utills/http';

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

const SignUpButton = styled.button`
  display: block;
  width: 80%;
  margin: 48px auto 24px;
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

const CheckButton = styled.button`
  width: 20%;
  line-height: 1;
  padding: 8px;

  &:hover {
    cursor: pointer;
  }
`;

function SignUp() {
  // 파일업로드 UI 커스텀 하기 위해 hidden으로 숨기고 ref를 이용하여 호출하기 위한 코드
  const fileInput = useRef();
  const [file, setFile] = useState(null);

  // 아이디, 이메일 인증 완료 시에만 데이터 전송 가능
  const [checkId, setCheckId] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);
  // 폼 데이터 상태 관리
  const [userForm, setUserForm] = useState({
    id: '',
    email: '',
    name: '',
    password: '',
    passwordConfirm: '',
  });

  // 이메일 인증 요청 성공 시 로그인 페이지로 이동해주는 함수
  const navigate = useNavigate();

  // 폼 데이터 값이 변경되면 userForm 값 업데이트
  const handleChangeForm = ({ target }) => {
    setUserForm((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleClickSignUp = async (e) => {
    e.preventDefault();

    console.log(userForm);

    // 아이디, 이메일 미인증 시 요청 거부
    if (!checkId) {
      return alert('아이디 중복 확인을 완료해주세요!');
    }

    if (!checkEmail) {
      return alert('이메일 중복 확인을 완료해주세요');
    }

    try {
      const { message, email } = await signupAPI({
        id: userForm.id,
        email: userForm.email,
        name: userForm.name,
        password: userForm.password,
      });

      alert(`${message} 이메일:${email}`);
      navigate('/signin');
    } catch (err) {
      const { errCode, errMessage } = err.response.data;
      alert(errMessage);
      setCheckId(false);
      setCheckEmail(false);
    }
  };

  // 이미지 업로드 버튼을 클릭하면 숨겨뒀던 파일 업로드가 클릭되게 한다.
  const handleClickImgUploadBtn = (e) => {
    e.preventDefault();
    fileInput?.current.click();
  };

  // 중복 확인 함수 (아이디, 이메일에 적용할)
  const checkIsAvailable = async (item, checkAPI, setState) => {
    try {
      const result = await checkAPI(userForm[item]);

      if (result) {
        setState(true);
        alert('중복확인이 완료되었습니다!');
      } else {
        setState(false);
        alert(`중복된 ${item} 입니다!`);
      }
    } catch (err) {
      const { errMessage } = err.response.data;
      setState(false);
      alert(errMessage);
    }
  };

  // 아이디 중복 확인
  const handleCheckId = (e) => {
    e.preventDefault();

    checkIsAvailable('id', checkIdAPI, setCheckId);

    // try {
    //   const result = await checkIdAPI(userForm.id);

    //   if (result) {
    //     setCheckId(true);
    //     alert('중복 확인이 완료되었습니다!');
    //   } else {
    //     setCheckId(false);
    //     alert('중복된 아이디 입니다!');
    //   }
    // } catch (err) {
    //   const { errCode, errMessage } = err.response.data;
    //   setCheckId(false);
    //   alert(errMessage);
    // }
  };

  // 이메일 중복 확인
  const handleCheckEmail = async (e) => {
    e.preventDefault();

    checkIsAvailable('email', checkEmailAPI, setCheckEmail);
  };

  return (
    <Wrapper>
      <H2>회원가입</H2>
      <Form>
        <InputLabel>아이디</InputLabel>
        <Row style={{ justifyContent: 'space-between' }}>
          <TextInput
            placeholder="아이디"
            name="id"
            onChange={handleChangeForm}
          />
          <CheckButton onClick={handleCheckId}>중복확인</CheckButton>
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

        <InputLabel>비밀번호 확인</InputLabel>
        <Row>
          <TextInput
            type="password"
            placeholder="비밀번호 확인"
            name="passwordConfirm"
            onChange={handleChangeForm}
          />
        </Row>

        <InputLabel>이메일</InputLabel>
        <Row style={{ justifyContent: 'space-between' }}>
          <TextInput
            placeholder="이메일"
            name="email"
            onChange={handleChangeForm}
          />
          <CheckButton onClick={handleCheckEmail}>중복확인</CheckButton>
        </Row>
        <InputLabel>이름</InputLabel>
        <Row>
          <TextInput
            placeholder="이름"
            name="name"
            onChange={handleChangeForm}
          />
        </Row>

        <SignUpButton onClick={handleClickSignUp}>회원가입</SignUpButton>
      </Form>
    </Wrapper>
  );
}

export default SignUp;
