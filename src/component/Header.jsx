import React from 'react';
import styled from 'styled-components';
import {BsTruck,BsSearch} from 'react-icons/bs';
import {CiMail} from 'react-icons/ci';
import {GiSettingsKnobs} from 'react-icons/gi';
import {MdPersonOutline} from 'react-icons/md';
import {AiOutlineHeart} from 'react-icons/ai';
import {BsCart} from 'react-icons/bs';

const Header = () => {
    return (
        <Wrapper>
            <div className='header_container_1'>
                <h2>Welcome to lovoj online store</h2>
                <div className='vl'></div>
                <div className='header_container_item'>
                    <BsTruck className='header_container_icon'/>
                    <h2>Track  Your Order</h2>
                </div>
                <div className='vl'></div>
                <div className='header_container_item'>
                    <CiMail className='header_container_icon'/>
                    <h2>Lovoj@gmail.com</h2>
                </div>
            </div>
            <div className='header_container_2' >
                <img src="./icon/logo.png" alt="logo" />
                <div className='header_container_2_item'>
                    <div className='header_container_2_item_country'>
                        <select name="country" id="country_select">
                            <option value="India">India</option>
                        </select>
                    </div>
                    <input type="text" required autoComplete='off' placeholder='key word here'/>
                    <div className='header_container_2_item_2_container'>
                        <div className='header_container_2_item_2'>
                            <div className='search_icon'>
                                <BsSearch/>
                            </div> 
                            <input className='search_input' type="text" required autoComplete='off' id='search_map' placeholder='Find by map' name="search_map"/>
                        </div>
                        <div className='header_container_2_item_2'>
                            <div className='search_icon'>
                                <BsSearch/>
                            </div> 
                            <input className='search_input' type="text" required autoComplete='off' id='search_map' placeholder='Find by grid' name="search_grid"/>
                        </div>
                        <div className='setting_icon'>
                             <GiSettingsKnobs className='icon'/>
                        </div>
                    </div>
                </div>
                <div className='header_container_2_item_3'>
                    <div className='header_container_2_item_3_item'>
                        <MdPersonOutline className='header_container_2_item_3_icon'/>
                        <div>My account</div>
                    </div>
                    <div className='header_container_2_item_3_item'>
                        <AiOutlineHeart  className='header_container_2_item_3_icon'/>
                        <div>wish list</div>
                        <div className='header_container_2_item_3_item_no'>
                            <span>1</span>
                        </div>
                    </div>
                    <div className='header_container_2_item_3_item'>
                        <BsCart  className='header_container_2_item_3_icon'/>
                        <div>my cart</div>
                        <div className='header_container_2_item_3_item_no'>
                            <span>0</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='header_container_3'>
                <nav>
                    <ul className='nav_list'>
                        <li className='nav_list_select' onClick={(e)=>{
                            onClickNavMenu(e);
                        }}>Home</li>
                        <li onClick={(e)=>{
                            onClickNavMenu(e);
                        }}>Shop near me</li>
                        <li onClick={(e)=>{
                            onClickNavMenu(e);
                        }}>About us</li>
                        <li onClick={(e)=>{
                            onClickNavMenu(e);
                        }}>ready made</li>
                        <li onClick={(e)=>{
                            onClickNavMenu(e);
                        }}>catogories</li>
                        <li onClick={(e)=>{
                            onClickNavMenu(e);
                        }}>be our partner</li>
                        <li onClick={(e)=>{
                            onClickNavMenu(e);
                        }}>contact us</li>
                    </ul> 
                </nav>
                <div className='header_container_3_text_item'>
                     <div className='header_container_3_text_item_icon'>
                        <AiOutlineHeart/>
                     </div>
                     <span>Special up to</span>
                     <span>60% off</span>
                     <span>all item</span>
                </div>
            </div>
        </Wrapper>
    );
};
export default Header;
const onClickNavMenu=(e)=>{
    console.log(e.target);
    const navBtn = document.querySelectorAll('.nav_list_select');
    navBtn.forEach((e)=>{
        e.classList.remove('nav_list_select');
    })
    e.target.classList.add('nav_list_select');

}
const Wrapper = styled.header`
    background-color: ${({theme})=>theme.colors.light_color};
    .header_container_1{
        height: 4rem;
        display: flex;
        background-color: ${({theme})=>theme.colors.text_highlight_color};
        justify-content: center;
        align-items: center;
        color: ${({theme})=>theme.colors.light_color};
        font-size: 1rem;
        gap: 2rem;
        text-transform: capitalize;
        font-family: 'Pixelify Sans';
        .header_container_item{
           display: flex;
           align-items: center;
           gap: .5rem;
           font-family: 'Pixelify';
           .header_container_icon{
                font-size: 2rem;
           }
        }
        .vl {
            border-left: 1px solid ${({theme})=>theme.colors.light_color};
            height: 2rem;
        }    
    }
    .header_container_2{
         display: flex;
         align-items: center;
         justify-content: space-around;
         background-color: ${({theme})=>theme.colors.light_color};
         color: ${({theme})=>theme.colors.border_color};
         margin-top: 2rem;
         img{
             width: 10rem;
             height: auto;
             object-fit: contain;
         }
         h2{
             font-size: 3rem;
         }
         .header_container_2_item{
             display: flex;
             align-items: center;
             justify-content: center;
             .header_container_2_item_country{
                select{
                    width: 15rem;
                    padding: 1rem; 
                    outline: none;
                    font-size: 1.2rem;
                    border: 1px solid #E7E7E7;
                    color: ${({theme})=>theme.colors.border_color};
                    option{
                        border: 1px solid #E7E7E7;
                        font-size: 1.2rem;
                        color: ${({theme})=>theme.colors.border_color};
                    } 
                }
             }
             input{
                 outline: none;
                 padding: 1rem;
                 border: 1px solid #E7E7E7;
                 color: ${({theme})=>theme.colors.border_color};
                 &::placeholder{
                    color: #BEC5D3;
                }
             }
          
         }
         .header_container_2_item_2_container{
            display: flex;
            align-items: center;
            gap: 1px;
            .setting_icon{
                /* transform: rotate(90deg); */
                background-color:  ${({theme})=>theme.colors.text_highlight_color};
                padding: 0 1rem;
                color: ${({theme})=>theme.colors.light_color};
                width: 5rem;
                height: 4.5rem;
                text-align: center;
                .icon{
                    width: 100%;
                    height: 100%;
                }
            }
            .header_container_2_item_2{
                display: flex;
                align-items: center;
                background-color:  ${({theme})=>theme.colors.text_highlight_color};
                padding: 0 1rem;
                justify-content: space-around;
                .search_icon{
                    font-size: 1.5rem;
                    color: ${({theme})=>theme.colors.light_color};
                }
                .search_input{
                    width: 10rem;
                    padding-left: 1rem;
                    outline: none;
                    border: none;
                    background-color:  ${({theme})=>theme.colors.text_highlight_color};
                    text-align: center;
                    color: ${({theme})=>theme.colors.light_color};
                    font-size: 1.5rem;
                    &::placeholder{
                        color: ${({theme})=>theme.colors.light_color};
                    }
                }
            }
         }
         .header_container_2_item_3{
             display: flex;
             gap: 3rem;
             .header_container_2_item_3_item{
                display: flex;
                flex-direction: column;
                align-items: center;
                font-size: 1.2rem;
                text-transform: capitalize;
                color: #606060;
             }
             .header_container_2_item_3_icon{
                font-size: 2rem;
                font-weight: 400;
                font-family: 'Mukta';
                color: #606060;
             }
             .header_container_2_item_3_item_no{
                position: absolute;
                width: 3rem;
                height: 3rem;
                display: flex;
                text-align: center;
                background-color:  ${({theme})=>theme.colors.text_highlight_color};
                color: ${({theme})=>theme.colors.light_color};
                border-radius: 50%;
                font-size: 1.2rem;
                transform: translate(70%,-70%);
                span{
                    margin: auto;
                }
             }
         }
    }
    .header_container_3{
        display: flex;
        justify-content: space-around;
        align-items: center;
        justify-items:center;
        user-select: none;
        padding: 1rem 0;
        .nav_list{
            display: flex;
            font-size: 1.5rem;
            align-items: center;
            gap: 5rem;
            list-style: none;
            text-transform:capitalize;
            padding: 1rem;
            color: ${({theme})=>theme.colors.border_color};
            cursor: pointer;
            li::after {
                content: "";
                display: block;
                margin: auto;
                height: .2rem;
                width: 0%;
                top: 5px;
                background: ${({theme})=>theme.colors.text_highlight_color};
                transition: all 0.3s;
            }
            .nav_list_select{
                color:  ${({theme})=>theme.colors.text_highlight_color};
            }
            .nav_list_select::after{
                width: 100%;
                background-color: ${({theme})=>theme.colors.text_highlight_color};
                
           }
        }
        .header_container_3_text_item{
            color: ${({theme})=>theme.colors.text_color};
            font-size: 2rem;
            display: flex;
            align-content: center;
            align-items: center;
            gap: 1rem;
            text-transform: capitalize;
            font-weight: 800;
            &>span:nth-child(3){
                color: #009F10;
            }
            .header_container_3_text_item_icon{
                align-self: center;
                line-height: 1rem;
            }
        }
        
    }
    @media screen and  (max-width:1024px){
        .header_container_2{
            margin-top: 4rem;
            h2{
             font-size: 3rem;
            }
            .header_container_2_item_3{
                gap: 2rem;
                .header_container_2_item_3_item{
                    font-size: 1.5rem;
                }
                .header_container_2_item_3_icon{
                    font-size: 2.2rem;
                }
                .header_container_2_item_3_item_no{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
        .header_container_3{
            .nav_list{
                gap: 3rem;
                padding: .5rem;
            }
            .header_container_3_text_item{
                font-size: 1.8rem;
            }
        }
    }
    @media (min-width:${({theme})=>theme.media.mobile}) and (max-width:${({theme})=>theme.media.tab}){
        display: none;
    }
    @media (max-width:${({theme})=>theme.media.mobile}){
        display: none;
    }

`