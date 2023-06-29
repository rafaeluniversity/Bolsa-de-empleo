import React from 'react';
import styled from "styled-components";
import Logo from "../assets/img/logo.png";
import { FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';

export const TopNavbar = () => {

    function clearStorage() {
        localStorage.removeItem('token');
    }

    const isLoggedIn = localStorage.getItem('token');
    let button;

    if (isLoggedIn === "" || isLoggedIn === null) {
        button = <LoginButton href='/login'>Iniciar Sesión</LoginButton >;
    } else {
        //User options
        button = 
        <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <LoginButton href='/login' onClick={clearStorage} > Cerrar Sesión </LoginButton >
            <Link to="/perfil"><div style={{color:'white',backgroundColor:'green',width:40,height:40,borderRadius:50,marginLeft:10,textAlign:'center',cursor:'pointer'}}><FaUser size={20} color='white' style={{marginTop:10}}/></div></Link>
        </div>
       
       
    };

    return (
        <Container>
            <a href="/"><LogoContainer src={Logo} /></a>
            {button}
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
margin-left:200px;
`;

const UserOptions = styled.div`
background-color: aliceblue;
width:  4em;
height: 4em;
border: 1px solid gray;
border-radius: 100%;
`;

const LoginButton = styled.a`
text-decoration: none;
color: green;
cursor: pointer;
font-size: 1.2rem;
font-weight: 700;
`;