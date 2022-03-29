import React, { useState } from 'react';
import styled, { ThemeProvider } from "styled-components";
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import LogoUtm from "../../assets/img/logo.png";
import { FaUser, FaLock } from 'react-icons/fa';
import instance from '../utils/Instance';

export const Login = () => {

    //logica
    const [objbutton, setButton] = useState(false);
    const [objUser, setUSer] = useState({
        correo: "",
        contrasena: ""
    });

    //temas
    const theme = {
        cursor: objbutton ? "" : "pointer",
        background: objbutton ? "#D4EFDF" : "#147935",
        color: objbutton ? "#147935" : "white",
        border: objbutton ? "2px solid green" : "none"
    };

    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setUSer(prev => ({ ...prev, [name]: value }));
    }

    function Login() {
        setButton(true);
        console.log(objUser);
        instance.post('/usuario/login', objUser)
            .then(resp => {
                const data = resp.data.data;
                if (resp.data.statusCode === 200 && Object.keys(data).length > 0) {
                    if (data.estado_cuenta) {
                        localStorage.setItem('token', JSON.stringify(data.token));
                        console.log(JSON.parse(localStorage.getItem('token')));
                        alert('Logueado');
                        window.location.href = "/";
                    } else {
                        console.log(data);
                        console.log('Hubo un error - Cuenta no activada');
                        setButton(false);
                    }
                } else {
                    console.log('Hubo un error - Contraseña o correo incorrectos');
                    setButton(false);
                }

            });
        setButton(false);
    }


    return (
        <Container>
            <DivLogin>
                <LinkHome href="#"><Logo src={LogoUtm} /></LinkHome>
                <FormLogin>
                    <div><Label>Inicia Sesión</Label>
                        <Label>Postulante</Label></div>
                    <FaUser className="UserIcon" />
                    <FaLock className="LockIcon" />

                    <Input
                        name="correo"
                        type="email"
                        placeholder="Correo electrónico"
                        value={objUser.correo}
                        onChange={handleInputChange} />

                    <Input
                        name="contrasena"
                        type="password"
                        placeholder="Contraseña"
                        value={objUser.contrasena}
                        onChange={handleInputChange} />

                    <ThemeProvider theme={theme}>
                        <Input type="button" value="Iniciar sesión" onClick={Login} disabled={objbutton}></Input>
                    </ThemeProvider>

                </FormLogin>
                <div><p>¿No tienes una cuenta? <Link href="/register">Regístrate gratis</Link></p></div>
                <Link>¿Olvidaste tu contraseña?</Link>
            </DivLogin>
        </Container >
    );
};

export default Login;

const Container = styled.div`
width: 100vw;
height: 100vh;
min-height: 500px;
min-width: 500px;
background-image: url(${background});
background-repeat: no-repeat;
background-size: cover;
display: flex;
justify-content: center;
align-items: center;
padding: 1em;
`;

const DivLogin = styled.div`
position: relative;
background-color: white;
width: auto;
height: 70vh;
min-width: 400px;
max-width: 800px;
min-height: 500px;
max-height: 800px;
border-radius: 8px;
padding: 1.5em 4em;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-between;

p{
    color: #868E96;
}

.UserIcon, .LockIcon{
    position: absolute;
    font-size: 1.5rem;
    left: 23%;
    color: #868E96;
}

.UserIcon{
    top: 38.5%;
}

.LockIcon{
    top: 55%;
}

//Responsive 
@media (max-width: 1440px) {
    
div{
width: 120%;
display: flex;
justify-content: center;
}

.UserIcon, .LockIcon{
    left: 22%;
}

.UserIcon{
    top: 37.5%;
}

.LockIcon{
    top: 54.5%;
}
}

@media (max-width: 1280px) {
.UserIcon, .LockIcon{
    left: 21%;
}

.UserIcon{
    top: 37.5%;
}

.LockIcon{
    top: 54.5%;
}

}

@media (max-width: 1080px) {
    .UserIcon, .LockIcon{
    left: 18%;
}

.UserIcon{
    top: 42.5%;
}

.LockIcon{
    top: 57.5%;
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

const FormLogin = styled.form`
width: 100%;
height: 70%;
display: flex;
justify-content: space-around;
flex-direction: column;
align-items: center;

div{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: unset;
}



//
@media (max-width: 1080px) {
    
    div{
        flex-direction: column;
        justify-content: center;
    }

}
`;

const Label = styled.label`
font-family: 'Helvetica';
font-size: 1.8rem;
font-weight: bold;
padding: 0 1em;
color: #868E96;

&:first-child{
    padding: 0 0.4em;
    border-right: 3px solid #D8D8D8;
    color: #147935;
}

//
@media (max-width: 1440px) {
    font-size: 1.5rem;
}

@media (max-width: 1280px) {
    font-size: 1.5rem;
    padding: 0;
    text-align: center;
  
    &:first-child{
        border: none;
        padding-bottom: 0.5em;
    }
}
@media (min-width: 1080px) {

    padding: 0 1em;

    &:first-child{
        border-right: 3px solid #D8D8D8;
        padding: 0 0.4em;
    }
}
    `;

const Input = styled.input`
width: 80%;
border: 2px solid #D8D8D8;
border-radius: 4px;
height: 50px;
color: #868E96;
padding: 0 1.5em 0 3em;
font-size: 1rem;
outline: none;
font-weight: bold;
min-width: 300px;

&:hover, &:focus{
    box-shadow: #D4EFDF 0px -30px 36px -28px inset;
}

&:last-child{
background-color: ${props => props.theme.background};
font-size: 1.2rem;
color:  ${props => props.theme.color};
cursor: ${props => props.theme.cursor};
border: ${props => props.theme.border};
padding: 0;
transition: 300ms;

&:hover{
    box-shadow: none;
    background-color:  #D4EFDF;
    color: green;
    border: 2px solid green
}

&:focus{
    box-shadow: none;
}

}

`;

const Link = styled.a`
cursor: pointer;
text-decoration: none;
color: #147935;

&:last-child{
margin-top: 1em;
}`;
