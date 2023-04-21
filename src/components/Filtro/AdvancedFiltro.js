import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import allActions from '../redux/actions';
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import TopNavbar from "../TopNavbar";
import instance from '../utils/Instance';
import { FaArrowRight, FaRegClock } from 'react-icons/fa';
import img from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import maletin from "../../assets/img/maletin.png";

import sweetAlert from '../general/alerts/sweetAlert';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MaterialButton from '@mui/material/Button';

export const AdvancedFilter = () => {

    const [listaEspecialidades, setlistaEspecialidades] = useState([]);
    const [listaSubEspecialidades, setlistaSubEspecialidades] = useState([]);
    const [listaPublicaciones, setlistaPublicaciones] = useState({});
    const [listaCiudades, setlistaCiudades] = useState([]);
    const [filtro, setFiltro] = useState({
        especialidad_id: 0,
        subespecialidad_id: 0,
        ubicacionId: 0,
        palabraclave: ""
    });
    const [modalViewEmpleo, setModalViewEmpleo] = useState(false);
    const [objPublication, setObjPublication] = useState({});

    useEffect(() => {
        instance.get('/publicaciones/filter/0/0/0/*')
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    setlistaPublicaciones(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
        instance.get('/especialidades')
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    setlistaEspecialidades(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
        document.getElementById('subespecialidad_id').setAttribute('disabled', true);

        instance.get('/ciudad')
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    setlistaCiudades(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
    }, []);

    const dispatch = useDispatch();

    const showLoading = () => {
        dispatch(allActions.loadingActions.showLoading());
    }

    const hideLoading = () => {
        dispatch(allActions.loadingActions.hideLoading());
    }

    const openModalViewEmpleo = async (publicacion_id) => {
        await getDataEmpleo(publicacion_id);
        setModalViewEmpleo(true);
    };

    const closeModalViewEmpleo = () => {
        setModalViewEmpleo(false);
        setObjPublication({});
    };

    const getDataEmpleo = (publicacion_id) => {
        showLoading();
        instance.get(`/publicaciones/findById/${publicacion_id}`)
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    const { nombre, descripcion, informacion_adicional, requisitos, habilidades, condicion_laboral, ofrecemos } = resp.data.data;
                    console.log(resp.data.data);
                    setObjPublication(resp.data.data);
                    hideLoading();
                } else {
                    hideLoading();
                }
            });

    }

    const selectChangeHandler = e => {
        const value = e.target.value;
        setFiltro(prev => ({ ...prev, subespecialidad_id: 0 }));
        setFiltro(prev => ({ ...prev, especialidad_id: value }));
        document.getElementById('subespecialidad_id').disabled = false;
        instance.get('/subespecialidades/child/' + value)
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    setlistaSubEspecialidades(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
        document.getElementById('subespecialidad_id').value = 0;
    };

    const createChangeHandler = e => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setFiltro(prev => ({ ...prev, [name]: value }));

    };

    const send = () => {
        showLoading();
        let aux;
        if (filtro.palabraclave === "") {
            aux = "*";
        } else { aux = filtro.palabraclave; };
        instance.get('/publicaciones/filter/' + filtro.especialidad_id + '/' + filtro.subespecialidad_id + '/' + filtro.ubicacionId + '/' + aux)
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    hideLoading();
                    setlistaPublicaciones(resp.data.data);
                } else {
                    hideLoading();
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

    const renderInformationEmpleo = () => {
        const dataempleo = objPublication;
        const requisitos = Object.keys(dataempleo).length > 0 ? JSON.parse(dataempleo.requisitos) : {}
        const habilidades = Object.keys(dataempleo).length > 0 ? JSON.parse(dataempleo.habilidades) : {}
        const condicion_laboral = Object.keys(dataempleo).length > 0 ? JSON.parse(dataempleo.condicion_laboral) : {}

        return (
            <>
                <div><p style={{ fontWeight: 'bold', color: 'green', fontSize: 14 }}>Descripcion: <span style={{ color: '#000000', fontSize: 14 }}>{dataempleo.descripcion}</span></p></div>
                <div>
                    <p style={{ fontWeight: 'bold', color: 'green', fontSize: 14, marginTop: -10 }}>Especialidad: <span style={{ color: '#000000', fontSize: 14 }}>{dataempleo.especialidad}</span></p>
                    <p style={{ fontWeight: 'bold', color: 'green', fontSize: 14, marginTop: -10 }}>Subespecialidad : <span style={{ color: '#000000', fontSize: 14 }}>{dataempleo.subespecialidad}</span></p>
                </div>
                <div>
                    <p>REQUISITOS:</p>
                    <div className="row col-12">

                        {Object.keys(requisitos).length > 0 && Object.keys(requisitos['TITULACIONES']).length > 0 &&
                            <div className="col-6">
                                <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>TITULACIONES</p>
                                {Object.keys(requisitos['TITULACIONES']).map((item, idx) => {
                                    return (
                                        <p style={{ fontSize: 11, marginTop: -10 }}>&bull; {requisitos['TITULACIONES'][item]}</p>
                                    )
                                })

                                }
                            </div>
                        }


                        {Object.keys(requisitos).length > 0 && Object.keys(requisitos['COMPETENCIAS']).length > 0 &&
                            <div className="col-6">
                                <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>COMPETENCIAS</p>
                                {Object.keys(requisitos['COMPETENCIAS']).map((item, idx) => {
                                    return (
                                        <p style={{ fontSize: 11, marginTop: -10 }}>&bull; {requisitos['COMPETENCIAS'][item]}</p>
                                    )
                                })

                                }
                            </div>

                        }

                        {Object.keys(requisitos).length > 0 && Object.keys(requisitos['EXPERIENCIA']).length > 0 &&
                            <div className="col-6">
                                <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>EXPERIENCIA</p>
                                {Object.keys(requisitos['EXPERIENCIA']).map((item, idx) => {
                                    return (
                                        <p style={{ fontSize: 11, marginTop: -10 }}>&bull; {requisitos['EXPERIENCIA'][item]}</p>
                                    )
                                })

                                }
                            </div>
                        }


                        {Object.keys(requisitos).length > 0 && Object.keys(requisitos['IDIOMAS']).length > 0 &&
                            <div className="col-6">
                                <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>IDIOMAS</p>
                                {Object.keys(requisitos['IDIOMAS']).map((item, idx) => {
                                    return (
                                        <p style={{ fontSize: 11, marginTop: -10 }}>&bull; {requisitos['IDIOMAS'][item]}</p>
                                    )
                                })

                                }
                            </div>
                        }

                    </div>



                    {Object.keys(habilidades).length > 0 &&
                        <>
                            <p>HABILIDADES:</p>
                            <div className="row col-12">
                                {Object.keys(habilidades).map((item, idx) => {
                                    return (
                                        <div className="col-6" style={{ marginTop: -10 }}>
                                            <p style={{ fontSize: 11 }}>&bull; {habilidades[item]}</p>
                                        </div>
                                    )
                                })

                                }
                            </div>
                        </>
                    }

                    {Object.keys(condicion_laboral).length > 0 &&
                        <>
                            <p>INFORMACION LABORAL:</p>
                            <div className="row col-12">

                                {Object.keys(condicion_laboral).length > 0 && Object.keys(condicion_laboral['JORNADA']).length > 0 &&
                                    <div className="col-12">
                                        <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>JORNADA: <span style={{ color: 'grey', fontWeight: 'normal' }}>{condicion_laboral.JORNADA}</span></p>
                                    </div>
                                }
                                {Object.keys(condicion_laboral).length > 0 && Object.keys(condicion_laboral['HORARIO']).length > 0 &&
                                    <div className="col-12">
                                        <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>HORARIO: <span style={{ color: 'grey', fontWeight: 'normal' }}>{condicion_laboral.HORARIO}</span></p>
                                    </div>
                                }
                                {Object.keys(condicion_laboral).length > 0 && Object.keys(condicion_laboral['TIPO_CONTRATO']).length > 0 &&
                                    <div className="col-12">
                                        <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>TIPO_CONTRATO: <span style={{ color: 'grey', fontWeight: 'normal' }}>{condicion_laboral.TIPO_CONTRATO}</span></p>
                                    </div>
                                }
                                {Object.keys(condicion_laboral).length > 0 && Object.keys(condicion_laboral['REMUNERACION']).length > 0 &&
                                    <div className="col-12">
                                        <p style={{ textAlign: 'left', fontWeight: 'bold', color: '#004400', fontSize: 12 }}>REMUNERACION: <span style={{ color: 'grey', fontWeight: 'normal' }}>{condicion_laboral.REMUNERACION}</span></p>
                                    </div>
                                }
                            </div>

                        </>
                    }

                </div>
            </>
        )
    }

    return (
        <>
            <Dialog open={modalViewEmpleo} onClose={closeModalViewEmpleo} aria-labelledby="form-dialog-title" style={{ zIndex: 20 }}>
                <DialogTitle id="form-dialog-title" style={{ textAlign: 'center', color: 'green', fontWeight: 'bold' }}>{objPublication.nombre ? objPublication.razon_social.toUpperCase() + ' - ' + objPublication.nombre.toUpperCase() : ''}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {renderInformationEmpleo()}
                    </DialogContentText>

                </DialogContent>
                <DialogActions>
                    <MaterialButton onClick={closeModalViewEmpleo} color="error">
                        Cerrar
                    </MaterialButton>
                </DialogActions>
            </Dialog>
            <Container>
                <TopNavbar></TopNavbar>
                <Title>
                    Ofertas de empleos exclusivas para nuestros
                    graduados y emprendedores
                </Title>
                <DivFilter>
                    <div>
                        <Input
                            id="palabraclave"
                            name="palabraclave"
                            type="text"
                            placeholder="Palabra clave: Nombre o título del empleo"
                            onChange={createChangeHandler}
                            value={filtro.palabraclave}
                        />
                        <ComboBox
                            id='ubicacionId'
                            name="ubicacionId"
                            onChange={createChangeHandler}
                            value={filtro.ubicacionId}
                        >
                            <option value={0} disabled hidden>Ciudad</option>
                            {listaCiudades.map((value, index) => {
                                return (
                                    <option key={index + value.nombre} value={value.id} >{value.nombre}</option>
                                );
                            })}
                        </ComboBox>
                    </div>

                    <div>
                        <ComboBox
                            id='especialidad_id'
                            name="especialidad_id"
                            onChange={selectChangeHandler}
                            value={filtro.especialidad_id}
                        >
                            <option value={0} disabled hidden>Especialidad</option>
                            {listaEspecialidades.map((value, index) => {
                                return (
                                    <option key={index + value.nombre} value={value.id} >{value.nombre}</option>
                                );
                            })}
                        </ComboBox>

                        <ComboBox
                            id='subespecialidad_id'
                            name="subespecialidad_id"
                            onChange={createChangeHandler}
                            value={filtro.subespecialidad_id}
                        >

                            <option value={0} disabled hidden>Subespecialidad</option>
                            {listaSubEspecialidades.map((value, index) => {
                                return (
                                    <option key={index + value.nombre} value={value.id} >{value.nombre}</option>
                                );
                            })}
                        </ComboBox>
                    </div>
                    <Button onClick={send}>Buscar</Button>
                </DivFilter>
            </Container >

            <ListContain>
                <List>
                    {Object.values(listaPublicaciones).map((publicacion) => {
                        return (
                            <Employed key={publicacion.id + publicacion.titulo} onClick={() => openModalViewEmpleo(publicacion.publicacionid)}>
                                <Img src={maletin}></Img>
                                <Info>
                                    <InfoEmployed>
                                        <TitleEmployed>{publicacion.titulo.toUpperCase()}</TitleEmployed>
                                        <Label>Vacantes: {publicacion.vacantes && parseInt(publicacion.vacantes) > 0 ? publicacion.vacantes : "No especificado"}</Label>
                                    </InfoEmployed>
                                    <InfoStatus>
                                        <State>{publicacion.nombreempresa}</State>
                                        {(publicacion.correo_empresa !== null || publicacion.telefono_empresa !== null) &&
                                            <State>Contactos: {publicacion.correo_empresa} - {publicacion.telefono_empresa}</State>
                                        }
                                        {(publicacion.correo_empresa === null && publicacion.telefono_empresa === null) &&
                                            <State>{publicacion.ciudadempresa}</State>
                                        }
                                        <State className="latest"><FaRegClock className="clock" /> {calcFecha(publicacion.fecha)}</State>
                                        {/*<ViewEmployed > <FaArrowRight className="icon" /></ViewEmployed>*/}
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
                    <P>Bienvenido/a a nuestra plataforma de empleos para estudiantes universitarios. </P>
                    <P> En nuestro sitio web, buscamos facilitar la búsqueda de trabajo para aquellos que están estudiando en la Universidad Tecnica de Manabi. </P>
                    <P> Ofrecemos una amplia gama de publicaciones de empleos disponibles para que los estudiantes puedan explorar y aplicar en consecuencia.  </P>
                    <P>  Nuestro objetivo es brindar a los estudiantes las herramientas necesarias para tener éxito en la búsqueda de trabajo y lograr su objetivo de carrera.  </P>
                    <P>"¡Explora nuestras publicaciones de empleos y comienza a construir tu futuro profesional hoy mismo!</P>

                    <ImgPublished src={img} />
                    {/*<ImgPublished src={img} />*/}
                </Published>
            </ListContain>
        </>
    );
};

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
font-weight: bold;

option{
}
`;

const Input = styled.input`
width: 48%;
height: 40px;
padding: 0 1em;
outline: none;
font-weight: bold;
border-radius: 4px;
border: 1px solid gray`;

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
transition: 300ms;

&:hover {
    color: green;
    background-color: white;
    border: 2px solid green;
}
`;

//
const ListContain = styled.div`
display: flex;
justify-content: space-between;
width:90%;
height: 100%;
margin: 0 auto;
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
width: 50px;
border-radius: 0%;
border: 0px solid black;
padding-top:15px
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
justify-content: center;
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