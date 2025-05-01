// themes.js
import { createGlobalStyle } from "styled-components";

export const lightTheme = {
  body: "#fff",
  text: "#121212",
};

export const darkTheme = {
  body: "#121212",
  text: "#fff",
};

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    margin: 0;
    font-family: "Poppins", sans-serif;
    transition: all 0.3s ease;
  }
`;
