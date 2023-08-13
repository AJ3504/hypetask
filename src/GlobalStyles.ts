import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  html {
    scroll-behavior: smooth;
  }

  *{
    box-sizing: border-box;
  }

  body {
    /* background-color: #040714; */
    background-color: #474D73;
    color: #f9f9f9;

    font-family: Avenir-Roman, sans-serif;
    margin: 0;
    padding: 0;
  }

  a,
  a:visited
  {
    text-decoration: none;
    transition: color 0.2s ease;
  }

  @media only screen and (min-width: 768px) {
    body {
      font-size: 16px;
    }
  }
  @media only screen and (min-width: 480px) and (max-width: 768px) {
    body {
    font-size: 15px;
    }
  }
  @media only screen and (max-width: 479px) {
    body {
      font-size: 14px;
    }
  }
`;

export default GlobalStyle;
