import React from 'react';
import styled from 'styled-components';
import * as CONFIG_DATA from '../KurtiConfigData';
import {AiOutlineStop} from 'react-icons/ai';
import {mKurtiObj,CurrentType,GRID_SEL} from '../component/Web3D';
const GridMenu = ({currentState,datalist,LengthType,currentSel,setSelection}) => {
    let mCurrentSel=currentSel;
    const path={imgPath:"",glbPath:""};
    React.useEffect(()=>{
        // console.log("innnnnnnnnnnnnnnnnnn effect");
         if(setSelection)
            setSelection(mCurrentSel);
    },[currentState])
    
    const removeSelection=()=>{
        const buttons = document.querySelectorAll('.grid_item_selected');    
        buttons.forEach((e)=>{
            e.classList.remove('grid_item_selected');
        })
    }
    switch(currentState){
        case CONFIG_DATA.KurtiStyleMenuList.sleeves:
                 CurrentType.value  =CONFIG_DATA.KurtiStyleMenuList.sleeves; 
                 path.imgPath = './ui/sleeves_icons/';
                if(mKurtiObj)
                    mKurtiObj.setAnim(Math.PI/2);
            break;
        case CONFIG_DATA.KurtiStyleMenuList.front:
                CurrentType.value  =CONFIG_DATA.KurtiStyleMenuList.front; 
                path.imgPath = './ui/neck_icons/front/';
                if(mKurtiObj)
                    mKurtiObj.setAnim(0);
            break;
        case CONFIG_DATA.KurtiStyleMenuList.back:
                CurrentType.value  =CONFIG_DATA.KurtiStyleMenuList.back; 
                path.imgPath = './ui/neck_icons/back/';
                if(mKurtiObj)
                    mKurtiObj.setAnim(Math.PI);
            break;
        case CONFIG_DATA.StyleMenuList.bottom_wear:
                CurrentType.value  = CONFIG_DATA.StyleMenuList.bottom_wear; 
                path.imgPath = './ui/bottomwear/';
                if(mKurtiObj)
                    mKurtiObj.setAnim(0);
            break;
        case CONFIG_DATA.KurtiStyleMenuList.accessories:    
                CurrentType.value  = CONFIG_DATA.KurtiStyleMenuList.accessories; 
                path.imgPath = './ui/accessories/';
            break;
        case CONFIG_DATA.KurtiStyleMenuList.length:
            CurrentType.value  = CONFIG_DATA.KurtiStyleMenuList.length; 
            switch(LengthType){
                case CONFIG_DATA.LengthMenuList.long:
                        path.imgPath = './ui/kurti_icons/long/';
                    break;
                case CONFIG_DATA.LengthMenuList.short:
                        path.imgPath = './ui/kurti_icons/short/';
                    break;
                case CONFIG_DATA.LengthMenuList.curve:
                        path.imgPath = './ui/kurti_icons/curve/';
                    break;
                case CONFIG_DATA.LengthMenuList.without_slit:
                        path.imgPath = './ui/kurti_icons/slit/';
                    break;
                case CONFIG_DATA.LengthMenuList.without_slit_medium:
                        path.imgPath = './ui/kurti_icons/slit_medium/';
                    break;
                case CONFIG_DATA.LengthMenuList.without_slit_long:
                        path.imgPath = './ui/kurti_icons/slit_long/';
                    break;
                default:
                    break;
            }
            break;
        default:
           break;
        
    }
    const onClickGridItem=(e,item_name,index)=>{
        e.target.classList.add('grid_item_selected');
        // console.log("==== onClickGridItem=== ",index);
        if(!mKurtiObj)
          return;
        mCurrentSel = index;
        if(setSelection)  
            setSelection(index);
        switch(currentState){
            case CONFIG_DATA.KurtiStyleMenuList.sleeves:
                  if(index !== GRID_SEL.sleeves){
                        CurrentType.value  =CONFIG_DATA.KurtiStyleMenuList.sleeves; 
                        path.glbPath = `./3dmodel/kurtistyle/sleeves/${item_name}.glb`;
                        if(item_name !== "none")
                            mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.sleeves,path.glbPath);
                        else{
                            mKurtiObj.setEnableModel(mKurtiObj.sleeves.model,false);
                        }  
                  }
                  GRID_SEL.sleeves=index;
                break;
            case CONFIG_DATA.KurtiStyleMenuList.front:
                    if(index!==GRID_SEL.front){
                        CurrentType.value  =CONFIG_DATA.KurtiStyleMenuList.front;
                        path.glbPath = `./3dmodel/kurtistyle/kurti/neck/front/${item_name}.glb`;
                        mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.front,path.glbPath);
                    }
                    GRID_SEL.front=index;
                break;
            case CONFIG_DATA.KurtiStyleMenuList.back:
                if(index !== GRID_SEL.back){
                    CurrentType.value  =CONFIG_DATA.KurtiStyleMenuList.back;
                    path.glbPath = `./3dmodel/kurtistyle/kurti/neck/back/${item_name}.glb`;
                    mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.back,path.glbPath);
                } 
                GRID_SEL.back=index;
                break;
            case CONFIG_DATA.StyleMenuList.bottom_wear:
                    if(index!==GRID_SEL.bottom_wear){
                        CurrentType.value  = CONFIG_DATA.StyleMenuList.bottom_wear;
                        path.glbPath = `./3dmodel/bottomwear//${item_name}.glb`;
                        if(item_name !== "none")
                            mKurtiObj.changeModel(CONFIG_DATA.StyleMenuList.bottom_wear,path.glbPath);
                        else    
                            mKurtiObj.setEnableModel(mKurtiObj.laggie.model,false);
                    }
                    GRID_SEL.bottom_wear = index;
                break;
            case CONFIG_DATA.KurtiStyleMenuList.accessories:    
                  path.glbPath = `./3dmodel/accessories/${item_name}.glb`;
                  if(item_name !== "none")
                    mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.accessories,path.glbPath);
                 else
                    mKurtiObj.setEnableModel(mKurtiObj.accessories.model,false);
                  
                 break;   
            case CONFIG_DATA.KurtiStyleMenuList.length:
                    CurrentType.value  = CONFIG_DATA.KurtiStyleMenuList.length;
                  switch(LengthType){
                     case CONFIG_DATA.LengthMenuList.long:
                            //  if(index !== GRID_SEL.length.long){
                                path.glbPath = `./3dmodel/kurtistyle/kurti/length/long/${item_name}.glb`;
                                mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.length,path.glbPath);
                            //  }
                             GRID_SEL.length.long = index;
                        break;
                    case CONFIG_DATA.LengthMenuList.short:
                            //  if(index !== GRID_SEL.length.short){
                                path.glbPath = `./3dmodel/kurtistyle/kurti/length/short/${item_name}.glb`;
                                mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.length,path.glbPath);
                            //  }
                            GRID_SEL.length.short = index;
                        break;
                    case CONFIG_DATA.LengthMenuList.curve:
                            // if(index !== GRID_SEL.length.curve){
                                path.glbPath = `./3dmodel/kurtistyle/kurti/length/curve/${item_name}.glb`;
                                mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.length,path.glbPath);
                            // }
                            GRID_SEL.length.curve = index;
                        break;
                    case CONFIG_DATA.LengthMenuList.without_slit:
                            // if(index !== GRID_SEL.length.w_o_slit){
                                path.glbPath = `./3dmodel/kurtistyle/kurti/length/slit/${item_name}.glb`;
                                mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.length,path.glbPath);    
                            // }
                            GRID_SEL.length.w_o_slit = index;
                        break;
                    case CONFIG_DATA.LengthMenuList.without_slit_medium:
                            //  if(index!==GRID_SEL.length.w_o_slit_m){
                                path.glbPath = `./3dmodel/kurtistyle/kurti/length/slit_medium/${item_name}.glb`;
                                mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.length,path.glbPath);    
                            //  }
                            GRID_SEL.length.w_o_slit_m = index;
                    break;
                    case CONFIG_DATA.LengthMenuList.without_slit_long:
                            // if(index!==GRID_SEL.length.w_o_slit_l){
                                path.glbPath = `./3dmodel/kurtistyle/kurti/length/slit_long/${item_name}.glb`;
                                mKurtiObj.changeModel(CONFIG_DATA.KurtiStyleMenuList.length,path.glbPath);    
                            // }
                            GRID_SEL.length.w_o_slit_l= index;
                    break;
                    default:
                        break;
                  }
                break;
            default:
               break;
        }
    }
    return (
        <Wrapper>
             <div className='grid-container'>
                {
                    datalist.map((item,index)=>{
                        return(
                            <div  className='grid-container-item' key={index} onClick={(e)=>onClickGridItem(e,item,index)}>
                                 {
                                    item==="none"?<AiOutlineStop className={currentSel===index? 'grid_item_selected none-icon': 'none-icon'}/>:
                                    <img className={currentSel===index? 'grid_item_selected my-icon': 'my-icon'} src={`${path.imgPath+item}.png`} alt={item}/>
                                 }       
                            </div>
                        )
                    })
                }
             </div>
        </Wrapper>
    );
};
export default GridMenu;

