import React from 'react';
import styled from "styled-components";
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import background2 from "../../assets/img/descarga.jpg";
import TopNavbar from "../TopNavbar";

export const HeaderPublication = () => {
    return (
        <Container>

            <TopNavbar />

            <Header>
                <Background src={background} />
                <InfoHeader>
                    <ImgEmpleo src={background2} alt="user img">
                    </ImgEmpleo>
                    <Span>Trabajo</Span>

                    <Title
                        type="text"
                        name="nombre"
                        placeholder='Escriba aqui el titulo del empleo (max. 60 caracteres)'
                    />

                    <Ubicacion
                        type="text"
                        placeholder='Ubicación'
                    />
                </InfoHeader>
            </Header>

        </Container>
    );

};

export default HeaderPublication;

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100%;
height: 50vh;
margin-bottom: 4em;
background-color: gray;
`;



const Header = styled.div`
display: flex;
justify-content: center;
align-items: flex-end;
width: 100%;
height: 100%;
position: relative;
`;

const Background = styled.img`
position: absolute;
opacity: 0.8;
width: 100%;
`;

const InfoHeader = styled.div`
position: relative;
width: 70%;
height: 40%;
display: flex;
align-content: flex-end;
justify-content: space-between;
padding-bottom: 0.5em;
flex-direction: column;

`;

/* ImgEmpleo debe ser reemplazado por una imagen */
const ImgEmpleo = styled.img`
position: absolute;
top: 30%;
width: 9em;
height: 9em;
border-radius: 100%;
box-shadow: 4px 5px 8px 1px rgba(0, 0, 0, 0.4);
background-image: ${background2};
background-size: contain;
color: white;
text-align: center;
text-shadow:1px 3px 1px black;
`;

const Span = styled.span`
margin-left: 10em;
background-color: #147935;
padding: 0.5em 2em;
border: 1px solid gray;
border-right: 1em solid yellow;
color: white;
border-radius: 8px;
max-width: 8em;
`;

const Title = styled.input`
margin-left: 4.5em;
color: white;
background: transparent;
border: none;
text-shadow: 1px 3px 1px black;
font-size: 2.2rem;
font-weight: bold;

&::placeholder { color: aliceblue; }
`;

const Ubicacion = styled.input`
color: white;
margin-left: 8.4em;
background-color: transparent;
border: none;
color: white;
text-shadow: 1px 3px 1px black;
width: 40%;
font-size: 1.2rem;
&::placeholder { color: aliceblue; }
`;

