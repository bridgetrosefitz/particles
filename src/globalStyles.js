import { createGlobalStyle } from "styled-components";

import GambettaLight from './fonts/Gambetta-Light.woff';
import GambettaLight2 from './fonts/Gambetta-Light.woff2';

import GambettaBold from './fonts/Gambetta-Bold.woff';
import GambettaBold2 from './fonts/Gambetta-Bold.woff2';

export const GlobalStyle = createGlobalStyle`


@font-face {
    font-family: 'Gambetta';
    src: local('Gambetta'), local('Gambetta'),
    url(${GambettaLight}) format('woff'),
    url(${GambettaLight2}) format('woff2');
    font-weight: 300;
}
@font-face {
    font-family: 'Gambetta';
    src: local('Gambetta'), local('Gambetta'),
    url(${GambettaBold}) format('woff'),
    url(${GambettaBold2}) format('woff2');
    font-weight: 700;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: 'Gambetta', serif;
}

`