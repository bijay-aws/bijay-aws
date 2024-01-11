import React from 'react';
import styled from 'styled-components';
import * as CONFIG_DATA from '../KurtiConfigData';
import GridMenu from './GridMenu';
import { GRID_SEL} from './Web3D';
const BottomWear = () => {
    const [bottomWearSel,setBottomWearSel] = React.useState(GRID_SEL.bottom_wear);
    return (
        <Wrapper>
             <GridMenu datalist = {CONFIG_DATA.BottomWear} currentState = {CONFIG_DATA.StyleMenuList.bottom_wear} currentSel ={bottomWearSel} setSelection={setBottomWearSel}/> 
        </Wrapper>
    );
};

export default BottomWear;
const Wrapper = styled.div`
     display: flex;
     flex-direction: column;
     user-select: none;
     padding: 5px 0;
     .bottom-wear-menu-container{
        display: flex;
        pointer-events: all;
        .bottom-wear-menu-item{
            display: inline-flex;
            padding: .5rem 1rem;
            margin: 1px;
            color:${({theme})=>theme.colors.light_color};
            border: 1px solid ${({theme})=>theme.colors.light_color2};
            pointer-events: all;
            cursor: pointer;
            font-size: 1.5rem;
        }
        .bottom-wear-menu_item_active{
            border: 1px solid ${({theme})=>theme.colors.border_highlight};
        }
     }
`
    
     
     