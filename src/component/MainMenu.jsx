import React from "react";
import styled from "styled-components";
import * as CONFIG_DATA from "../KurtiConfigData";
import ContrastMenu from "./ContrastMenu";
import FabricMenu from "./FabricMenu";
import StyleMenu from "./StyleMenu";
const MainMenu = () => {
  const [menuState, setMenuState] = React.useState(
    CONFIG_DATA.MainMenuList.style
  );
  const onClickMenu = (e, item) => {
    const buttons = document.querySelectorAll(".menu_item_active");
    buttons.forEach((e, i) => {
      e.classList.remove("menu_item_active");
    });
    e.target.classList.add("menu_item_active");
    setMenuState(CONFIG_DATA.MainMenuList[item]);
  };
  const showStyleCategories = () => {
    // eslint-disable-next-line default-case
    switch (menuState) {
      case CONFIG_DATA.MainMenuList.style: {
        return <StyleMenu />;
      }
      case CONFIG_DATA.MainMenuList.fabric:
        return <FabricMenu />;
      case CONFIG_DATA.MainMenuList.contrast:
        return <ContrastMenu />;
      case CONFIG_DATA.MainMenuList.catalog:
        break;
    }
  };
  return (
    <Wrapper>
      <div className="main-container" id="main-menu-container">
        {Object.keys(CONFIG_DATA.MainMenuList).map((key, index) => (
          <div
            className={
              index === 0
                ? "menu_item_active main-container-item"
                : "main-container-item"
            }
            key={index}
            onClick={(e) => {
              onClickMenu(e, key);
            }}
          >
            {CONFIG_DATA.MainMenuList[key]}
          </div>
        ))}
      </div>
      {showStyleCategories()}
    </Wrapper>
  );
};
export default MainMenu;

const Wrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  user-select: none;
  gap: 1rem;
  padding: 2rem 1rem;
  .main-container {
    display: flex;
    align-items: flex-start;
    pointer-events: all;
    .main-container-item {
      display: flex;
      padding: 0.5rem 2.5rem;
      margin: 0rem 1rem;
      color: ${({ theme }) => theme.colors.desktop_light_color};
      border: 1px solid ${({ theme }) => theme.colors.desktop_light_color};
      pointer-events: all;
      cursor: pointer;
      font-size: 1.5rem;
      border-radius: 1rem;
    }
    .menu_item_active {
      border: 1px solid ${({ theme }) => theme.colors.border_highlight_color};
      color: ${({ theme }) => theme.colors.text_highlight_color};
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.media.laptop}) {
    gap: 0.5rem;
    padding: 1rem 2rem;
    .main-container {
      .main-container-item {
        padding: 0.5rem 2rem;
        margin: 0rem 0.8rem;
        font-size: 1.5rem;
      }
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.media.tab}) {
    .main-container {
      .main-container-item {
        color: ${({ theme }) => theme.colors.text_color};
        border: 1px solid ${({ theme }) => theme.colors.border_color};
      }
      .menu_item_active {
        border: 1px solid ${({ theme }) => theme.colors.border_highlight_color};
        color: ${({ theme }) => theme.colors.text_highlight_color};
      }
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    gap: 0.5rem;
    padding: 2rem 1rem;
    .main-container {
      /* margin: auto; */
      .main-container-item {
        color: ${({ theme }) => theme.colors.text_color};
        border: 1px solid ${({ theme }) => theme.colors.border_color};
        padding: 1rem 2rem;
        margin: 0rem 0.8rem;
        font-size: 1.5rem;
      }
      .menu_item_active {
        border: 1px solid ${({ theme }) => theme.colors.border_highlight_color};
        color: ${({ theme }) => theme.colors.text_highlight_color};
      }
    }
  }
`;
