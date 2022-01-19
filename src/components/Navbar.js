import React from "react";
import styled from "styled-components";
import img from "../assets/img/logo.png";

class Navbar extends React.Component {
    render() {
        return (
            <Nav>
                <Logo src={img} />
                <Options>
                    <ListOption>
                        <LinkOption href="#">
                            <Op class="option">Registrate</Op>
                        </LinkOption>
                    </ListOption>
                    <ListOption>
                        <LinkOption href="#">
                            <Op>Postulantes</Op>
                        </LinkOption>
                    </ListOption>
                    <ListOption>
                        <LinkOption href="#">
                            <Op>Empresas</Op>
                        </LinkOption>
                    </ListOption>
                </Options>
            </Nav>
        );
    }
}

export default Navbar;

const Nav = styled.nav`
z-index: 1;
display: flex;
position: fixed;
justify-content: space-around;
align-items: center;
min-height: 60px;
width: 100%;
padding: 0.5em 2em;
background-color: white;
border-bottom: 1px solid gray;
`;

const Logo = styled.img`
height: 100%;
width: auto;
`;

const Options = styled.div`
display: flex;
align-items: center;
justify-content: space-evenly;
height: 100%;
width: 50%;
`;

const ListOption = styled.li`
list-style: none;
text-align: center;
`;

const LinkOption = styled.a`
text-decoration: none;
`;

const Op = styled.button`
width: 10em;
height: 2.5em;
border: 2px solid green;
border-radius: 2em;
font-weight: bold;
color: Gray;
font-size: 16px;
transition: 0.3s;

background-color: white;
cursor : pointer;

&:hover{
  background-color:  #DAF7A6;
  color: Green;
  border: 2px green solid;
}
`;

