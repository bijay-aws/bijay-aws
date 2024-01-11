import React from 'react';
import {mKurtiObj,GRID_SEL,CurrentType} from '../component/Web3D';
import * as CONFIG_DATA from '../KurtiConfigData';
import styled from 'styled-components';
const ContrastMenu = () => {
    const path={imgPath:"",item:""};
    switch(CurrentType.value){
        case CONFIG_DATA.KurtiStyleMenuList.sleeves:
            path.imgPath = './ui/sleeves_icons/';
            path.item = CONFIG_DATA.SleeveModels[GRID_SEL.sleeves];
            break;
        case CONFIG_DATA.KurtiStyleMenuList.front:
            path.imgPath = './ui/neck_icons/front/';
            
            path.item = CONFIG_DATA.FrontNeckModels[GRID_SEL.front];
            console.log("innnnnnnnnnn ",path.imgPath,"    ",path.item);
            break;
        case CONFIG_DATA.KurtiStyleMenuList.back:
             path.imgPath = './ui/neck_icons/back/';
             path.item = CONFIG_DATA.BackNeckModels[GRID_SEL.back];
            break;
        case CONFIG_DATA.StyleMenuList.bottom_wear:
            break;
        case CONFIG_DATA.LengthMenuList.long:
            path.imgPath = './ui/kurti_icons/long/';
            path.item = CONFIG_DATA.KurtiLongModels[GRID_SEL.length.long];
            break;
        case CONFIG_DATA.LengthMenuList.short:
            path.imgPath = './ui/kurti_icons/short/';
            path.item = CONFIG_DATA.KurtiShortModels[GRID_SEL.length.short];
            break;
        case CONFIG_DATA.LengthMenuList.curve:
            path.imgPath = './ui/kurti_icons/curve/';
            path.item = CONFIG_DATA.KurtiCurveModels[GRID_SEL.length.curve];
            break;
        case CONFIG_DATA.LengthMenuList.without_slit:
            path.imgPath = './ui/kurti_icons/slit/';
            path.item = CONFIG_DATA.KurtiSlitModels[GRID_SEL.length.w_o_slit];
            break;
        case CONFIG_DATA.LengthMenuList.without_slit_long:
            path.imgPath = './ui/kurti_icons/slit_long/';
            path.item = CONFIG_DATA.KurtiSlitLongModels[GRID_SEL.length.w_o_slit_l];
            break;
        case CONFIG_DATA.LengthMenuList.without_slit_medium:
            path.imgPath = './ui/kurti_icons/slit_medium/';
            path.item = CONFIG_DATA.KurtiSlitMediumModels[GRID_SEL.length.w_o_slit_m];
            break;
        default:
            break;
    }  
    const onColorChange=(e)=>{
        const color = e.target.value;
         if(!mKurtiObj)
          return;
        switch(CurrentType.value){
            case CONFIG_DATA.KurtiStyleMenuList.front:
                  mKurtiObj.changeContrastColor(mKurtiObj.frontNeck.model,color);
                break;
            case CONFIG_DATA.KurtiStyleMenuList.back:
                  mKurtiObj.changeContrastColor(mKurtiObj.backNeck.model,color);
                break;
            case CONFIG_DATA.KurtiStyleMenuList.sleeves:
                  mKurtiObj.changeContrastColor(mKurtiObj.sleeves.model,color);
                break;
            default:
                  mKurtiObj.changeContrastColor(mKurtiObj.kurti.model,color);
                break;
        }  
    }
    return (
        <Wrapper>
                <div className='contrast-menu-container'>
                    <img className='my-icon' src={`${path.imgPath+path.item}.png`} alt={path.item}/>
                    <div className="container-color">
                        <input type="color" id="color-picker"  defaultValue={"#ffffff"} onChange={(e)=>{
                            onColorChange(e);
                        }}/>
                    </div>
                </div>
        </Wrapper>
    );
};

export default ContrastMenu;

const Wrapper = styled.div`
user-select: none;
    .contrast-menu-container{
        display: flex;
        gap: 1rem;
        padding: .5rem 1rem;
     .my-icon{
        width: 6rem;
        height: auto;
        object-fit: contain;
        pointer-events: all;
        text-align: left;
        border-radius: 1rem;
        border: 2px solid ${({theme})=>theme.colors.border_highlight_color};
     }
    .contrast_item_active{
        border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
     }
    .container-color {
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid ${({theme})=>theme.colors.light_color};
        border-radius: 4px;
        align-content: center;
        margin: auto 0;
    }
    input[type="color"] {
        cursor: pointer;
        border: none;
        background-color: transparent;
        width: 5rem;
        height: 5rem;
        outline: none;
    }
    #color-picker::-webkit-color-swatch {
        border-radius: 50%;
        border: 1px solid ${({theme})=>theme.colors.border_color};
     }
   }
   @media (max-width:${({theme})=>theme.media.mobile}),(max-width:${({theme})=>theme.media.tab}){
    .contrast-menu-container{
        .container-color {
            border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
         }
        #color-picker::-webkit-color-swatch {
            border: 1px solid ${({theme})=>theme.colors.border_color};
        }
     }
   }
`