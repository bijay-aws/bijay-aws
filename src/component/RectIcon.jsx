import React from 'react';
import styled from 'styled-components';
import * as config from '../KurtiConfigData';
import { mKurtiObj } from './Web3D';
let chudidarEnable=true;
let enableCount=0;
let currentCat="kurti";
const RectIcon = ({path,name,index,setCatType,setchudidarEnable}) => {
    return (
        <Wrapper>
            <div  className={index===0?'active-icon':''}  onClick={(current)=>{
                    const buttons = document.querySelectorAll('.active-icon');
                    buttons.forEach((e,i)=>{
                        e.classList.remove('active-icon');
                    })
                    current.target.classList.add('active-icon');
                    const buttons2 = document.querySelectorAll('.active');
                        buttons2.forEach((e,i)=>{
                            e.classList.remove('active');
                    })
                    if(currentCat !== config.categories.chudidar)
                        enableCount=0;
                    else 
                        enableCount=1;
                    switch(index){
                        case 0:
                            setCatType(config.categories.kurti);  
                            currentCat = config.categories.kurti;
                            break;
                        case 1:
                            currentCat = config.categories.chudidar;
                            setCatType(config.categories.chudidar);
                            if(enableCount ===1){
                                chudidarEnable =!chudidarEnable;
                                setchudidarEnable(chudidarEnable);
                                if(chudidarEnable)
                                   current.target.classList.remove('opacity');
                                else 
                                    current.target.classList.add('opacity');
                            }
                            mKurtiObj.showHideChudidar(chudidarEnable);
                            enableCount++;
                            if(enableCount>1)
                                enableCount=0;
                            
                            break;
                         case 2:
                            setCatType(config.categories.sleeves);
                            currentCat = config.categories.sleeves;
                            break   
                        default:
                            break;
                    }
                }}>
               <h2>{name}</h2>
               <img  src={path} alt={name}/>  
           </div>
      </Wrapper>
    );
};
export default RectIcon;
const Wrapper = styled.div`
     div{
            width: 6rem;
            height:6rem;
            text-align: center;
            display: flex;
            border-radius: 2px;
            flex-direction: column;
            overflow: hidden;
            cursor: pointer;
        img{
            pointer-events: none;
            width: 100%;
            height: auto;   
            object-fit: contain; 
        }
        h2{
            font-size: 1.2rem;
            text-transform: capitalize;
            color: white;
        }
    }
   .active-icon{
        outline:2px solid ${({theme})=>theme.colors.dark_color}; 
    }
    .opacity{
        opacity:.5;
    }
    @media (max-width:${({theme})=>theme.media.mobile}){
        .active-icon{
            outline:2px solid ${({theme})=>theme.colors.light_color}; 
        }
    }
`;