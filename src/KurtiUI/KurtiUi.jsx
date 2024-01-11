import React from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { BsChevronCompactDown } from "react-icons/bs";
import styled from "styled-components";
import MainMenu from "../component/MainMenu";
import Web3D from "../component/Web3D";
import { mKurtiObj } from "../component/Web3D";
const KurtiUi = () => {
  const [menuOpen, setOpen] = React.useState(false);
  const hideContainer = () => {
    const tout = setTimeout(() => {
      clearTimeout(tout);
      document.getElementById("ui-container").style.display = "none";
    }, 200);
    const tout1 = setTimeout(() => {
      setOpen(false);
      clearTimeout(tout1);
    }, 200);
  };
  return (
    <Wrapper>
      <section className="container">
        <Web3D />
        <div className="main_container" id="main_container">
          <div
            className="menu_icon"
            id="menu_icon"
            onClick={() => {
              document.getElementById("menu_icon").style.visibility = "hidden";
              document.getElementById("ui-main").style.animationName =
                "nav_anim_open";
              const tout = setTimeout(() => {
                setOpen(true);
                clearTimeout(tout);
              }, 100);
              if (mKurtiObj) {
                mKurtiObj.setModelAnim(true, 0);
              }
            }}
          >
            <AiOutlineMenu />
          </div>
          <div className="ui-main" id="ui-main">
            <div className="down_arrow">
              <BsChevronCompactDown
                style={{ rotate: menuOpen ? "" : "180deg" }}
                onClick={() => {
                  if (menuOpen) {
                    if (window.innerHeight <= 700) {
                      document.getElementById("ui-main").style.transform =
                        "translateY(78%)";
                      console.log("innnnnnnnnnn height 700");
                      hideContainer();
                    } else if (window.innerWidth <= 768) {
                      document.getElementById("ui-main").style.transform =
                        "translateY(81%)";
                      console.log("innnnnnnnnnn width 768");
                      hideContainer();
                    } else if (
                      window.innerWidth > 768 &&
                      window.innerWidth <= 998
                    ) {
                      document.getElementById("ui-main").style.transform =
                        "translateY(82%)";
                      console.log("innnnnnnnnnn width 998");
                      hideContainer();
                    } else {
                      // document.getElementById("ui-main").style.transform="translateY(0%)";
                      // console.log("desktop")
                      // hideContainer();
                    }
                    if (mKurtiObj) {
                      mKurtiObj.setModelAnim(true, 1);
                    }
                  } else {
                    // document.getElementById("ui-main").style.marginTop ="0";
                    document.getElementById("ui-main").style.transform =
                      "translateY(0)";
                    document.getElementById("ui-container").style.display =
                      "block";
                    if (mKurtiObj) {
                      mKurtiObj.setModelAnim(false, 1);
                    }
                    const tout = setTimeout(() => {
                      setOpen(true);
                      clearTimeout(tout);
                    }, 100);
                  }
                }}
              />
            </div>

            <div className="ui-container" id="ui-container">
              <div
                className="cross-icon"
                id="cross-icon"
                onClick={() => {
                  document.getElementById("menu_icon").style.visibility =
                    "visible";
                  document.getElementById("ui-main").style.animationName =
                    "nav_anim_close";
                  const tout = setTimeout(() => {
                    setOpen(false);
                    clearTimeout(tout);
                  }, 100);
                  if (mKurtiObj) {
                    mKurtiObj.setModelAnim(false, 0);
                  }
                }}
              >
                <AiOutlineClose />
              </div>
              <MainMenu />
            </div>
          </div>
          <div className="bottom_bar">
            <div className="bottom_bar_2"></div>
          </div>
        </div>
      </section>
    </Wrapper>
  );
};
export default KurtiUi;
const Wrapper = styled.main`
  padding: 0%;
  margin: 0%;
  overflow: hidden;
  width: 100%;
  height: 100%;
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0%;
    padding: 0%;
    display: flex;
    flex-direction: row-reverse;
    .main_container {
      width: 100%;
      height: auto;
      /* position: absolute; */
      /* overflow: hidden; */
      transition: all linear 0.1s;
      pointer-events: none;
      z-index: 1;
      display: flex;
      margin-top: 2rem;
      /* flex-direction: column; */
      max-height: 45rem;
      .menu_icon {
        margin: 1rem 1rem 1rem 15rem;
        pointer-events: all;
        /* position: absolute; */
        font-size: 4rem;
        line-height: 1rem;
        color: ${({ theme }) => theme.colors.light_color2};
        z-index: 10;
        cursor: pointer;
        :active {
          color: ${({ theme }) => theme.colors.light_color};
        }
      }
      .cross-icon {
        pointer-events: all;
        font-size: 4rem;
        color: ${({ theme }) => theme.colors.light_color2};
        cursor: pointer;
        position: absolute;
        right: 2%;
        line-height: 0;
        transform: translateY(-10%);
        :active {
          color: ${({ theme }) => theme.colors.light_color};
        }
      }
      .bottom_bar {
        pointer-events: all;
        width: 100%;
        background-color: ${({ theme }) => theme.colors.light_color};
        padding: 1rem 0;
        z-index: 2;
        margin: 0;
        position: relative;
        bottom: 0;
        box-sizing: border-box;
        display: none;
        .bottom_bar_2 {
          padding: 0.4rem;
          width: 10rem;
          border-radius: 1rem;
          background-color: ${({ theme }) => theme.colors.dark_color};
          margin: auto;
        }
      }
      .ui-main {
        height: 100%;
        width: 0;
        overflow: hidden;
        transform: translateY(0%);
        transition: all linear 0.2s;
        animation-duration: 0.1s;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
        /* animation: nav_anim 2s ease-in 1 forwards; */
      }
      @keyframes nav_anim_open {
        0% {
          width: 0;
        }
        100% {
          width: 70rem;
        }
      }
      @keyframes nav_anim_close {
        0% {
          width: 70rem;
        }
        100% {
          width: 0;
        }
      }
      .down_arrow {
        display: block;
        margin: auto;
        width: 8rem;
        height: 7rem;
        font-size: 8rem;
        color: ${({ theme }) => theme.colors.light_color};
        pointer-events: all;
        display: none;
        cursor: pointer;
      }
      .ui-container {
        width: 100%;
        height: 100%;
        display: block;
        overflow-x: hidden;
        overflow-y: auto;
        transition: all linear 0.2s;
        pointer-events: all;
        /* background-color: ${({ theme }) => theme.colors.light_color}; */
        ::-webkit-scrollbar {
          width: 1.5rem;
        }
        ::-webkit-scrollbar-track {
          background-color: ${({ theme }) => theme.colors.dark_color2};
        }
        ::-webkit-scrollbar-thumb {
          background-color: ${({ theme }) => theme.colors.light_color};
          border: 4px solid transparent;
          border-radius: 9px;
          background-clip: content-box;
        }
      }
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.media.laptop}) {
    .container {
      .main_container {
        .menu_icon {
          margin: 1rem;
        }
      }
    }
    @keyframes nav_anim_open {
      0% {
        width: 0;
      }
      100% {
        width: 55rem;
      }
    }
    @keyframes nav_anim_close {
      0% {
        width: 55rem;
      }
      100% {
        width: 0;
      }
    }
  }
  @media screen and (min-width: ${({ theme }) =>theme.media.mobile}) and (max-width: ${({ theme }) => theme.media.tab}) {
    .container {
      display: block;
      .main_container {
        overflow: hidden;
        width: 100%;
        position: fixed;
        height: 90%;
        max-height: 480px;
        bottom: 0;
        flex-direction: column;
        margin-top: 0;
        .ui-main {
          width: 100%;
          transform: translateY(82%);
          animation: none;
        }
        .down_arrow {
          display: block;
        }
        .cross-icon,
        .menu_icon {
          display: none;
        }
        .ui-container {
          display: none;
          border-top-left-radius: 5rem;
          border-top-right-radius: 5rem;
          background-color: ${({ theme }) => theme.colors.light_color};
        }
        .bottom_bar {
          padding: 1rem 0;
          display: block;
          .bottom_bar_2 {
            padding: 0.4rem;
          }
        }
      }
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    .container {
      display: block;
      .main_container {
        overflow: hidden;
        position: fixed;
        height: 90%;
        max-height: 480px;
        bottom: 0;
        flex-direction: column;
        margin-top: 0;
        .ui-main {
          width: 100%;
          animation: none;
          transform: translateY(82%);
        }
        .down_arrow {
          display: block;
        }
        .cross-icon,
        .menu_icon {
          display: none;
        }
        .ui-container {
          overflow-y: auto;
          display: none;
          border-top-left-radius: 5rem;
          border-top-right-radius: 5rem;
          background-color: ${({ theme }) => theme.colors.light_color};
        }
        .bottom_bar {
          display: block;
          padding: 1rem 0;
        }
        .bottom_bar_2 {
          padding: 0.4rem;
        }
      }
    }
  }
  @media screen and (max-height: 700px) {
    .container {
      display: block;
      .main_container {
        overflow: hidden;
        position: fixed;
        height: 90%;
        flex-direction: column;
        max-height: 480px;
        margin-top: 0;
        .down_arrow {
          display: block;
        }
        .cross-icon,
        .menu_icon {
          display: none;
        }
        .ui-main {
          width: 100%;
          animation: none;
          transform: translateY(78%);
        }
        .ui-container {
          overflow-y: auto;
          display: none;
          border-top-left-radius: 5rem;
          border-top-right-radius: 5rem;
          background-color: ${({ theme }) => theme.colors.light_color};
        }
      }
    }
  }
`;

// safari bottom bar covers content
