import { createGlobalStyle } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

export const GlobalStyle = createGlobalStyle`

html{
      @media (max-width: 1080px) {
        font-size : 93.75%; //15px
      }
      @media (max-width: 720px) {
        font-size : 87.5%; //14px
      }
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  

  @media(max-width: 720px) {
    .toast{
      width: 80%;
      margin: 2rem auto;
    }
  }
  

  body{
    background: ${(props) => props.theme.background};

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: antialiased;
  }

  body, input, textarea, button{
    font-family: "Roboto", sans-serif;
    font-weight: 400;
    font-size: 1rem
  }

`
