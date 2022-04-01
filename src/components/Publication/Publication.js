import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NavbarPublication } from './NavbarPublication';
import styled from "styled-components";
import instance from '../utils/Instance';
import CardDetalleEmpleo from './CardDetalleEmpleo';
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import background2 from "../../assets/img/descarga.jpg";
import TopNavbar from "../TopNavbar";
import { decodeJWT } from "../utils/Utils";


export function DetalleEmpleo() {
    const { id } = useParams();
    const tipoUser = typeof localStorage.getItem('token') === 'string' ? decodeJWT(localStorage.getItem('token')).tipousuario : "";
    const empresaID = typeof localStorage.getItem('token') === 'string' ? decodeJWT(localStorage.getItem('token')).empresaId : "";
    let EditOn = (tipoUser === 'EMP' || tipoUser === 'EMD') ? true : false;
    const [edit, setEdit] = useState(true);



    let [objPublication, setObjPublication] = useState({
        nombre: '',
        descripcion: '',
        informacion_adicional: '',
        requisitos: {
            TITULACIONES: {},
            COMPETENCIAS: {},
            IDIOMAS: {},
            EXPERIENCIA: {}
        },
        habilidades: {},
        condicion_laboral: {
            JORNADA: '',
            TIPO_CONTRATO: '',
            HORARIO: '',
            REMUNERACION: ''
        },
        ofrecemos: '',
        especialidad_id: '',
        subespecialidad_id: '',
    });




    useEffect(() => {
        if (!EditOn) {
            setEdit(false);
        }
        if (id > 0) {
            instance.get('/publicaciones/findById/' + id)
                .then(resp => {
                    if (resp.data.statusCode === 200) {
                        const { nombre, descripcion, informacion_adicional, requisitos, habilidades, condicion_laboral, ofrecemos } = resp.data.data;
                        const data = {
                            nombre,
                            descripcion,
                            informacion_adicional,
                            requisitos: JSON.parse(requisitos),
                            habilidades: JSON.parse(habilidades),
                            condicion_laboral: JSON.parse(condicion_laboral),
                            ofrecemos,
                            especialidad_id: parseInt(resp.data.data.especialidad_id),
                            subespecialidad_id: parseInt(resp.data.data.subespecialidad_id),
                            empresa_id: empresaID,
                        };
                        setObjPublication(data);
                        if (typeof id !== "number" || (EditOn && data.empresa_id === empresaID)) {
                            setEdit(true);
                        }
                    } else {
                        console.log('Hubo un error');
                    }
                });
        } else {

        }
    });

    const listFlag = Object.keys(objPublication.habilidades) < 1 ? <li className='fake-textarea'></li> : "";

    const obtenerHabilidades = () => {
        var nodeList = document.getElementById('habilidades').childNodes;
        let obj = {};
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].innerText === '') {
            } else {
                obj[i + 1] = nodeList[i].innerText;
            }
        }
        objPublication.habilidades = obj;
    };

    const requisitosInputChange = event => {
        let id = event.target.id;
        var nodeList = document.getElementById(id).childNodes;
        let obj = {};
        for (let i = 0; i < nodeList.length; i++) {
            if (nodeList[i].innerText === '') {
            } else {
                obj[i + 1] = nodeList[i].innerText;
            }
        }
        objPublication.requisitos[id] = obj;
    };

    const condicionesInputChange = event => {
        let id = event.target.id;
        objPublication.condicion_laboral[id] = document.getElementById(id).innerText;
    };

    const handleInputChange = event => {
        let id = event.target.id;
        let value = document.getElementById(id).innerText;
        objPublication[id] = value;

    };

    const InputChange = event => {
        const id = event.target.id;
        const value = event.target.value;
        setObjPublication(prev => ({ ...prev, [id]: value }));

    };

    function savePublicaction() {
        obtenerHabilidades();
        const { nombre, descripcion, informacion_adicional, requisitos, habilidades, condicion_laboral, ofrecemos } = objPublication;
        const data = {
            nombre,
            descripcion,
            informacion_adicional,
            requisitos: JSON.stringify(requisitos),
            habilidades: JSON.stringify(habilidades),
            condicion_laboral: JSON.stringify(condicion_laboral),
            ofrecemos,
            especialidad_id: parseInt(document.getElementById('especialidad').value),
            subespecialidad_id: parseInt(document.getElementById('subespecialidad').value),
            empresa_id: 1
        };
        console.log(data);
        instance.post('/publicaciones/create', data)
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    alert('creado');
                    window.location.href = "/";
                } else {
                    console.log('Hubo un error');
                }
            });
    }

    return (
        <Container>
            <HeaderContainer>

                <TopNavbar />

                <Header>
                    <Background src={background} />
                    <InfoHeader>
                        <ImgEmpleo src={background2} alt="user img">
                        </ImgEmpleo>
                        <Span>Trabajo</Span>

                        <Title
                            id="nombre"
                            type="text"
                            name="nombre"
                            autoComplete='off'
                            value={objPublication.nombre}
                            onChange={InputChange}
                            placeholder='Escriba aqui el titulo del empleo (max. 60 caracteres)'
                        />

                        <Ubicacion
                            type="text"
                            placeholder='Ubicación'
                        />
                    </InfoHeader>
                </Header>

            </HeaderContainer>
            <NavbarPublication />
            <Main>
                <ContainerPublication>
                    <Ghost id='detalle' ></Ghost>
                    <h1>Detalle de la oferta:</h1>
                    <p
                        id='descripcion'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={handleInputChange}
                    >{objPublication.descripcion}
                    </p>


                    <Ghost id='requisitos' ></Ghost>
                    <h1 >Requisitos:</h1>

                    <h4>Titulaciones para la oferta:</h4>
                    <ul
                        id='TITULACIONES'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={requisitosInputChange}
                        suppressContentEditableWarning={true}
                    >
                        {listFlag}
                        {Object.values(objPublication.requisitos.TITULACIONES).map((titulacion) => {
                            return (
                                <li>{titulacion}</li>
                            );
                        })}

                    </ul>

                    <h3 className='segmetation'>Competencias:</h3>
                    <ul
                        id='COMPETENCIAS'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={requisitosInputChange}
                        suppressContentEditableWarning={true}
                    >
                        {listFlag}
                        {Object.values(objPublication.requisitos.COMPETENCIAS).map((competencia) => {
                            return (
                                <li>{competencia}</li>
                            );
                        })}
                    </ul>

                    <h3 className='segmetation'>Experiencias:</h3>
                    <ul
                        id='EXPERIENCIA'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={requisitosInputChange}
                        suppressContentEditableWarning={true}
                    >
                        {listFlag}
                        {Object.values(objPublication.requisitos.EXPERIENCIA).map((experiencia) => {
                            return (
                                <li>{experiencia}</li>
                            );
                        })}
                    </ul>

                    <h3 className='segmetation'>Idiomas requeridos:</h3>
                    <ul
                        id='IDIOMAS'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={requisitosInputChange}
                        suppressContentEditableWarning={true}
                    >
                        {listFlag}
                        {Object.values(objPublication.requisitos.IDIOMAS).map((idiomas) => {
                            return (
                                <li>{idiomas}</li>
                            );
                        })}
                    </ul>

                    <h3 className='segmetation'>Habilidades:</h3>
                    <ul
                        id='habilidades'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={obtenerHabilidades}
                        suppressContentEditableWarning={true}
                    >
                        {listFlag}
                        {Object.values(objPublication.habilidades).map((habilidad) => {

                            return (
                                <li>{habilidad}</li>
                            );

                        })}
                    </ul>

                    <Ghost id='condiciones' ></Ghost>
                    <h1 >Condiciones laborales:</h1>

                    <h3 className='segmetation'>Jornada:</h3>
                    <p
                        id='JORNADA'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={condicionesInputChange}
                    >
                        {objPublication.condicion_laboral.JORNADA}
                    </p>

                    <h3 className='segmetation'>Tipo de contrato:</h3>
                    <p
                        id='TIPO_CONTRATO'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={condicionesInputChange}
                    >
                        {objPublication.condicion_laboral.TIPO_CONTRATO}
                    </p>

                    <h3 className='segmetation'>Horario de trabajo:</h3>
                    <p
                        id='HORARIO'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={condicionesInputChange}
                    >
                        {objPublication.condicion_laboral.HORARIO}
                    </p>

                    <h3 className='segmetation'>Remuneración:</h3>
                    <p
                        id='REMUNERACION'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={condicionesInputChange}
                    >
                        {objPublication.condicion_laboral.REMUNERACION}
                    </p>

                    <h3 className='segmetation'>Ofrecemos:</h3>
                    <p
                        id='ofrecemos'
                        className='fake-textarea'
                        contentEditable={edit}
                        onInput={handleInputChange}
                    >
                        {objPublication.ofrecemos}
                    </p>

                    <button
                        type='button'
                        className="segmetation"
                        onClick={savePublicaction}
                    >
                        Crear registro
                    </button>
                </ContainerPublication>
                <ContainerCard>
                    <CardDetalleEmpleo />
                </ContainerCard>
            </Main>
        </Container >
    );
};

export default DetalleEmpleo;

const Container = styled.div`
position: relative;
width: 100%;
height: auto;
display: flex;
flex-direction: column;
justify-content: space-between;
font-family: 'Helvetica';
margin: 0;
.fake-textarea:empty::before {
        position: absolute;
        content: "Escribe aquí...";
        color: gray;
      }
`;

const Main = styled.form`
display: flex;
justify-content: space-between;
`;

const ContainerCard = styled.div`
display: flex;
justify-content: center;
`;

const ContainerPublication = styled.div`
position: relative;
height: 100%;
width: 60%;
padding: 2em;
display: flex;
flex-direction: column;
margin-bottom: 2em;

#idioma{
    display: flex;
}


.segmetation{
    margin-top: 0.5em;
}

h4{
    margin-top: 1em;
}

p, span{
    text-align: justify;
    margin: 1em 0;
    padding: 0.5em 0;
    font-size: 1rem;
    line-height: 150%;
}

li {
    margin-left: 2em;
}
`;

const Ghost = styled.div`
padding: 3em;

`;

//
const HeaderContainer = styled.div`
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

