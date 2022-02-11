import React from 'react';
import { NavbarPublication } from './NavbarPublication';
import styled from "styled-components";



export const DetalleEmpleo = () => {

    return (
        <Container>
            <NavbarPublication />
            <ContainerPublication>
                <Ghost id='detalle' ></Ghost>
                <h1>Detalle de la oferta:</h1>

                <span contentEditable="true">Escriba aquí una descripción referente a la oferta de empleo.</span>

                <h3>Principales funciones:</h3>
                <p contentEditable="true">
                    <ul>
                        <li>Escriba sus funciones aquí ( Pulsando la tecla Enter se crea otro elemento de lista ).</li>
                    </ul>
                </p>
                <h3>Formación y requisitos del puesto:</h3>
                <p contentEditable="true">
                    <ul>
                        <li>Escriba los requisitos del puesto (nacionales e internacionales)</li>
                    </ul>
                </p>
                <h3 className='segmetation'>Experiencias:</h3>
                <p contentEditable="true">
                    Escriba la experiencia necesaria para ejercer el empleo.
                </p>
                <h3>Habilidades:</h3>
                <p contentEditable="true">
                    <ul>
                        <li>Escriba las habilidades necesarias para acceder a la oferta.</li>
                    </ul>
                </p>
                <h3>Ofrecemos:</h3>
                <p contentEditable="true">
                    <ul>
                        <li>Escriba los beneficios que se podran obtener de la oferta.</li>
                    </ul>
                </p>
                <h3>Información adicional:</h3>
                <p contentEditable="true">
                    Escriba información adicional que le parezca sensata hacer saber.
                </p>

                <Ghost id='requisitos' ></Ghost>
                <h1 >Requisitos:</h1>
                <h4>Titulaciones para la oferta</h4>
                <p contentEditable="true">
                    <div className='classrequisitos'>
                        <ul>
                            <li>Establezca los requisitos para el empleo</li>
                        </ul>
                    </div>
                </p>

                <h3 className='segmetation'>Competencias:</h3>
                <p contentEditable="true">
                    Escriba las competencias laborales que necesita.
                </p>

                <h3 className='segmetation'>Idiomas requeridos:</h3>

                <span id="idioma">
                    <p contenteditable="true">Ingles</p> <TB /><p>Nivel:</p> <TB /><p contenteditable="true">nivel alto</p>
                </span>

                <Ghost id='condiciones' ></Ghost>
                <h1 >Condiciones laborales:</h1>

                <h3 className='segmetation'>Tipo de contrato</h3>
                <p contentEditable="true">Establezca el tipo de contrato a emplear.</p>

                <h3 className='segmetation'>Horario de trabajo</h3>
                <p contentEditable="true">Establezca el tipo de horario a emplear.</p>

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


.classrequisitos{
    display: flex;

    ul {
        text-align: left;
        margin-left: 2em;
        li{
            margin: 0.5em 0;
        }
    }
}`;



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