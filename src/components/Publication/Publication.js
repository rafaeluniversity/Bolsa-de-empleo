import React, { useState } from 'react';
import { NavbarPublication } from './NavbarPublication';
import styled from "styled-components";
import instance from '../utils/Instance';



export const DetalleEmpleo = () => {

    const [objPublication, setObjPublication] = useState({
        empresaId: 0,
        nombre: '',
        descripcion: '',
        informacion_adicional: '',

        requisitos: {
            titulaciones: '',
            competencias: '',
            idiomas: {},
        },

        habilidades: {
            habilidades: ''
        },

        condicion_laboral: {
            general: '',
            funciones: '',
            formacion: '',
            experiencias: '',
            tipo_contrato: '',
            horario_contrato: ''
        },

        ofrecemos: ''
    });

    const createChangeHandler = e => {
        const { name } = e.target.id;
        const value = document.getElementById(name).innerHTML;
        setObjPublication(prev => ({ ...prev, [name]: value }));
    };

    function saveRegistro() {
        console.log(objPublication);
        instance.post('/usuario/create', objPublication)
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    alert('creado');
                } else {
                    console.log('Hubo un error');
                }
            });
    }

    return (
        <Container>
            <NavbarPublication />
            <ContainerPublication>
                <Ghost id='detalle' ></Ghost>
                <h1>Detalle de la oferta:</h1>

                <p contentEditable="true">{objPublication.condicion_laboral.general}</p>

                <h3>Principales funciones:</h3>
                <p contentEditable="true">
                    <ul>
                        <li>{objPublication.condicion_laboral.funciones}</li>
                    </ul>
                </p>
                <h3>Formación y requisitos del puesto:</h3>
                <p contentEditable="true">
                    <ul>
                        <li>{objPublication.condicion_laboral.formacion}</li>
                    </ul>
                </p>
                <h3 className='segmetation'>Experiencias:</h3>
                <p contentEditable="true">
                    {objPublication.condicion_laboral.experiencias}
                </p>
                <h3>Habilidades:</h3>
                <p contentEditable="true">
                    <ul>
                        <li> {objPublication.habilidades.habilidades}</li>
                    </ul>
                </p>
                <h3>Ofrecemos:</h3>
                <p contentEditable="true">
                    <ul>
                        <li id="ofrecemos" onChange={createChangeHandler}> {objPublication.ofrecemos} </li>
                    </ul>
                </p>
                <h3>Información adicional:</h3>
                <p contentEditable="true">
                    {objPublication.informacion_adicional}
                </p>

                <Ghost id='requisitos' ></Ghost>
                <h1 >Requisitos:</h1>
                <h4>Titulaciones para la oferta</h4>
                <p contentEditable="true">
                    <ul>
                        <li>{objPublication.requisitos.titulaciones}</li>
                    </ul>
                </p>

                <h3 className='segmetation'>Competencias:</h3>
                <p contentEditable="true">
                    {objPublication.requisitos.competencias}
                </p>

                <h3 className='segmetation'>Idiomas requeridos:</h3>

                <span id="idioma">
                    <p contenteditable="true">Ingles</p> <TB /><p>Nivel:</p> <TB /><p contenteditable="true">nivel alto</p>
                </span>

                <Ghost id='condiciones' ></Ghost>
                <h1 >Condiciones laborales:</h1>

                <h3 className='segmetation'>Tipo de contrato</h3>
                <p contentEditable="true">{objPublication.condicion_laboral.tipo_contrato}</p>

                <h3 className='segmetation'>Horario de trabajo</h3>
                <p contentEditable="true">{objPublication.condicion_laboral.horario_contrato}</p>

                <button className="segmetation">Crear registro</button>
            </ContainerPublication>
        </Container >
    );
};

export default DetalleEmpleo;

const Container = styled.form`
position: relative;
width: 100%;
height: auto;
display: flex;
flex-direction: column;
justify-content: space-between;
font-family: 'Helvetica';
margin: 0;
`;

const ContainerPublication = styled.div`
position: relative;
height: 100%;
width: 60%;
padding: 2em;
display: flex;
flex-direction: column;
margin-bottom: 2em;
background-color:aliceblue;

#idioma{
    display: flex;
}


.segmetation{
    margin-top: 3em;
}

h4{
margin-top: 1em;
}

p, span{
    text-align: justify;
    margin: 1em 0;
    padding: 0.2em 0;
    font-size: 1rem;
}

li {
    margin-left: 2em;
}
`;



const Ghost = styled.div`
padding: 3em;

`;

const TB = styled.label`
padding: 0 2em;

`;

const P = true ? styled.textarea`
resize: none;
` :
    styled.p`
`;