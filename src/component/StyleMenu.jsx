import React from 'react';
import styled from 'styled-components';
import * as CONFIG_DATA from '../KurtiConfigData';
import BottomWear from './BottomWear';
import KurtiStyleMenu from './KurtiStyleMenu';
import {CurrentType} from '../component/Web3D';
const StyleMenu = () => {
    const [styleState,setStyleState] = React.useState(CONFIG_DATA.StyleMenuList.kurti);
    const [kurtiState,setKurtiState] = React.useState("none");
    CurrentType.value  = CONFIG_DATA.StyleMenuList.kurti; 
    console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^",CurrentType.value);
    const onClickMenu=(e,item)=>{
        const kurtistylebutton = document.querySelectorAll('.kurti-style-menu_item_active');    
        kurtistylebutton.forEach((e,i)=>{
            e.classList.remove('kurti-style-menu_item_active');
        })

        const buttons = document.querySelectorAll('.style_item_active');    
        buttons.forEach((e,i)=>{
            e.classList.remove('style_item_active');
            // e.classList.add('style_item');
        })
        e.target.classList.add('style_item_active');
        setStyleState(CONFIG_DATA.StyleMenuList[item]);
        setKurtiState("none");
        CurrentType.value  = CONFIG_DATA.StyleMenuList.kurti; 
      }
      const showKurtiStyleMenu = ()=>{
            switch(styleState){
                case CONFIG_DATA.StyleMenuList.kurti:{
                    return <KurtiStyleMenu  MenuList ={CONFIG_DATA.KurtiStyleMenuList} styleState = {styleState}
                     setKurtiState={setKurtiState} kurtiState = {kurtiState} />;
                }
                case CONFIG_DATA.StyleMenuList.bottom_wear:{
                    return <BottomWear/>;
                }
                default:
                    break;
            }
      }
    
    return (
        <Wrapper>
              <div className='style-menu-container'>
                {
                    Object.keys(CONFIG_DATA.StyleMenuList).map((item,index)=>{
                        return <div className={index===0 ? 'style_item_active style-menu-item':"style-menu-item" } key = {index} onClick = {(e)=>{
                                onClickMenu(e,item);
                            }}>
                            {CONFIG_DATA.StyleMenuList[item]}
                        </div>
                    })
                }
                </div>
                {
                    showKurtiStyleMenu()
                }
        </Wrapper>
    );
};

export default StyleMenu;
const Wrapper = styled.div`
     overflow: hidden;
     display: flex;
     flex-direction: column;
     user-select: none;
     gap: 1rem;
     .style-menu-container{
        display: flex;
        align-items: flex-start;
        pointer-events: all;
        .style-menu-item{
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
        .style_item_active{
            border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
            color:${({theme})=>theme.colors.text_highlight_color};
        }
     }
     @media screen and (max-width:${({theme})=>theme.media.laptop}){
        gap: .5rem;
        .style-menu-container{
            .style-menu-item{
                padding: .5rem 2rem;
                margin: 0rem .8rem;
                font-size: 1.5rem;
           }
      }
    }
    @media screen and  (max-width:${({theme})=>theme.media.tab}){
        .style-menu-container{
            .style-menu-item{
                color:${({theme})=>theme.colors.text_color};
                border: 1px solid ${({theme})=>theme.colors.border_color};
           }
           .style_item_active{
                border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
                color:${({theme})=>theme.colors.text_highlight_color};
            }
      }
   }
   @media screen and  (max-width:${({theme})=>theme.media.mobile}){
        gap: .5rem;
        .style-menu-container{
            .style-menu-item{
                color:${({theme})=>theme.colors.text_color};
                border: 1px solid ${({theme})=>theme.colors.border_color};
                padding: 1rem 2rem;
                margin: 0rem .8rem;
                font-size: 1.5rem;
           }
           .style_item_active{
                border: 1px solid ${({theme})=>theme.colors.border_highlight_color};
                color:${({theme})=>theme.colors.text_highlight_color};
            }
      }
   }
`