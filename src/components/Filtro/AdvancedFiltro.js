import React from "react";
import styled from "styled-components";
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import Navbar from "../Navbar";
import { FaRegClock, FaArrowRight } from 'react-icons/fa';

class AdvancedFilter extends React.Component {
    render() {
        return (
            <Container>
                <Navbar></Navbar>
                <Title>
                    Ofertas de empleos exclusivas para nuestros
                    graduados y emprendedores
                </Title>
                <DivFilter>
                    <div>
                        <Input type="text" placeholder="Palabra clave: Nombre, requisito u empresa" />
                        <Input type="text" placeholder="Provincia, ciudad o código postal" />
                    </div>

                    <div>
                        <ComboBox>
                            <option hidden selected>Seleccione</option>
                            <option >Opcion 1</option>
                            <option >Opcion 2</option>
                        </ComboBox>

                        <ComboBox>
                            <option hidden selected >Seleccione</option>
                            <option >Opcion 1</option>
                            <option >Opcion 2</option>
                        </ComboBox>
                    </div>
                    <Button>Buscar</Button>
                </DivFilter>

                <ListContainer>
                    <DivEmployed>
                        <Img src={background} />
                        <InfoContainer>
                            <div>
                                <label>Arquitecto</label>
                                <label class="label">trabajo</label>
                            </div>
                            <div class="info">
                                <label>Arquitecto</label>
                                <label>trabajo</label>
                                <label class="time"><FaRegClock class="clock" /> Hace 10 horas</label>
                                <ViewEmployed><FaArrowRight /></ViewEmployed>
                            </div>
                        </InfoContainer>
                    </DivEmployed>
                </ListContainer>
            </Container >
        );
    }
}

export default AdvancedFilter;

const Container = styled.div`
    width: 100%;
    height: auto;
    min-height: calc(100vh - 60px - 1em);;
    background-image: url(${background}) ;
    background-repeat: no-repeat;
    background-size: 100% 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2em;
`;

const Title = styled.h1`
text-align: center;
margin-top: 140px;
color: white;
text-shadow: 0.1em 0.1em 0.05em #333;
width: 50%;

@media (max-width: 1440px) {
   margin-top: 120px;
   width: 60%;
}

@media (max-width: 1280px) {
   margin-top: 120px;
   width: 70%;
}

@media (max-width: 820px) {
    width: 95%;
    margin-top: 120px;
}

@media (max-width: 620px) {
    margin-top: 120px;
    width: 98%;
}
`;

const DivFilter = styled.div`
padding: 1em;
width: 50%;
height: 400px;
min-width: 460px;
max-width: 700px;
background-color: white;
border: 1px solid gray;
margin-top: 30px;
border-radius:8px;
display: flex;
flex-direction:column;
align-items: center;
position: relative;

div{
width: 100%;
margin: 1em 0;
display: flex;
justify-content: space-between;
}

@media (max-width: 1280px) {
   width: 85%;
}


@media (max-width: 620px) {
    width: 90%;
    height: 380px;
}
`;

const ComboBox = styled.select`
width: 48%;
height: 40px;
padding: 0 1em;
outline: none;


option{
}
`;

const Input = styled.input`
width: 48%;
height: 40px;
padding: 0 1em;
outline: none;`;

const Button = styled.button`
position: absolute;
width: 20%;
height: 60px;
bottom: 1em;
color: #FFFCFC;
background-color: #147935;
border: none;
font-size: 18px;
font-weight: bold;
border-radius: 4px;
cursor: pointer;
`;


const ListContainer = styled.div`
width: 80%;
height: auto;
min-height: 100vh;
margin-top: 1em;
padding: 1em;
display: flex;
flex-direction: column;
align-items: center;
//display

//
@media (max-width:1080px){
    width: 96%;
}
`;

const DivEmployed = styled.div`
position: relative;
background-color: white;
width: 720px;
height: 120px;
border: 1px solid gray;
border-radius: 8px;
display: flex;
align-items: center;



`;

const Img = styled.img`
width: 120px;
height: 90px;
padding: 0 1em;
border-radius: 50%;
`;

const InfoContainer = styled.div`
position: relative;
display: flex;
flex-direction: column;

div{
    width: 580px;
    height: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0.5em 0;

    .label{
        background-color: #147935;
        color: white;
        border-radius: 8px;
        width: 100px;
        padding: 0.3em 1em;
        display: flex;
        border-right: 20px solid #FAC925;
    }
}
.info{
    justify-content: flex-start;
}

.info label {
    width: 25%;
    border-left: 2px gray solid;
    display: flex;
    align-items: center;
    justify-content: center;

&:first-child {
    border-left: none;
    justify-content: flex-start;
}

    .clock{
        width: 40px;
    }
    }

.time {width:40px}
`;

const ViewEmployed = styled.a`
position: absolute;
right: 0;
font-size: 26px;
color: green;
background-color: transparent;
border: none;
cursor: pointer;
`;