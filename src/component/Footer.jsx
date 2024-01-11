import React from 'react';
import styled from 'styled-components';
import {TiLocation} from 'react-icons/ti';
import {GrFacebookOption} from 'react-icons/gr';
import {AiOutlineInstagram,AiFillYoutube} from 'react-icons/ai';
import  {RiTwitterXLine} from 'react-icons/ri';

const Footer = () => {
    return (
        <Wrapper>
            <div className='footer_container'>
                  {/* !!! col1 !!!!!!! */}
                  <div className='footer_container_flex'>
                        <img className='footer_container_first_icon' src="./icon/logo.png" alt="logo" />
                        {/* <div className='footer_container_first_icon'>LOVOJ</div>   */}
                        <div className='footer_address'>
                            <div className='footer_address_icon'>
                                <TiLocation className='icon'/>
                            </div>
                            <h3>12 Todermal Road,New Delhi- 11001,India</h3>
                        </div>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos, labore! Alias quasi unde consequatur est voluptas</p>
                         <h2>Follow Us </h2>
                         <div  className='footer_social_media'>
                             <div className='footer_social_media_icon'>
                                <GrFacebookOption  className='icon'/>
                             </div>
                             <div className='footer_social_media_icon'>
                                <RiTwitterXLine  className='icon'/>
                             </div>
                             <div className='footer_social_media_icon'>
                                <AiOutlineInstagram  className='icon'/>
                             </div>
                             <div className='footer_social_media_icon'>
                                <AiFillYoutube  className='icon'/>
                             </div>
                             
                         </div>
                  </div>  
                 {/* !!! col2!!! */}
                 <div className='footer_container_flex footer_container_2'>
                        <div>shop near me</div>
                        <div>Ready made</div>
                        <div>Be Our Partner</div>
                        <div>About Us</div>
                        <div>Contact Us</div>
                        <div>checkout</div>
                        <div>wishlist</div>
                 </div>
                 <div className='footer_container_flex footer_container_3'>
                        <div>categories</div>
                        <div>Altration</div>
                        <div>Blouse</div>
                        <div>Big Size</div>
                        <div>Privacy Policy</div>
                        <div>Media & Press</div>
                 </div>
                 <div className='footer_container_flex footer_container_4'>
                        <h2>download our app</h2>
                        <img src="./icon/google_play.png" alt="google_play" />
                        <img src="./icon/apple_store.png" alt="apple_store" />
                        
                 </div>
                 <div className='footer_container_flex footer_container_5'>
                        <div>News Letter</div>
                        <p>Fill their seed open meat. Sea you great Saw image stl</p>
                        <input type="email" id='contact_mail' autoComplete='off' placeholder='Email Address' />
                        <div className='subscribe_btn'>Subscribe</div> 
                 </div>
            </div>
            <div className='copy_right'>Copyright © 2023 lovoj. All Rights Reserved. Design By lovoj</div>
            
        </Wrapper>
    );
};

export default Footer;
const Wrapper =    styled.footer`
    background-color: ${({theme})=>theme.colors.footer_bg_color};
    user-select: none;
   .copy_right{
        margin: auto;
        text-align: center;
        font-size: 1.2rem;
        padding: .53rem 1rem;
        border-bottom: .5rem solid ${({theme})=>theme.colors.text_highlight_color};
        
    }
  .footer_container{
        padding: 2rem 10rem;
        display: grid;
        grid-template-columns: repeat(5,1fr);
        justify-items: center;
        column-gap: 1rem;
        margin: 0 auto;
   }
   .icon{
      width: 100%;
      height: 100%;
      transform: translateX(-20%);
   }
   .footer_container_flex{
        display: flex;
        flex-direction: column;
        gap: .5rem;
        align-content: center;
        text-align: left;
   }
   .footer_container_first_icon{
         margin-bottom: 1.5rem;
         width: 10rem;
         height: auto;
         object-fit: contain;
     }
     .footer_address{
         display: flex;
         gap: .5rem;
         padding: 0%;
         align-items: center;
         .footer_address_icon{
            width: 2.5rem;
            height: 2.5rem;
            text-align: left;
         }
         h3{
            font-size: 1.2rem;
            font-weight: 900;
         }
     }
     p{
        font-size: 1.2rem;
     }
     h2{
        font-weight: 400;
        font-size: 1.5rem;
     }
     .footer_social_media{
        display: flex;
        color:  ${({theme})=>theme.colors.text_highlight_color};
        gap: .5rem;
        .footer_social_media_icon{
            width: 1.5rem;
            height: 1.5rem;
            text-align: left;
        }
     }
     .footer_container_2,.footer_container_3,.footer_container_5{
        text-transform: capitalize;
        font-size: 1.2rem;
        &>div:nth-child(1){
            font-size: 1.5rem;
            margin-bottom: 1.5rem;
          
        }
        &>div:nth-child(1)::after{
            content: '';
            display: block;
            height: .2rem;
            width: 50%;
            max-width: 5rem;
            top: 5px;
            background: ${({theme})=>theme.colors.footer_text_underline};
            transition: all 0.3s;
        }
     }
     .footer_container_4{
         display: flex;
         gap: 2rem;
         h2{
             text-transform: capitalize;
             font-weight: 900;
             font-size: 2rem;
             /* text-align: center; */
         }
         img{
                width: 15rem;
                height: auto;
                object-fit: contain;
            }
     }
     .footer_container_5{
        input[type="email"]{
            padding: 1rem 2rem;
            border: none;
            outline: none;
            font-size: 1.2rem;
            background-color: #F2F2F2;
        }
        .subscribe_btn{
            padding: 1rem 2rem;
            text-align: center;
            font-size: 2rem;
            background-color: ${({theme})=>theme.colors.text_highlight_color};
            color:  ${({theme})=>theme.colors.light_color};
        }
     }

     @media screen and  (max-width:${({theme})=>theme.media.laptop}){
        .footer_container{
            padding: 2rem 4rem;
            column-gap: 1rem;
            /* margin: 0 auto; */
        }
     }
     @media screen and (min-width:${({theme})=>theme.media.mobile}) and (max-width:${({theme})=>theme.media.tab}){
         display: none;
            
    }
    @media screen and (max-width:${({theme})=>theme.media.mobile}){
        display: none;
    }
`