import React from 'react';
import styled from "styled-components";
import Logo from "../assets/img/logo.png";


export const TopNavbar = () => {
    return (
        <Container>
            <LogoContainer src={Logo} />
            <UserOptions></UserOptions>
        </Container >
    );

};

export default TopNavbar;

const Container = styled.div`
display: flex;
justify-content: space-between;
padding: 0 5em;
align-items: center;
width: 100%;
height: 5em;
background-color: white;
position: fixed;
z-index:1;
border-bottom: 1px solid gray;
`;

const LogoContainer = styled.img`
`;

const UserOptions = styled.div`
background-color: aliceblue;
width:  4em;
height: 4em;
border: 1px solid gray;
border-radius: 100%;
`;