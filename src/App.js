import React from "react";
import { ThemeProvider } from "styled-components";
import Loader from "./component/Loader";
import { GlobalStyle } from "./css/GlobalStyle";
import KurtiUi from "./KurtiUI/KurtiUi";
import GlobalContext from "./Context/GlobalContext";
import { ColorRing } from "react-loader-spinner";
import Login from "./KurtiUI/Login";

const App = () => {
  window["setAuthToken"] = setToken;
  // window["setAuthToken"] = setToken;
  const [isLogIn, setLogIn] = React.useState(false);

  React.useEffect(() => {
    let user = localStorage.getItem("user_login");
    if (user) {
      user = JSON.parse(user);
      console.log("         ", user.user_login);
      setLogIn(user.user_login);
    }
    if (typeof window !== "undefined") {
      console.log(window, "window location");
      console.log(window.location, "window location");
      // Your code that uses the window object
    }
  }, []);
  function setToken(token_value) {
    if (token_value.length > 0) {
      setLogIn(true);
      localStorage.setItem("app_token", token_value);
    }
  }
  const theme = {
    colors: {
      dark_color: "#0D0D0D",
      dark_color2: "#61677A",
      light_color: "#FFFFFF",
      light_color2: "#F0F0F0",
      border_highlight: "#E5D283",
      text_color: "#626778",
      border_color: "#626778",
      text_highlight_color: "#F603CF",
      border_highlight_color: "#F603CF",
      footer_bg_color: "#FDFAF5",
      footer_text_underline: "#FFC107",
      desktop_light_color: "#FFFFFF",
    },
    media: {
      mobile: "768px",
      tab: "998px",
      laptop: "1280px",
    },
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        {!isLogIn ? (
          <>
            <Login setLogIn={setLogIn} />
            {/* <div
              style={{
                height: "100dvh",
                width: "100dvw",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ColorRing
                visible={true}
                height="100"
                width="100"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
              />
            </div> */}
          </>
        ) : (
          <GlobalContext.Provider value={setLogIn}>
            {/* <Header/> */}
            <KurtiUi />
            <Loader />
            {/* <Footer/> */}
          </GlobalContext.Provider>
        )}
        {/* <Demo/> */}
      </ThemeProvider>
    </>
  );
};
export default App;
