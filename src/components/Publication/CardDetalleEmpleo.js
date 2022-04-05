import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import instance from '../utils/Instance';
import { useParams } from 'react-router-dom';

export const CardDetalleEmpleo = () => {
    const { id } = useParams();


    const [listaEspecialidades, setlistaEspecialidades] = useState([]);
    const [listaSubEspecialidades, setlistaSubEspecialidades] = useState([]);
    const [Select, setSelect] = useState('');
    const [subEspecialidad, setSubEspecialidad] = useState(0);
    const [especialidad, setEspecialidad] = useState(0);


    useEffect(() => {
        instance.get('/especialidades')
            .then(resp => {

                if (resp.data.statusCode === 200) {
                    setlistaEspecialidades(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });

        if (id > 0) {
            instance.get('/publicaciones/findById/' + id)
                .then(resp => {
                    if (resp.data.statusCode === 200) {
                        const { especialidad_id, subespecialidad_id } = resp.data.data;
                        const data = {
                            especialidad_id,
                            subespecialidad_id,
                            empresa_id: 1,
                        };
                        setEspecialidad(data.especialidad_id);
                        setSubEspecialidad(data.subespecialidad_id);
                        setSubEspecialidad(data.subespecialidad_id);

                        instance.get('/subespecialidades/child/' + document.getElementById('especialidad').value)
                            .then(resp => {
                                if (resp.data.statusCode === 200) {
                                    setlistaSubEspecialidades(resp.data.data);
                                } else {
                                    console.log('Hubo un error');
                                }
                            });
                        document.getElementById('subespecialidad').value = 0;

                    } else {
                        console.log('Hubo un error');
                    }
                });

        } else { document.getElementById('subespecialidad').setAttribute('disabled', true); }
    }, []);

    const selectChangeHandler = e => {
        const name = e.target.name;
        const value = e.target.value;
        if (name === 'subespecialidad') {
            setSubEspecialidad(value);
        } else {
            setEspecialidad(value);
            setSelect(value);
            document.getElementById('subespecialidad').disabled = false;
            instance.get('/subespecialidades/child/' + value)
                .then(resp => {
                    if (resp.data.statusCode === 200) {
                        setlistaSubEspecialidades(resp.data.data);
                    } else {
                        console.log('Hubo un error');
                    }
                });
            setSubEspecialidad(0);
        }
    };



    return (

        <Container className='card'>
            <CardTitle className='card-title'>
                <Img src='https://pbs.twimg.com/profile_images/1002122442637238273/zRcDtN3r_400x400.jpg' />
                <h3>Analista financiero</h3>
            </CardTitle>
            <hr />
            <Info>
                <Span>Trabajo</Span>
                <div>
                    <Label> Especialidad: </Label>
                    <ComboBox
                        defaultValue={0}
                        id='especialidad'
                        value={especialidad}
                        name="especialidad"
                        onChange={selectChangeHandler}
                    >
                        <option value={0} disabled hidden>Especialidad</option>
                        {listaEspecialidades.map((value, index) => {
                            return (
                                <option key={index + value.nombre} value={value.id} >{value.nombre}</option>
                            );
                        })}
                    </ComboBox>
                </div>
                <div>
                    <Label> Subespecialidad: </Label>
                    <ComboBox
                        defaultValue={0}
                        id='subespecialidad'
                        value={subEspecialidad}
                        onChange={selectChangeHandler}
                        name="subespecialidad">
                        <option value={0} disabled hidden>Subespecialidad</option>
                        {listaSubEspecialidades.map((value, index) => {
                            return (
                                <option key={index + value.nombre} value={value.id} >{value.nombre}</option>
                            );
                        })}
                    </ComboBox>
                </div>
                <Label> Vacantes: </Label>
            </Info>
        </Container>
    );
};

export default CardDetalleEmpleo;

const Container = styled.div`
margin-top: 7em;
width: 75%;
height: 40em;
background-color: white;
padding: 3em;
`;

const CardTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const Img = styled.img``;

const Span = styled.span`
background-color: #147935;
padding: 0.5em 2em;
border: 1px solid gray;
border-right: 1em solid yellow;
color: white;
border-radius: 8px;
max-width: 8em;
`;

const Info = styled.div`
height: 100%;
display: flex;
flex-direction: column;
justify-content: space-between;
`;


const Label = styled.h3`
`;



const ComboBox = styled.select`
width: 100%;
background-color: aliceblue;
height: 40px;
padding: 0 1em;
outline: none;
font-weight: bold;
`;