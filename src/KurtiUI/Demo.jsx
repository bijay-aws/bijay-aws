import React from 'react';
import styled from 'styled-components';

const Demo = () => {
    return (
        <Wrapper>
             <section className='first_section'>
                 <div>
                     <h2>Nikhil</h2>
                     <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
                 </div>
             </section>
             {/* <section className='second_section'>
                    <div>
                        <h2>Jain</h2>
                        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos,</p>
                    </div>
             </section>
             <section className='third_section'>
                 <div>
                     <h2>Bhavi</h2>
                     <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, sint? Laboriosam quam sint veniam</p>
                 </div>
             </section> */}
        </Wrapper>
    );
};

export default Demo;

const Wrapper = styled.main`
     section{
         width: 100%;
         height: 100vh;
         color:  white;
         padding: 5rem;
         display: grid;
         place-items: center;
         text-align: center;
         div{
            margin: auto 0;
            
            h2{
                line-height: 8rem;
                font-size: 8rem;
                text-shadow: .1rem .1rem .1rem #000000;
            }
            p{
                font-size: 2rem;
                text-decoration-line: underline;
                text-decoration-color: #FF0000;
                text-decoration-thickness: 1px;
                text-decoration-style: wavy;
                ::first-letter{
                    font-size: 10rem;
                    color: azure;
                }
            }
         }
     }
     .first_section{
         background-color: red  yellow;
         background-repeat: no-repeat;
         background-size: cover;
         background-attachment:fixed;
     }
     .second_section{

        background-image: linear-gradient(
            rgba(0,0,0,.5),
            rgba(0,0,0,.5)
         ),url('https://picsum.photos/id/237/200/300');
         background-repeat: no-repeat;
         background-size: cover;
         background-attachment:fixed;
     }
     .third_section{

        background-image: linear-gradient(
            rgba(0,0,0,.5),
            rgba(0,0,0,.5)
         ),url('https://picsum.photos/seed/picsum/200/300');
         background-repeat: no-repeat;
         background-size: cover;
         background-attachment:fixed;
     }

`