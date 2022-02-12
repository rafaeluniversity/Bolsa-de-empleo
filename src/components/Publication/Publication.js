import React, { useState } from 'react';
import { NavbarPublication } from './NavbarPublication';
import styled from "styled-components";
import instance from '../utils/Instance';


var tx = document.getElementsByTagName('TextArea');
for (var i = 0; i < tx.length; i++) {
    tx[i].setAttribute('style', 'height:' + (tx[i].scrollHeight) + 'px;overflow-y:hidden;');
    tx[i].addEventListener("input", OnInput, false);
}

function OnInput(e) {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
}


export const DetalleEmpleo = () => {

    const [objPublication, setObjPublication] = useState({
        empresa_id: 0,
        nombre: '',
        descripcion: '',
        informacion_adicional: '',

        requisitos: {
            titulaciones: '',
            competencias: '',
            idiomas: {},
        },

        habilidades: {},

        condicion_laboral: {
            funciones: '',
            formacion: '',
            experiencias: '',
            tipo_contrato: '',
            horario_contrato: ''
        },

        ofrecemos: ''
    });


    const [objPublicationTest, setObjPublicationTest] = useState({
        empresa_id: 10,
        nombre: 'Titulo de empleo',
        descripcion: 'lorem',
        informacion_adicional: 'lorem',

        requisitos: {
            titulaciones: 'lorem',
            competencias: 'lorem',
            idiomas: { lorem: "lorem" },
        },

        habilidades: {
            1: "Programacion Web"
        },

        condicion_laboral: {
            funciones: 'lorem',
            formacion: 'lorem',
            experiencias: 'lorem',
            tipo_contrato: 'lorem',
            horario_contrato: 'lorem'
        },

        ofrecemos: 'lorem'
    });


    const textChangeHandler = e => {
        const { name } = e.target;
        const value = e.target.value;
        setObjPublication(prev => ({ ...prev, [name]: value }));
    };

    function savePublication() {
        objPublicationTest.requisitos = JSON.stringify(objPublicationTest.requisitos);
        objPublicationTest.condicion_laboral = JSON.stringify(objPublicationTest.condicion_laboral);
        objPublicationTest.habilidades = JSON.stringify(objPublicationTest.habilidades);

        console.log(objPublicationTest);

        instance.post('/publicaciones/create', objPublicationTest)
            .then(resp => {
                console.log(resp.data);
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
                <TextArea
                    id="iddescripcion"
                    name="descripcion"
                    tType="json"
                    value={objPublication.descripcion}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui una descripción  de la oferta "
                />


                <h3>Principales funciones:</h3>
                <TextArea
                    id="idfunciones"
                    name="funciones"
                    tType="json"
                    value={objPublication.condicion_laboral.funciones}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />


                <h3>Formación y requisitos del puesto:</h3>
                <TextArea
                    id="idformacion"
                    name="formacion"
                    tType="json"
                    value={objPublication.condicion_laboral.formacion}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />


                <h3 className='segmetation'>Experiencias:</h3>
                <TextArea
                    id="idexperiencias"
                    name="experiencias"
                    tType="json"
                    value={objPublication.condicion_laboral.experiencias}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />


                <h3>Habilidades:</h3>
                <TextArea
                    id="idhabilidad"
                    name="habilidad"
                    tType="json"
                    value={objPublication.habilidades.habilidad}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />


                <h3>Ofrecemos:</h3>
                <TextArea
                    id="idofrecemos"
                    name="ofrecemos"
                    tType=""
                    value={objPublication.ofrecemos}
                    onChange={textChangeHandler}
                    placeholder="Escriba aqui"
                />


                <h3>Información adicional:</h3>

                <TextArea
                    id="idinformacion_adicional"
                    name="informacion_adicional"
                    tType="json"
                    value={objPublication.informacion_adicional}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />

                <Ghost id='requisitos' ></Ghost>
                <h1 >Requisitos:</h1>

                <h4>Titulaciones para la oferta</h4>
                <TextArea
                    id="idtitulaciones"
                    name="titulaciones"
                    tType="json"
                    value={objPublication.requisitos.titulaciones}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />

                <h3 className='segmetation'>Competencias:</h3>
                <TextArea
                    id="idcompetencias"
                    name="competencias"
                    tType="json"
                    value={objPublication.requisitos.competencias}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />

                <h3 className='segmetation'>Idiomas requeridos:</h3>

                <span id="idioma">
                    <p >Ingles</p> <TB /><p>Nivel:</p> <TB /><p>nivel alto</p>
                </span>

                <Ghost id='condiciones' ></Ghost>
                <h1 >Condiciones laborales:</h1>

                <h3 className='segmetation'>Tipo de contrato</h3>
                <TextArea
                    id="idtipo_contrato"
                    name="tipo_contrato"
                    tType="json"
                    value={objPublication.condicion_laboral.tipo_contrato}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />



                <h3 className='segmetation'>Horario de trabajo</h3>
                <TextArea
                    id="idhorario_contrato"
                    name="horario_contrato"
                    tType="json"
                    value={objPublication.condicion_laboral.horario_contrato}
                    onChange={textChangeHandler}
                    placeholder="escriba aqui el detalle general de la oferta "
                />

                <button
                    type='button'
                    className="segmetation"
                    onClick={savePublication}>
                    Crear registro
                </button>

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

const TextArea = styled.textarea`
resize: none;
width: 100%;
color: #868E96;
padding: 0.5em 0;
font-size: 1rem;
font-weight: 400;
background-color: transparent;
border: none;
color: black;
font-family: Helvetica;
font-size: 1rem`;