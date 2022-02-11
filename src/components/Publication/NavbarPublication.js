import React from 'react';
import styled from 'styled-components';
import { HeaderPublication } from './HeaderPublication';


export const NavbarPublication = () => {
    return (
        <Container>
            <HeaderPublication />
            <Nav className='menu-detalle-empleo'>
                <NavOption href='#detalle' className="active">
                    Detalle
                </NavOption>

                <NavOption href='#requisitos'>
                    Requisitos
                </NavOption>

                <NavOption href='#condiciones'>
                    Condiciones laborales
                </NavOption>

                <NavOption href='#empresa'>
                    Sobre la empresa
                </NavOption>
            </Nav >
        </Container>
    );
};


export default NavbarPublication;


const Container = styled.div`
z-index: 1;
background-color: white;
width: 100%;
`;


const Nav = styled.nav`
display: flex;
margin: 0;
padding: 1em;
width: 100%;



.active{
    color : green;
}

@media (max-width: 720px){
    display: none;
}
`;

const NavOption = styled.a`
text-decoration: none;
padding: 2px 2em;
border-left: 1px solid #9FAAB8;
color : #9FAAB8;
font-weight: bold;

&:first-child{
    border: none;
    padding-left: 1em;
}
`;
