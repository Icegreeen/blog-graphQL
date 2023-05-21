import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    :root {
        --background-color: hsla(0, 0%, 100%, .9);
        --primary-color: #290742;
        --secondary-color: #333;
        --text-color: #fff;

        --h1: #27272a;
        --p:  #404047;
    }

    body {
        margin: 0;
        padding; 0;
        font-family: Ariel, sans-serif;
        background-color: var(--background-color); //FBF6FF
        font-family: 'Ubuntu', sans-serif;

        
    }
`;

export default GlobalStyles;