import React from 'react';
import styled from 'styled-components';
import * as CONFIG_DATA from '../KurtiConfigData';
import GridMenu from './GridMenu';
import {mKurtiObj,GRID_SEL} from '../component/Web3D';
const KurtiStyleMenu = ({MenuList,styleState,setKurtiState,kurtiState}) => {
    const [frontSel,setFrontSel] = React.useState(GRID_SEL.front);
    const [backSel,setBackSel] = React.useState(GRID_SEL.back);
    const [sleevesSel,setSleevesSel] = React.useState(GRID_SEL.sleeves);
    const [accessories_Sel,setAccessories_Sel] = React.useState(GRID_SEL.accessories_sel);
    React.useEffect(()=>{
    //   console.log("kurti menu",kurtiState);
      if(kurtiState ===CONFIG_DATA.KurtiStyleMenuList.front && mKurtiObj){
            mKurtiObj.enableContrastDiv(mKurtiObj.frontNeck.isContrast);
      }
    },[]);
    const onClickMenu=(e,item)=>{
        const styleButton = document.querySelectorAll('.style_item_active');    
        styleButton.forEach((e,i)=>{
            e.classList.remove('style_item_active');
        })
        const buttons = document.querySelectorAll('.kurti-style-menu_item_active');    
        buttons.forEach((e,i)=>{
            e.classList.remove('kurti-style-menu_item_active');
        })
        e.target.classList.add('kurti-style-menu_item_active');
        setKurtiState(CONFIG_DATA.KurtiStyleMenuList[item]);
        if(!mKurtiObj)
            return;
        switch(CONFIG_DATA.KurtiStyleMenuList[item]){
            case CONFIG_DATA.KurtiStyleMenuList.front:
                    mKurtiObj.enableContrastDiv(mKurtiObj.frontNeck.isContrast);
                break;
            case CONFIG_DATA.KurtiStyleMenuList.back:
                    mKurtiObj.enableContrastDiv(mKurtiObj.backNeck.isContrast);
                break;
            case CONFIG_DATA.KurtiStyleMenuList.sleeves:
                    console.log(mKurtiObj.sleeves.isContrast,"      ");
                    mKurtiObj.enableContrastDiv(mKurtiObj.sleeves.isContrast);
                break;
            case CONFIG_DATA.KurtiStyleMenuList.accessories:
                break;
            default:
                    mKurtiObj.enableContrastDiv(mKurtiObj.kurti.isContrast);
                break;
        }
    }
    const setKurti=()=>{
        switch(styleState){
            case CONFIG_DATA.StyleMenuList.kurti:
                switch(kurtiState){
                    case CONFIG_DATA.KurtiStyleMenuList.front://front
                        return <GridMenu datalist = {CONFIG_DATA.FrontNeckModels} currentState = {kurtiState} currentSel ={frontSel} setSelection={setFrontSel}/> 
                    case CONFIG_DATA.KurtiStyleMenuList.back://back
                        return <GridMenu datalist = {CONFIG_DATA.BackNeckModels} currentState = {kurtiState} currentSel = {backSel} setSelection={setBackSel}/> 
                    case CONFIG_DATA.KurtiStyleMenuList.sleeves://sleeve
                           return <GridMenu datalist = {CONFIG_DATA.SleeveModels} currentState = {kurtiState} currentSel = {sleevesSel} setSelection={setSleevesSel}/> 
                    case CONFIG_DATA.KurtiStyleMenuList.length://length
                        return <ShowLengthMenu/>;
                    case CONFIG_DATA.KurtiStyleMenuList.accessories://accessories
                        return <GridMenu datalist = {CONFIG_DATA.Accessories} currentState = {kurtiState} currentSel = {accessories_Sel} setSelection={setAccessories_Sel}/> 
                    default:
                        return;
                }
            default:
                break;
        } 
    }
  return (
        <Wrapper>
                <div className='kurti-style-menu-container'>
                {   
                    Object.keys(MenuList).map((item,index)=>{
                        return <div className={"kurti-style-menu-item" } key = {index} onClick = {(e)=>{
                               onClickMenu(e,item);
                            }}>
                            {MenuList[item]}
                        </div>
                    })
                }
                </div>
                {
                   setKurti()
                }
        </Wrapper>
    );
};
export default KurtiStyleMenu;
const Wrapper = styled.div`
     display: flex;
     flex-direction: column;
     user-select: none;
     padding: 0rem;
     gap: 1rem;
     .kurti-style-menu-container{
        display: flex;
        pointer-events: all;
        align-items: flex-start;
        .kurti-style-menu-item{
            display: flex;
            padding: .5rem 2.5rem;
            margin: 0rem 1rem;
            color:${({theme})=>theme.colors.desktop_light_color};
            border: 1px solid ${({theme})=>theme.colors.desktop_light_color};
            pointer-events: all;
            cursor: pointer;
            font-size: 1.5rem;
            border-radius: 1rem;
        }
        .kurti-style-menu_item_active{
            border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
            color:${({theme})=>theme.colors.text_highlight_color};
        }
        .length_selection {
            border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
            color:${({theme})=>theme.colors.text_highlight_color};
        }
     }
     @media screen and (max-width:${({theme})=>theme.media.laptop}){
        gap: .5rem;
        .kurti-style-menu-container{
            .kurti-style-menu-item{
                padding: .5rem 2rem;
                margin: 0rem .8rem;
                font-size: 1.5rem;
           }
      }        
     }
     @media (max-width:${({theme})=>theme.media.tab}){
        gap: .5rem;
        .kurti-style-menu-container{
            .kurti-style-menu-item{
                color:${({theme})=>theme.colors.text_color};
                border: 1px solid ${({theme})=>theme.colors.border_color};
           }
           .kurti-style-menu_item_active{
                border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
                color:${({theme})=>theme.colors.text_highlight_color};
            }
            .length_selection {
                border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
                color:${({theme})=>theme.colors.text_highlight_color};
            }
      }        
    }
     @media (max-width:${({theme})=>theme.media.mobile}){
        gap: .5rem;
        .kurti-style-menu-container{
            display: grid;
            grid-template-columns: repeat(3,1fr);
            text-align: center;
            row-gap: .5rem;
            width: fit-content;
            .kurti-style-menu-item{
                color:${({theme})=>theme.colors.text_color};
                border: 1px solid ${({theme})=>theme.colors.border_color};
                text-align: center;
                justify-content: center;
                padding: 1rem 2rem;
                margin: 0rem .8rem;
                font-size: 1.5rem;
           }
           .kurti-style-menu_item_active{
                border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
                color:${({theme})=>theme.colors.text_highlight_color};
            }
            .length_selection {
                border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
                color:${({theme})=>theme.colors.text_highlight_color};
            }
      }        
    }
`

 const ShowLengthMenu= ()=>{
    console.log("!! ShowLengthMenu!! ");
    const [lengthState,setLengthState] = React.useState(CONFIG_DATA.LengthMenuList.long);
    const [lengthSel,setLengthSel] = React.useState(0);
    const onClickLength=(e,item)=>{
        const buttons = document.querySelectorAll('.length_selection');    
        buttons.forEach((e,i)=>{
            e.classList.remove('length_selection');
        })
        e.target.classList.add('length_selection');
        console.log("index",item);
        setLengthState(CONFIG_DATA.LengthMenuList[item]);
        switch(item){
            case CONFIG_DATA.LengthMenuList.long:
                setLengthSel(GRID_SEL.length.long);
                break;                
            case CONFIG_DATA.LengthMenuList.short:
                setLengthSel(GRID_SEL.length.short);
                break;
            case CONFIG_DATA.LengthMenuList.curve:
                setLengthSel(GRID_SEL.length.curve);
                break;
            case CONFIG_DATA.LengthMenuList.without_slit:
                setLengthSel(GRID_SEL.length.w_o_slit);
                break;
            case CONFIG_DATA.LengthMenuList.without_slit_long:
                setLengthSel(GRID_SEL.length.w_o_slit_l);
                break;
            case CONFIG_DATA.LengthMenuList.without_slit_medium:
                setLengthSel(GRID_SEL.length.w_o_slit_m);
                break;
            default:
                break;
        }
       
    }
    const showLenghtGridMenu=()=>{
            switch(lengthState){
                case CONFIG_DATA.LengthMenuList.long: //Long
                    return <GridMenu datalist = {CONFIG_DATA.KurtiLongModels} currentState = {CONFIG_DATA.KurtiStyleMenuList.length}
                           LengthType = {CONFIG_DATA.LengthMenuList.long} currentSel = {lengthSel} setSelection={setLengthSel}/> 
                case CONFIG_DATA.LengthMenuList.short: //short
                    return <GridMenu datalist = {CONFIG_DATA.KurtiShortModels} currentState = {CONFIG_DATA.KurtiStyleMenuList.length}
                           LengthType = {CONFIG_DATA.LengthMenuList.short} currentSel = {lengthSel} setSelection={setLengthSel}/> 
                case CONFIG_DATA.LengthMenuList.curve://curve
                    return <GridMenu datalist = {CONFIG_DATA.KurtiCurveModels} currentState = {CONFIG_DATA.KurtiStyleMenuList.length}
                        LengthType = {CONFIG_DATA.LengthMenuList.curve} currentSel = {lengthSel} setSelection={setLengthSel}/> 
                case CONFIG_DATA.LengthMenuList.without_slit: //w/o slit
                    return <GridMenu datalist = {CONFIG_DATA.KurtiSlitModels} currentState = {CONFIG_DATA.KurtiStyleMenuList.length}
                        LengthType = {CONFIG_DATA.LengthMenuList.without_slit} currentSel = {lengthSel} setSelection={setLengthSel}/> 
                case CONFIG_DATA.LengthMenuList.without_slit_long: //w/o slit_l
                    return <GridMenu datalist = {CONFIG_DATA.KurtiSlitLongModels} currentState = {CONFIG_DATA.KurtiStyleMenuList.length}
                            LengthType = {CONFIG_DATA.LengthMenuList.without_slit_long} currentSel = {lengthSel} setSelection={setLengthSel}/> 
                case CONFIG_DATA.LengthMenuList.without_slit_medium: //w/o slit_m
                    return <GridMenu datalist = {CONFIG_DATA.KurtiSlitMediumModels} currentState = {CONFIG_DATA.KurtiStyleMenuList.length}
                            LengthType = {CONFIG_DATA.LengthMenuList.without_slit_medium} currentSel = {lengthSel} setSelection={setLengthSel}/> 
                default:
                    break;
            }
        
    }
    return( 
        <Wrapper>
            <div className='kurti-style-menu-container'>
                {   
                    Object.keys(CONFIG_DATA.LengthMenuList).map((item,index)=>{
                        return <div className={index===0 ? 'length_selection kurti-style-menu-item':"kurti-style-menu-item" } key = {index} onClick = {(e)=>{
                            onClickLength(e,item);
                            }}>
                          {CONFIG_DATA.LengthMenuList[item]}
                        </div>
                    })
                }
            </div>
            {
                showLenghtGridMenu()
            }
        </Wrapper>
    )
}