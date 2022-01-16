import React from "react";
import styled from "styled-components";
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import LogoUtm from "../../assets/img/logo.png";
import { FaUser, FaLock } from 'react-icons/fa';

class Login extends React.Component {
    render() {
        return (
            <Container>
                <DivLogin>
                    <LinkHome href="#"><Logo src={LogoUtm} /></LinkHome>
                    <FormLogin>
                        <div><Label>Inicia Sesión</Label>
                            <Label>Postulante</Label></div>
                        <FaUser class="UserIcon" />
                        <FaLock class="LockIcon" />

                        <Input type="email" placeholder="Correo electrónico"></Input>
                        <Input type="password" placeholder="Contraseña"></Input>
                        <Input type="button" value="Iniciar sesión"></Input>
                    </FormLogin>
                    <div><p>¿No tienes una cuenta? <Link href="#">Regístrate gratis</Link></p></div>
                    <Link>¿Olvidaste tu contraseña?</Link>
                </DivLogin>
            </Container >
        );
    }
}

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
    top: 38%;
}

.LockIcon{
    top: 54.5%;
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
    top: 37%;
}

.LockIcon{
    top: 54%;
}
}

@media (max-width: 1280px) {
.UserIcon, .LockIcon{
    left: 18%;
}

.UserIcon{
    top: 42%;
}

.LockIcon{
    top: 57%;
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
    background-color: greenyellow;
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
@media (max-width: 1280px) {
    
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

&:last-child{
background-color: #147935;
font-size: 1.2rem;
color: white;
cursor: pointer;
border: none;
padding: 0;
}

`;

const Link = styled.a`
cursor: pointer;
text-decoration: none;
color: #147935;

&:last-child{
margin-top: 1em;
}`;