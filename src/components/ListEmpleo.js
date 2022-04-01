import React, { useState, useEffect } from "react";
import styled from "styled-components";
import img from "../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import { FaArrowRight, FaRegClock } from 'react-icons/fa';
import TopNavbar from './TopNavbar';
import instance from './utils/Instance';
import { FaSearch, FaMapMarkerAlt } from 'react-icons/fa';
import fondo from "../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import { decodeJWT } from "./utils/Utils";



export const ListEmpleo = () => {
    const [listaPublicaciones, setlistaPublicaciones] = useState({});
    const [filtro, setFiltro] = useState({
        especialidad_id: 0,
        subespecialidad_id: 0,
        ubicacionId: "",
        palabraclave: ""
    });

    const tipoUser = typeof localStorage.getItem('token') === 'string' ? decodeJWT(localStorage.getItem('token')).tipousuario : "";
    const publicationIn = localStorage.getItem('token') && (tipoUser === 'EMP' || tipoUser === 'EMD') ? <LinkPublication href="/publication">Publicar Empleo</LinkPublication> : "";

    useEffect(() => {
        instance.get('/publicaciones/list/last')
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    setlistaPublicaciones(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
    }, []);

    const createChangeHandler = e => {
        const { name } = e.target;
        const value = e.target.value;
        setFiltro(prev => ({ ...prev, [name]: value }));

    };

    const send = () => {
        let aux;
        if (filtro.palabraclave === "") {
            aux = "*";
        } else { aux = filtro.palabraclave; };
        console.log(filtro);
        instance.get('/publicaciones/filter/0/0/0/' + aux)
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    setlistaPublicaciones(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
    };


    function calcFecha(variable) {
        variable = variable.replace(/-/g, '/');
        var hoy = new Date();
        var date = new Date(variable);

        var tiempoPasado = hoy - date;

        var segs = 1000;
        var mins = segs * 60;
        var hours = mins * 60;
        var days = hours * 24;
        var months = days * 30.416666666666668;
        var years = months * 12;

        //calculo 
        var anios = Math.floor(tiempoPasado / years);

        tiempoPasado = tiempoPasado - (anios * years);
        var meses = Math.floor(tiempoPasado / months);

        tiempoPasado = tiempoPasado - (meses * months);
        var dias = Math.floor(tiempoPasado / days);

        tiempoPasado = tiempoPasado - (dias * days);
        var horas = Math.floor(tiempoPasado / hours);

        tiempoPasado = tiempoPasado - (horas * hours);
        var minutos = Math.floor(tiempoPasado / mins);

        tiempoPasado = tiempoPasado - (minutos * mins);

        var tiempo;

        switch (true) {

            case anios > 0:
                let tanio = ' años';
                if (anios === 1) {
                    tanio = ' año';
                }
                tiempo = "hace " + anios + tanio;
                break;

            case meses > 0:
                let tmes = ' meses';
                if (meses === 1) {
                    tmes = ' mes';
                }
                tiempo = "hace " + meses + tmes;
                break;

            case dias > 0:
                let tdia = ' días';
                if (dias === 1) {
                    tdia = ' día';
                }
                tiempo = "hace " + dias + tdia;
                break;
            default: tiempo = "hoy";
                break;
        }
        return tiempo;
    };



    return (
        <div>
            <TopNavbar></TopNavbar>

            <Banner>
                <Titletwo>
                    Ofertas de empleo exculsivas
                    para nuestros graduados y emprendedores
                </Titletwo>

                <Filter>

                    <Input
                        className="first"
                        name="palabraclave"
                        type="text"
                        value={filtro.palabraclave}
                        onChange={createChangeHandler}
                        placeholder="Puesto o empleo"
                    />

                    <FaSearch className='search' />

                    <FaMapMarkerAlt className='map' />

                    <Input
                        name="ubicacionId"
                        onChange={createChangeHandler}
                        value={filtro.ubicacionId}
                        type="text"
                        placeholder="Ubicación"
                    />

                    <Submit type="button" value="Buscar" onClick={send} />
                </Filter>
                <div> <LinkPublication href="/filter">Búsqueda Avanzada</LinkPublication> {publicationIn}</div>
            </Banner>

            <Main>
                <Title>
                    Empleos Recientes
                </Title>
                <Container>
                    <List>
                        {Object.values(listaPublicaciones).map((publicacion) => {
                            return (
                                <Employed key={publicacion.publicacionid + publicacion.titulo} onClick={() => window.location.href = '/publication/' + publicacion.publicacionid}>
                                    <Img src={img}></Img>
                                    <Info>
                                        <InfoEmployed>
                                            <TitleEmployed>{publicacion.titulo}</TitleEmployed>
                                            <Label>Trabajo</Label>
                                        </InfoEmployed>
                                        <InfoStatus>
                                            <State>{publicacion.nombreempresa}</State>
                                            <State>Portoviejo</State>
                                            <State className="latest"><FaRegClock className="clock" /> {calcFecha(publicacion.fecha)}</State>
                                            <ViewEmployed > <FaArrowRight className="icon" /></ViewEmployed>
                                        </InfoStatus>
                                    </Info>
                                </Employed>

                            );
                        })}

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
        </div >
    );
}
    ;

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

const Employed = styled.button`
display: flex;
margin: 1em 0;
height: 120px;
background-color: white;
border: 1px darkgrey solid;
border-radius: 8px;
box-shadow: -5px 10px 10px -6px black;
padding: 1em;
transition: 300ms;

&:hover {
    transform: scale(1.02);

}
`;

const Img = styled.img`
height:100%;
width: 100px;
border-radius: 50%;
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

.latest{
   justify-content:left;
   padding-left: 1em;
}

`;

const State = styled.label`
display: flex;
justify-content:  center;
align-items: center;
color: gray;
width: 160px;
border-left: 2px solid gray;
font-size: 14px;
font-weight: 600;

&:first-child{
    border-left: none;
    justify-content: flex-start;
    padding-left: 1.8rem;
}

.clock {
margin-right: 0.4em;
}

`;

const ViewEmployed = styled.a`
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

//

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

div{
    display: flex;
    justify-content: space-between;
    width: 60%;
    padding: 1rem 1.2rem;
}
`;

const Titletwo = styled.h1`
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

const LinkPublication = styled.a`
color: white;
cursor: pointer;
font-size: 1.1rem;
font-weight: 900;
text-align: right;`;