const Wrapper = styled.div`
     display: block;
     padding: 0 ;
    .grid-container{
        display: grid;
        padding: 0 .5rem 5rem 1rem;
        width: fit-content;
        height: auto;
        max-height: 12rem;
        overflow-x: hidden;
        overflow-y :auto;
        grid-template-columns: repeat(7, 1fr);
        justify-items: start;
        column-gap: .25rem;
        ::-webkit-scrollbar{
            width: 1.5rem;
        }
        ::-webkit-scrollbar-track {
            background-color: ${({theme})=>theme.colors.dark_color2};
        }
        ::-webkit-scrollbar-thumb {
            background-color: ${({theme})=>theme.colors.light_color};
            border: 4px solid transparent;
            border-radius: 9px;
            background-clip: content-box;
        }
        .grid-container-item{
            padding: .5rem;
            cursor: pointer;
            text-align: center;
            font-size: 1rem;
            color: ${({theme})=>theme.colors.light_color};
            pointer-events: none;
            .none-icon{
                pointer-events: all;
                font-size: 5rem;
                color: ${({theme})=>theme.colors.dark_color};
                background-color:${({theme})=>theme.colors.light_color};
            }
            h2{
                pointer-events: none;
            }
            .my-icon{
                width: 5rem;
                height: 5rem;
                /* object-fit: contain; */
                pointer-events: all;
                text-align: left;
            }
            .grid_item_selected{
                border: 2px solid ${({theme})=>theme.colors.border_highlight_color};
                transform: scale(1.15);
            }
        }
    }
    @media (max-width:${({theme})=>theme.media.mobile}){
        .grid-container{
            padding: 0 .5rem 12rem 1rem;
            height: 20rem;
            max-height: 20rem;
        }
    }
`