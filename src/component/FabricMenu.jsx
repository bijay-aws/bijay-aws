import React from "react";
import styled from "styled-components";
import { AiFillCamera, AiOutlineLoading3Quarters } from "react-icons/ai";
import { RiGalleryFill } from "react-icons/ri";
import { GrNext } from "react-icons/gr";
import * as CONFIG_DATA from "../KurtiConfigData";
import { mKurtiObj, CurrentType } from "./Web3D";
import GlobalContext from "../Context/GlobalContext";
let loadImgNo = 0,
  totalImagNo = 0;
let fabricList = [];
let customFabNo = 0;
let currentSel = 0;
let searchFabNum = "";
const FabricMenu = () => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTExNzc5MWEwYmNjNWU5ZDVmNjU0NTAiLCJpYXQiOjE2OTY4NTA5MDEsImV4cCI6MTY5ODE0NjkwMX0.etn2SE0rTkRckIvqDg6VqQHrhqhxNNfMZ6egOq_Cn-c"
  const [XTile, setXTile] = React.useState(1);
  const [YTile, setYTile] = React.useState(1);
  const token = localStorage.getItem("app_token");
  const [fabricData, setFabricData] = React.useState([]);
  const [currentFabric, setCurrentFabric] = React.useState(null);
  const [isFabricLoad, setFabricLoad] = React.useState(false);
  const [pageNo, setPageNo] = React.useState(1);
  const setLogin = React.useContext(GlobalContext);
  const timeStamp = new Date().getTime();
  const fetchFabric = async () => {
    if (!token) return;
    setFabricLoad(true);
    try {
      const url = `https://fabricssoftware.com/api/v1/fabric/getfabric?page=${pageNo}`;
      console.log(url);
      const options = {
        method: "GET",
        cache: "no-cache",
        "Cache-Control": "no-cache",
        "Access-Control-Allow-Origin": "*",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      };
      const resp = await fetch(url, options);
      const jsonData = await resp.json();
      console.log(jsonData, " 1!!!!  ");
      if (!jsonData) {
        setFabricLoad(false);
        return;
      }
      if (jsonData.fabrics.length < 1) {
        setFabricLoad(false);
        return;
      }
      if (jsonData.message.includes("expired")) {
        setFabricLoad(false);
        setLogin(false);
      } else {
        jsonData.fabrics.map((item) => {
          const new_item = {
            _id: item._id,
            storeId: item.storeId,
            fabDashNumber: item.fabDashNumber,
            fabImage: item.fabImage,
          };
          setFabricData((prev) => [...prev, new_item]);
          console.log(
            "$$$$$$$$$$ ",
            "         ",
            totalImagNo,
            "      ",
            loadImgNo
          );
        });
        totalImagNo = jsonData.fabrics.length;
      }
    } catch (error) {}
    // if(loadImgNo>=totalImagNo)
    //     setFabricLoad(false);
  };
  React.useEffect(() => {
    if (pageNo < 1) return;
    fetchFabric();
  }, [pageNo]);

  console.log(fabricData, "fabricData");

  const searchFabric = async (fabric) => {
    const url = `https://fabricssoftware.com/api/v1/fabric/findFabric?fabDashNumber=${fabric}`;
    console.log(url);
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };
    const resp = await fetch(url, options);
    const jsonData = await resp.json();
    console.log(" !!! search!!! ", jsonData);
    // jsonData.fabrics.map((item)=>{
    //     const new_item = {_id:item._id,storeId:item.storeId,fabDashNumber:item.fabDashNumber,fabImage:item.fabImage};
    //     setFabricData((prev) => [...prev, new_item]);
    // })
    return jsonData;
  };
  const changeTexture = (texture) => {
    switch (CurrentType.value) {
      case CONFIG_DATA.KurtiStyleMenuList.sleeves:
        mKurtiObj.changeTexture(
          texture,
          CONFIG_DATA.KurtiStyleMenuList.sleeves
        );
        break;
      case CONFIG_DATA.KurtiStyleMenuList.front:
        mKurtiObj.changeTexture(texture, CONFIG_DATA.KurtiStyleMenuList.front);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.back:
        mKurtiObj.changeTexture(texture, CONFIG_DATA.KurtiStyleMenuList.back);
        break;
      case CONFIG_DATA.StyleMenuList.bottom_wear:
        mKurtiObj.changeTexture(texture, CONFIG_DATA.StyleMenuList.bottom_wear);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.accessories:
        mKurtiObj.changeTexture(
          texture,
          CONFIG_DATA.KurtiStyleMenuList.accessories
        );
        break;
      case CONFIG_DATA.KurtiStyleMenuList.length:
        mKurtiObj.changeTexture(texture, CONFIG_DATA.KurtiStyleMenuList.length);
        break;
      default:
        mKurtiObj.changeTexture(texture, CONFIG_DATA.StyleMenuList.kurti);
        break;
    }
  };

  const onClickUpload = (e) => {
    if (!mKurtiObj && e.target.files.length < 1) return;
    const url = URL.createObjectURL(e.target.files[0]);
    const new_item = {
      _id: `custom${customFabNo}`,
      storeId: fabricData[0].storeId,
      fabDashNumber: `custom${customFabNo}`,
      fabImage: url,
    };
    customFabNo++;
    setFabricData((prev) => [...prev, new_item]);
    setCurrentFabric(new_item);
    // const url = "https://lovoj.s3.amazonaws.com/uploads/fabImage/1697259273938.jpg";
    console.log("^^^^^FabricMenu^^^^^^^ ", CurrentType.value);
    changeTexture(url);
    console.log(CurrentType.value, "       ", "FabricMenu");
  };
  const changeTiling = (x_tile, y_tile) => {
    if (!mKurtiObj) return;
    switch (CurrentType.value) {
      case CONFIG_DATA.KurtiStyleMenuList.sleeves:
        if (mKurtiObj.sleeves.texture)
          mKurtiObj.sleeves.texture.repeat.set(x_tile * 0.001, y_tile * 0.001);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.front:
        if (mKurtiObj.frontNeck.texture)
          mKurtiObj.frontNeck.texture.repeat.set(
            x_tile * 0.001,
            y_tile * 0.001
          );
        break;
      case CONFIG_DATA.KurtiStyleMenuList.back:
        if (mKurtiObj.backNeck.texture)
          mKurtiObj.backNeck.texture.repeat.set(x_tile * 0.001, y_tile * 0.001);
        break;
      case CONFIG_DATA.StyleMenuList.bottom_wear:
        if (mKurtiObj.laggie.texture)
          mKurtiObj.laggie.texture.repeat.set(x_tile * 0.001, y_tile * 0.001);
        break;
      case CONFIG_DATA.KurtiStyleMenuList.length:
        if (mKurtiObj.kurti.texture)
          mKurtiObj.kurti.texture.repeat.set(x_tile * 0.001, y_tile * 0.001);
        break;
      default:
        if (mKurtiObj.allInOneTexture)
          mKurtiObj.allInOneTexture.repeat.set(x_tile * 0.001, y_tile * 0.001);
        break;
    }
  };
  const onClickXSlide = (e) => {
    // console.log("onClickXSlide",e.target.value);
    setXTile(e.target.value);
    changeTiling(e.target.value, YTile);
  };
  const onClickYSlide = (e) => {
    // console.log("onClickXSlide",e.target.value);
    setYTile(e.target.value);
    changeTiling(XTile, e.target.value);
  };
  const onClickGridItem = (item) => {
    console.log("!!! onClickGridItem!! ", item.fabImage);
    if (item !== currentFabric) {
      setCurrentFabric(item);
      changeTexture(`${item.fabImage}?${timeStamp}`);
    }
    // currentSel = index;
    // const items = document.querySelectorAll('.fabric_item_selected');
    // items.forEach((item)=>{
    //     item.classList.remove('fabric_item_selected');
    // })
    // e.target.classList.add('fabric_item_selected');
  };
  const getCurrentFabric = async () => {
    searchFabNum = document.getElementById("dash_input").value;
    console.log("innnnnnnnnn ", searchFabNum);
    if (searchFabNum.length < 1) return;
    setFabricLoad(true);
    const response = await searchFabric(searchFabNum);
    if (response) {
      setFabricLoad(false);
      if (response.fabrics.length < 1) {
        document.getElementById("not_found").style.display = "block";
        document.getElementById("not_found").style.opacity = "1";
        const tout = setTimeout(() => {
          document.getElementById("not_found").style.display = "block";
          document.getElementById("not_found").style.opacity = "0";
          clearTimeout(tout);
        }, 1000);
      } else {
        setCurrentFabric(response.fabrics[0]);
        const item = response.fabrics[0];
        const filtered = fabricData.filter(
          (element) => element.fabDashNumber === item.fabDashNumber
        );
        if (filtered.length < 1) {
          const new_item = {
            _id: item._id,
            storeId: item.storeId,
            fabDashNumber: item.fabDashNumber,
            fabImage: item.fabImage,
          };
          setFabricData((prev) => [...prev, new_item]);
        }
      }
    }

    // const filtered = fabricData.filter((element) => element.fabDashNumber === searchFabNum);
    // if(filtered.length>0)
    //     setCurrentFabric(filtered[0]);
    // else{
    //     document.getElementById("not_found").style.display = "block";
    //     document.getElementById("not_found").style.opacity = "1";
    //     const tout = setTimeout(() => {
    //         document.getElementById("not_found").style.display = "block";
    //         document.getElementById("not_found").style.opacity = "0";
    //         clearTimeout(tout);
    //     }, 1000);
    // }
    // console.log(filtered);
  };
  return (
    <Wrapper>
      <div className="fabric-menu-container">
        <div>
          <label className="file_label only_mobile">
            <AiFillCamera className="upload-icon" />
            <input
              className="File_upload"
              name="texture-capture"
              type="file"
              accept="image/*"
              id="my-file"
              capture="camera"
              onChange={(e) => {
                onClickUpload(e);
              }}
            />
          </label>
        </div>
        <div>
          <label className="file_label">
            <RiGalleryFill className="upload-icon file_icon" />
            <input
              className="File_upload"
              name="texture-upload"
              type="file"
              accept="image/*"
              id="my-file"
              onChange={(e) => {
                onClickUpload(e);
              }}
            />
          </label>
        </div>
        <div className="my-slider">
          <label htmlFor="range">X-Tile</label>
          <input
            className="tile-slider"
            type="range"
            id="x_tile"
            min="1"
            max="20"
            step="1"
            defaultValue={XTile}
            onChange={(e) => onClickXSlide(e)}
          />
          <h2>{XTile}</h2>
        </div>
        <div className="my-slider">
          <label htmlFor="range">Y-Tile</label>
          <input
            className="tile-slider"
            type="range"
            id="y_tile"
            min="1"
            max="20"
            step="1"
            defaultValue={YTile}
            onChange={(e) => onClickYSlide(e)}
          />
          <h2>{YTile}</h2>
        </div>
      </div>
      <div className="fabric_menu_container_2">
        <input
          className="dash-input"
          id="dash_input"
          type="text"
          name="dash_input"
          autoComplete="false"
          required
          placeholder="Dash Number"
          onChange={(e) => {
            searchFabNum = e.target.value;
          }}
        />
        <div
          className={isFabricLoad ? "my-btn my-btn_de_active" : "my-btn"}
          onClick={() => {
            if (!isFabricLoad) getCurrentFabric();
          }}
        >
          Ok
        </div>
        <div className="fabric_grid_item">
          {currentFabric && (
            <div style={{ width: "5rem", height: "5rem" }}>
              <img
                className={"fab_icon"}
                src={currentFabric.fabImage}
                alt={currentFabric._id}
                onClick={() => {
                  // console.log("%%%%%%%%%%%% ",currentFabric.fabImage,"       ",applyFabric);
                  if (mKurtiObj) {
                    if (currentFabric.fabImage) {
                      mKurtiObj.changeTexture(
                        `${currentFabric.fabImage}?${timeStamp}`,
                        CONFIG_DATA.StyleMenuList.kurti
                      );
                    }
                  }
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="fabric_container">
        <div className="fabric_grid">
          {fabricData &&
            fabricData.map((item, index) => {
              return (
                <div className="fabric_grid_item" key={index}>
                  {
                    // item==="none"?<AiOutlineStop className={currentSel===index? 'grid_item_selected none-icon': 'none-icon'}/>:
                    <img
                      className={"fab_icon"}
                      src={item.fabImage}
                      alt={item._id}
                      onLoad={() => {
                        loadImgNo++;
                        if (loadImgNo >= totalImagNo) {
                          setFabricLoad(false);
                          loadImgNo = 0;
                        }
                      }}
                      onClick={() => {
                        onClickGridItem(item);
                      }}
                    />
                  }
                </div>
              );
            })}
        </div>
        <h2 className="not_found" id="not_found">
          {" "}
          Fabric Not Found
        </h2>
        {isFabricLoad && <AiOutlineLoading3Quarters className="loading_grid" />}
        {fabricData && (
          <div
            className="next_arrow"
            onClick={() => {
              console.log("&&&&&&&&&&&&&", pageNo);
              setPageNo(pageNo + 1);
            }}
          >
            <GrNext />
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default FabricMenu;
const Wrapper = styled.div`
  user-select: none;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .fabric-menu-container {
    display: flex;
    align-items: center;
    gap: 1rem;
    .file_label {
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.colors.desktop_light_color};
      border-radius: 1rem;
      display: flex;
      /* padding: 0.3rem; */
      width: 5rem;
      height: 5rem;
      align-items: center;
      justify-content: center;
      .upload-icon {
        width: 24px;
        height: 24px;
        color: ${({ theme }) => theme.colors.text_highlight_color};
        &.file_icon {
          width: 22px;
          height: 22px;
        }
      }
    }
    .only_mobile {
      display: none;
    }
    #my-file {
      display: none;
    }
    .my-slider {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 20rem;
      label,
      h2 {
        text-align: left;
        font-size: 1.5rem;
        color: ${({ theme }) => theme.colors.desktop_light_color};
      }
      .tile-slider {
        position: relative;
        width: 10rem;
        outline: none;
        -webkit-appearance: none;
        border-radius: 1rem;
        background: #d9d9d9;
        cursor: pointer;
        border: none;
      }
      .tile-slider::-webkit-slider-thumb {
        appearance: none;
        width: 1.2rem;
        height: 1.2rem;
        border-radius: 50%;
        background: #f603cf;
        cursor: pointer;
        &:hover {
          background: ${({ theme }) => theme.colors.dark_color};
        }
      }
    }
    .style_item_active {
      border: 1px solid ${({ theme }) => theme.colors.border_highlight};
    }
  }
  .fabric_menu_container_2 {
    display: flex;
    gap: 1rem;
    align-items: center;
    align-content: center;
    /* justify-content: space-around; */
    .dash-input {
      padding: 1.2rem 3rem;
      border-radius: 10px;
      outline: none;
      border: 1px solid ${({ theme }) => theme.colors.border_color};
      background-color: ${({ theme }) => theme.colors.dark_color};
      color: ${({ theme }) => theme.colors.light_color};
      font-size: 1.4rem;
      &::placeholder {
        color: #bec5d3;
      }
    }
    .my-btn {
      padding: 1rem 2rem;
      flex: 1 1 0%;
      text-align: center;
      max-width: 105px;
      background-color: ${({ theme }) => theme.colors.text_highlight_color};
      border-radius: 1rem;
      font-size: 1.8rem;
      color: ${({ theme }) => theme.colors.light_color};
      cursor: pointer;
      &:active {
        transform: scale(0.9);
      }
      opacity: 1;
    }
    .my-btn_de_active {
      opacity: 0.5;
    }
  }
  .fabric_container {
    display: flex;
    flex-direction: column;
    width: fit-content;
  }
  .fabric_grid {
    /* display: grid; */
    display: flex;
    flex-wrap: wrap;
    padding: 0 1rem 3rem 0;
    width: fit-content;
    /* max-height: 20rem; */
    overflow-x: hidden;
    overflow-y: auto;
    /* grid-template-columns: repeat(7, 1fr); */
    justify-items: start;
    column-gap: 0.8rem;
    row-gap: 0.5rem;
    ::-webkit-scrollbar {
      width: 1.5rem;
    }
    ::-webkit-scrollbar-track {
      background-color: ${({ theme }) => theme.colors.dark_color2};
      border-radius: 9px;
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.light_color};
      border: 4px solid transparent;
      border-radius: 9px;
      background-clip: content-box;
    }
  }
  .fabric_grid_item {
    cursor: pointer;
    text-align: center;
    font-size: 1rem;
    color: ${({ theme }) => theme.colors.light_color};
    pointer-events: none;
    width: 5rem;
    height: 5rem;
    .none_icon {
      pointer-events: all;
      font-size: 5rem;
      color: ${({ theme }) => theme.colors.dark_color};
      background-color: ${({ theme }) => theme.colors.light_color};
    }
    h2 {
      pointer-events: none;
    }
    .fab_icon {
      width: 100%;
      height: 100%;
      pointer-events: all;
      border-radius: 1rem;
      &:active {
        transform: scale(0.9);
      }
    }
    .fabric_item_selected {
      border: 2px solid ${({ theme }) => theme.colors.border_highlight_color};
    }
  }

  .not_found {
    position: absolute;
    text-align: center;
    font-size: 2rem;
    padding: 1rem 2rem;
    border-radius: 1rem;
    color: ${({ theme }) => theme.colors.border_color};
    background-color: ${({ theme }) => theme.colors.light_color};
    border: 1px solid ${({ theme }) => theme.colors.text_highlight_color};
    display: none;
    transition: all linear 0.2s;
  }
  .loading_grid {
    position: absolute;
    display: flex;
    align-self: center;
    font-size: 4rem;
    color: ${({ theme }) => theme.colors.text_highlight_color};
    animation: rotation_anim 0.5s infinite;
  }
  .next_arrow {
    cursor: pointer;
    text-align: center;
    line-height: 1rem;
    margin: 1rem auto;
    font-size: 2rem;
    padding: 1rem 1rem;
    border: 1px solid ${({ theme }) => theme.colors.border_color};
    color: ${({ theme }) => theme.colors.dark_color};
    background-color: ${({ theme }) => theme.colors.light_color};
    border-radius: 1rem;
    margin-top: 2rem;
    /* align-self: center; */
    &:active {
      border: 1px solid ${({ theme }) => theme.colors.border_highlight_color};
    }
  }
  @keyframes rotation_anim {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.media.tab}) {
    gap: 0.5rem;
    .fabric-menu-container {
      .file_label {
        border: 1px solid ${({ theme }) => theme.colors.border_color};
      }
      .only_mobile {
        display: flex;
      }
      .my-slider {
        label,
        h2 {
          color: ${({ theme }) => theme.colors.dark_color};
        }
        .tile-slider::-webkit-slider-thumb {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
    .fabric_menu_container_2 {
      /* justify-content: space-around; */
      .dash-input {
        border: 1px solid ${({ theme }) => theme.colors.border_color};
        color: ${({ theme }) => theme.colors.border_color};
        background-color: ${({ theme }) => theme.colors.light_color};
      }
    }
    .fabric_grid {
      display: flex;
      flex-wrap: wrap;
      /* grid-template-columns: repeat(7, 1fr); */
      /* height: 10rem; */
    }
  }
  @media screen and (max-width: ${({ theme }) => theme.media.mobile}) {
    gap: 0.5rem;
    .fabric-menu-container {
      .file_label {
        border: 1px solid ${({ theme }) => theme.colors.border_color};
      }
      .only_mobile {
        display: flex;
      }
      .my-slider {
        label,
        h2 {
          color: ${({ theme }) => theme.colors.dark_color};
        }
        .tile-slider::-webkit-slider-thumb {
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
    .fabric_menu_container_2 {
      /* justify-content: space-around; */
      .dash-input {
        border: 1px solid ${({ theme }) => theme.colors.border_color};
        color: ${({ theme }) => theme.colors.border_color};
        background-color: ${({ theme }) => theme.colors.light_color};
      }
    }
    .fabric_grid {
      /* grid-template-columns: repeat(7, 1fr);
            height: 10rem; */
      display: flex;
      flex-wrap: wrap;
      height: 17rem;
    }
  }
  @media (max-height: 700px) {
    .fabric_grid {
      padding: 0 1rem 2rem 0;
      height: 17rem;
    }
  }
`;
