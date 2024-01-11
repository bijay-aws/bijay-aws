import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Mukta', sans-serif;
    }
    html {
        font-size: 62.5%;
        overflow-x: hidden;
        min-height: -webkit-fill-available;
       ::-webkit-scrollbar{
            width: 2rem;
        }
        ::-webkit-scrollbar-track {
            background-color: rgb(255 0 0);
        }
        ::-webkit-scrollbar-thumb {
            background: #fff;
            border: 4px solid transparent;
            border-radius: 1rem;
            background-clip: content-box;
        }
    }
    body {
       overflow-x: hidden;
       scrollbar-width: thin;
       background-color: ${({theme})=>theme.colors.dark_color};
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
       box-sizing: border-box;
       min-height: 100vh;
       min-height: -webkit-fill-available;
    }
    body::-webkit-scrollbar{
        width: 1.5rem;
    }
    body::-webkit-scrollbar-track {
        background-color: rgb(24 24 29);
    }
    body::-webkit-scrollbar-thumb {
        background: #fff;
        border: 5px solid transparent;
        border-radius: 9px;
        background-clip: content-box;
    }
    li{
        list-style: none;
        text-decoration: none;
    }
    @media screen and  (max-width:${({theme})=>theme.media.laptop}){
        html{
            font-size:55.5%;
            overflow-x: hidden;
        }
    }
    @media screen and  (max-width:1024px){
        html{
            font-size:54%;
            overflow-x: hidden;
        }
    }
    @media screen and  (max-width:${({theme})=>theme.media.tab}){
        html{
            font-size:52%;
            overflow-x: hidden;
            
        }
    }
    @media screen and  (max-width:${({theme})=>theme.media.mobile}){
        html,body {
            overflow-x: hidden;
            font-size:48%;
        }
    }
  
`;