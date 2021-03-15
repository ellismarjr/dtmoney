import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  :root {
    --red: #e52e4d;
    --blue: #5429CC;
    
    --blu-light: #6933FF;
    
    --text-title: #363f5f;
    --text-body: #969cb3;
    
    --background: #f0f2f5;
    --shape: #FFF;
  }

  * {
    margin: 0;
    padding: 0;
   box-sizing: border-box;
  }

  html {
    @media (max-with: 1000px) {
      font-size: 93.75%;
    }

    @media (max-with: 728px) {
      font-size: 87.5%;
    }
  }

  body {
    background: var(--background);
    -webkit-font-smoothing: antialiased;
  }

  button {
    cursor: pointer;
  }

  [disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }

`;

