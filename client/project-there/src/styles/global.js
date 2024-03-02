import { createGlobalStyle } from 'styled-components';
// import colors from '../lib/constants/colors';

// const {
//   gray100,
//   gray200,
//   gray300,
//   gray400,
//   gray500,
//   green100,
//   green200,
//   green300,
//   blue100,
// } = colors;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap');


@font-face {
  font-family: 'Poppins', sans-serif;
  src: url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap')
    format("woff");
  font-weight: normal;
  font-style: normal;
  unicode-range: U+0041-005A, U+0061-007A;
}

@font-face {
  font-family: 'Noto Sans KR', sans-serif;
  src: url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap')
    format("woff");
  font-weight: normal;
  font-style: normal;
  unicode-range: U+AC00-U+D7A3;
}

  :root {
    --color-gray100: #F9FAFA;
    --color-gray200: #F4F5F5;
    --color-gray300: #DDE4E5;
    --color-gray400: #BCC4C6;
    --color-gray500: #828989;
    --color-green100: #51A863;
    --color-green200: #2B5643;
    --color-green300: #1C4032;
    --color-blue100: #4696D3;
    --color-red100: #fa7947;
    --color-lemon100: #F7FB32;

    --font-micro: 14px;
    --font-small: 16px;
    --font-regular: 18px;
    --font-medium: 28px;
    --font-large: 36px;
    --font-huge: 42px;

    --weight-thin: 100;
    --weight-light: 300;
    --weight-regular: 400;
    --weight-semi-bold: 500;
    --weight-bold: 700;

    --size-border-radius-small: 4px;
    --size-border-radius-large: 8px;

    --animation-duration: 300ms;
  }

  *, *::before, *::after {
    box-sizing: border-box;
    letter-spacing: -0.0625em;
  }

  *:focus {
    outline: 0;
  }

  html {
    height: 100%;
  }

  body {
    white-space: nowrap;
    color: var(--color-green300);
    background: var(--color-gray100);
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;
    letter-spacing: -0.0625em;
    overflow-x: hidden;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    color: var(--color-green100);
    background: var(--color-gray100);
    border: 0.5px solid var(--color-green100);
    border-radius: 20px;
    padding: 0.6em 1.5em;
    font-size: var(--font-micro);

    &.selected {
      color: var(--color-gray100);
      background: var(--color-green100);
    }
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--color-green300);
  }

  input {
    color: var(--color-green200);

    &::placeholder {
      color: var(--color-gray400);
    }
  }

  textarea {
    font-family: 'Poppins', 'Noto Sans KR', sans-serif;

    &::placeholder {
      color: var(--color-gray400);
    }
  }
`;

export default GlobalStyle;
