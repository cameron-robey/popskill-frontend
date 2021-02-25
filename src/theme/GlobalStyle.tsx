import { createGlobalStyle } from 'styled-components';
import { lighten, darken } from 'polished';

import { Theme } from './Theme';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    font-family: proxima-nova, sans-serif;
    font-style: normal;

  }
  a {
    text-decoration: none;
    color: ${Theme.colors.primary};

    &:hover {
      text-decoration: underline;
      color: ${darken(0.1,Theme.colors.primary)};
    }
  }

  h1 {
    font-size: 2.4rem;
    margin: 10px 0;
  }
  h2 {
    font-size: 1.8rem;
  }

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0,0,0,.1);
  }
`;