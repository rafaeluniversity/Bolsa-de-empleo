import React from "react";
import styled from "styled-components";
import img from "../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import { FaArrowRight, FaRegClock } from 'react-icons/fa';
import TopNavbar from './TopNavbar';
import Filtro from './Filtro';

class ListEmpleo extends React.Component {
    render() {
        return (
            <div>
                <TopNavbar></TopNavbar>
                <Filtro></Filtro>
                <Main>
                    <Title>
                        Empleos Recientes
                    </Title>
                    <Container>
                        <List>
                            <Employed>
                                <Img src={img}></Img>
                                <Info>
                                    <InfoEmployed>
                                        <TitleEmployed>Analista Financiero</TitleEmployed>
                                        <Label>Trabajo</Label>
                                    </InfoEmployed>
                                    <InfoStatus>
                                        <State>Banco Pichincha</State>
                                        <State>Portoviejo</State>
                                        <State class="latest-state"><FaRegClock class="clock" /> Hace una hora</State>
                                        <ViewEmployed> <FaArrowRight class="icon" /></ViewEmployed>
                                    </InfoStatus>
                                </Info>
                            </Employed>

                            <Employed>
                                <Img src={img}></Img>
                                <Info>
                                    <InfoEmployed>
                                        <TitleEmployed>Analista Financiero</TitleEmployed>
                                        <Label>Trabajo</Label>
                                    </InfoEmployed>
                                    <InfoStatus>
                                        <State>Banco Pichincha</State>
                                        <State>Portoviejo</State>
                                        <State class="latest-state"><FaRegClock class="clock" /> Hace una hora</State>
                                        <ViewEmployed> <FaArrowRight class="icon" /></ViewEmployed>
                                    </InfoStatus>
                                </Info>
                            </Employed>

                            <More>
                                <MoreButton>Más Empleos</MoreButton>
                            </More>
                        </List>
                        <Published>
                            <Subtitle>Sobre Nosotros</Subtitle>
                            <P>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt
                                in culpa qui officia deserunt mollit anim id est laborum."</P>
                            <P>"Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                                Excepteur sint occaecat cupidatat non proident, sunt
                                in culpa qui officia deserunt mollit anim id est laborum."</P>

                            <ImgPublished src={img} />
                            <ImgPublished src={img} />
                        </Published>
                    </Container>
                </Main>
            </div>
        );
    }
}

export default ListEmpleo;


const Main = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 1em;
height: auto;
min-height: 100vh;
`;

const Title = styled.h1`
text-align: center;
width: 20%;
height: 2em;
color: gray;
border-bottom: 4px solid gray;
`;

const Container = styled.div`
display: flex;
justify-content: space-between;
width:90%;
height: 100%;
`;

const List = styled.div`
display: flex;
flex-direction: column;
width: 60%;
height: auto;
min-height: 100vh;
position: relative;
`;

const Employed = styled.div`
display: flex;

margin: 1em 0;
height: 120px;
background-color: white;
border: 1px darkgrey solid;
border-radius: 8px;
box-shadow: -5px 10px 10px -6px black;
padding: 1em;
`;

const Img = styled.img`
height:100%;
border-radius: 2em;
border: 1px solid black;
`;

const Info = styled.div`
margin: 0;
width: 100%;
height: 100%;`;


const InfoEmployed = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 1.6em;
height: 50%;
width: 100%;
font-size: 16px;
font-weight: bold;
color: #4C4544;
`;

const TitleEmployed = styled.span`
`;

const Label = styled.label`
color: white;
background-color: green;
padding: 0.2em 1em;
border-radius: 4px;
border-right: 1em solid yellow;
box-shadow: -5px 8px 8px -6px black;
position: static;
font-size: 14px;
`;

const InfoStatus = styled.div`
display: flex;
align-items: center;
height: 50%;
width: 100%;
`;

const State = styled.label`
display: flex;
justify-content: center;
align-items: center;
color: gray;
width: 160px;
border-left: 2px solid gray;
font-size: 14px;
font-weight: 600;

&:first-child{
    border-left: none;
}

.clock {
margin-right: 0.4em;
}
`;

const ViewEmployed = styled.button`
width: 60px;
height: 30px;
margin-left: 5em;
border: none;
background-color: transparent;
cursor: pointer;
transition: 300ms;

.icon {
color: green;
font-size: 30px;
height: 26px;
width: 70px;
}

&:hover{
    transform: rotate(360deg);
}
`;



const Published = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 1em;
width: 35%;
height: 100%;
justify-content: space-evenly;
color: #4C4544;
background-color: aliceblue;
border-radius: 4px;
`;

const Subtitle = styled.h2`
`;

const P = styled.p`
margin: 1em
`;

const ImgPublished = styled.img`

width:90%;
height: 40%;
margin: 1em;
border-radius: 8px`;

const More = styled.div`
margin-top: 1em;
display: flex;
align-items: center;
justify-content: center;
width: 100%;
height: 40px;
`;

const MoreButton = styled.button`
width: 10em;
height: 3em;
cursor: pointer;
border: 1px solid black;
background-color: green;
color: white;
font-weight: bold;
transition: 300ms;
font-size: 16px;
border-radius: 4px;

&:hover{
    color: green;
    background-color: white;
    border: 2px solid green;
}

`;