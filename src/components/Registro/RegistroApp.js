import React, { useEffect, useState } from 'react';
import instance from '../utils/Instance';
import styled from "styled-components";
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";


const LogoUtm = "https://www.utm.edu.ec/images/pagina_nueva/logo.png";

export const RegistroApp = () => {

    //const [estado, setEstado] = useState(false);
    const [listaTipoIdentificaciones, setlistaTipoIdentificaciones] = useState([]);
    const [tipoUsuario, setTipoUsuario] = useState([]);
    const [objRegister, setObjRegister] = useState({
        ct_tipoidentificacion: 0,
        numeroidentificacion: '',
        nombrecompleto: '',
        razon_social: '',
        correo: '',
        ct_tipousuario: 0,
        contrasena: '',
        confirmacontrasena: '',
        observacion: ''
    });

    useEffect(() => {
        instance.get('/detallecatalogo/child/1')
            .then(resp => {

                if (resp.data.statusCode === 200) {
                    setlistaTipoIdentificaciones(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
        instance.get('/detallecatalogo/child/2')
            .then(resp => {

                if (resp.data.statusCode === 200) {
                    setTipoUsuario(resp.data.data);
                } else {
                    console.log('Hubo un error');
                }
            });
    }, []);


    const createChangeHandler = e => {
        const { name } = e.target;
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setObjRegister(prev => ({ ...prev, [name]: value }));
    };


    function saveRegistro() {
        console.log(objRegister);
        instance.post('/usuario/create', objRegister)
            .then(resp => {
                if (resp.data.statusCode === 200) {
                    alert('creado');
                    window.location.href = '/emailconfirmation';
                } else {
                    console.log('Hubo un error');
                }
            });
    }


    return (
        <Container>
            <DivRegistro>
                <DivHeader>
                    <LinkHome href="#"><Logo src={LogoUtm} /></LinkHome>
                    <h1>Registrate</h1>
                </DivHeader>

                <form action="">
                    <Select
                        name="ct_tipoidentificacion"
                        value={objRegister.ct_tipoidentificacion}
                        onChange={createChangeHandler}
                    >
                        <option value={0} disabled hidden>Tipo de identificación</option>
                        {listaTipoIdentificaciones.map((value, index) => {
                            return (
                                <option key={index + value.descripcion} value={value.id} >{value.descripcion}</option>
                            );
                        })

                        }
                    </Select>


                    <Input
                        autoComplete="off"
                        type="text"
                        name="numeroidentificacion"
                        maxLength={13}
                        value={objRegister.numeroidentificacion}
                        placeholder="Ingrese numero identificacion..."
                        onChange={createChangeHandler}
                    />
                    <Input
                        autoComplete="off"
                        type="text"
                        name="nombrecompleto"
                        value={objRegister.nombrecompleto}
                        onChange={createChangeHandler}
                        placeholder="Nombre reprersentante"
                    />
                    <Input
                        autoComplete="off"
                        type="text"
                        name="razon_social"
                        value={objRegister.razon_social}
                        onChange={createChangeHandler}
                        placeholder="Nombre o razón social"
                    />
                    <Input
                        type="email"
                        name="correo"
                        value={objRegister.correo}
                        onChange={createChangeHandler}
                        placeholder="Correo electrónico"
                    />
                    <Input
                        type="password"
                        name="contrasena"
                        value={objRegister.contrasena}
                        onChange={createChangeHandler}
                        placeholder="Contraseña"
                    />
                    <Select
                        name="ct_tipousuario"
                        value={objRegister.ct_tipousuario}
                        onChange={createChangeHandler}
                    >
                        <option disabled hidden value={0}>Tipo de Cuenta</option>
                        {tipoUsuario.map((value, index) => {
                            return (
                                <option key={index + value.descripcion} value={value.id} >{value.descripcion}</option>
                            );
                        })

                        }
                    </Select>
                    <TextArea
                        name="observacion"
                        value={objRegister.observacion} onChange={createChangeHandler} id="" cols="30" rows="10" maxLength="255" placeholder="Describase a usted y a sus servicios">
                    </TextArea>
                    <Button
                        type='button'
                        className='boton-registro'
                        onClick={saveRegistro}>
                        Registrarse
                    </Button>
                    <p>¿Ya tienes una cuenta? <a href='/login'>Inicia Sesión</a></p>
                </form>

            </DivRegistro>
        </Container >
    );
};


export default RegistroApp;

const Container = styled.div`
width: 100%;
height: 120vh;
min-height: 500px;
min-width: 480px;
background-image: url(${background});
background-repeat: no-repeat;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
padding: 1em;
font-family: 'Helvetica';

`;

const DivRegistro = styled.div`
position: relative;
background-color: white;
width: auto;
height: 110vh;
min-width: 400px;
max-width: 540px;
min-height: 500px;
max-height: 800px;
border-radius: 8px;
padding: 1.5em 4em;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;

p{
    margin-top: 1em;
    text-align: center;
    font-weight: 600;
    color: #868E96;

    a{
        cursor: pointer;
        text-decoration: none;
        color: #147935;
    }
}

Input,TextArea, Select {
    margin:0.4em 0
}

@media (max-width: 600px){
width: 460px;
padding: 1em 3em;
}

`;

const DivHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

h1{
    font-size: 1.8rem;
    margin-left: 1em;
    padding-left: 1em;
    border-left: 3px solid #D8D8D8;
    color: #147935;

    @media (max-width: 600px){
    font-size: 1.6rem;
}
}
`;

const LinkHome = styled.a`
margin-right: auto;
`;

const Logo = styled.img`
box-sizing: content-box;
border-radius: 8px;
width: auto;
height: 60px;
padding: 2px;
transition: 300ms;

&:hover{
    background-color: #D4EFDF;
}
`;

const Input = styled.input`
width: 100%;
border: 2px solid #D8D8D8;
border-radius: 4px;
height: 44px;
color: #868E96;
padding: 0 1.5em;
font-size: 1rem;
outline: none;
font-weight: bold;
min-width: 300px;`;

const TextArea = styled.textarea`
resize: none;
width: 100%;
height: 120px;
border: 2px solid #D8D8D8;
border-radius: 4px;
color: #868E96;
padding: 0.5em 1em;
outline: none;
font-size: 1rem;
font-weight: 400;`;

const Select = styled.select`
width: 100%;
border: 2px solid green;
border-radius: 4px;
height: 44px;
color: #868E96;
font-size: 1rem;
font-weight: bold;
padding: 0 1.5em;
text-align:justify;`;

const Button = styled.button`
background-color: #147935;
font-size: 1.2rem;
color:  white;
cursor: pointer;
border: none;
border-radius: 4px;
height: 44px;
width: 100%;
margin-top: 1em;
font-weight: bold;
`;
