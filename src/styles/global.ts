import { createGlobalStyle } from 'styled-components';
/**
 * Exemplo de implementação de estilos globais na aplicação
 */
export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  :root {
    --white: #fff;

    --white-opacity: rgba(255,255,255,0.9);

    --gray-30: #f4ede8;
    --gray-100: #e1e1e6;
    --gray-300: #a8a8b3;
    --gray-500: #666360;
    --gray-700: #323238;
    --gray-800: #29292e;
    --gray-830: #999591;
    --gray-850: #1f2729;
    --gray-870: #232129;
    --gray-900: #121215;

    --gray-with-opacity: rgba(80,80,80,0.2);

    --red-300: #c53030;

    --green-500: #1B5E20;

    --cyan-500: #61dafb;
    --yellow-500: #ff9f1c;
  }

  @media (max-width: 1080px) {
    html {
      font-size: 93.75%
    }
  }

  @media (max-width: 720px) {
    html {
      font-size: 87.5%
    }
  }

  @media (max-width: 425px) {
    html {
      font-size: 68.2%
    }
  }

  body {
    background: var(--gray-900);
    color: var(--white);
  }

  body, input, textarea, select, button {
    font: 500 1rem "Roboto", sans-serif;
  }

  button {
    cursor: pointer;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  h1, h2, h3, h4, h5, strong {
    font-weight: 500;
  }
`;
