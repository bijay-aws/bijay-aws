import React from 'react';
import styled from 'styled-components';
import {RotatingTriangles} from 'react-loader-spinner'
const Loader = () => {
    return (
        <Wrapper className='loader'>
            <RotatingTriangles
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="rotating-triangels-loading"
                    wrapperStyle={{}}
                    wrapperClass="loader-wrapper"
                />
            </Wrapper>
    );
};
export default Loader;
const Wrapper = styled.div`
        left: 0%;
        top: 0%;
        width: 100%;
        height: 100vh;
        position: fixed;
        display: flex; 
        align-items: center;
        justify-content: center;
        background-color:#F6FDED; //rgba(0, 0, 0, .7);
        z-index: 100;
    .loader{
        .loader-wrapper{
            align-self: center;
            justify-self: center;
        } 
    }
`;
