import React from "react";
import styled from "styled-components";
import fondo from "../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';

class Filtro extends React.Component {
    render() {
        return (
            <Banner>
                <Title>
                    Ofertas de empleo exculsivas
                    para nuestros graduados y emprendedores
                </Title>

                <Filter>

                    <Input class="first" type="text" placeholder="Puesto o empleo" />
                    <FaSearch class='search' />
                    <FaMapMarkerAlt class='map' />
                    <Input type="text" placeholder="Ubicación" />
                    <Submit type="button" value="Buscar" />
                </Filter>
            </Banner>
        );
    }
}

export default Filtro;


const Banner = styled.div`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 70vh;
background-color: antiquewhite;
background-image: url(${fondo});
background-size: 100% 100%;
background-repeat: no-repeat;
`;

const Title = styled.h1`
text-align: center;
color: white;
text-shadow: 0.1em 0.1em 0.05em #333;
width: 50%;
border-bottom: 2px white solid;
padding: 1em;
margin-top: -1em;
`;

const Filter = styled.form`
display: flex;
align-items: center;
height: 3.5em;
width: 60%;
margin-top: 2em;


.map , .search {
   color : gray;
   font-size: 30px;
   position: absolute;
   opacity: 0.8;
}

.map {
    left: 45.5%;
}

.search {
    left: 21.5%;
}
`;

const Input = styled.input`
width: 40%;
height: 100%;
padding: 0 2em 0 4em;
border: 1px gray solid;
outline: none;
font-size: 16px;

&:first-child{
border-top-left-radius: 8px;
border-bottom-left-radius: 8px;
}
`;

const Submit = styled.input`
width:20%;
height: 100%;
font-size: 18px;
background-color: green;
border: none;
color: white;
font-weight: bold;
border-top-right-radius: 8px;
border-bottom-right-radius: 8px;
cursor: pointer;
transition: 300ms;

&:hover {
  background-color:  #DAF7A6;
  color: Green;
  border: 1px green solid;
}
`;