import React, { useState, useRef, useMemo } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  height: 8%;
  background: white;
  border: 1px solid black;
`;

function TitleInput({ datas, onUpdate }) {
  const [title, setTitle] = useState('');

  const handleInputChange = ({ target }) => {
    setTitle(target.value);
  };

  const updateTitle = () => {
    onUpdate('title', title);
  };

  return (
    <Input
      type="text"
      value={title}
      onChange={handleInputChange}
      onBlur={updateTitle}
      placeholder="제목을 입력하세요"
    />
  );
}

export default TitleInput;
