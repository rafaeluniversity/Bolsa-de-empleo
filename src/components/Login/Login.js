import React, { useState, useRef } from 'react';
import styled, { ThemeProvider } from "styled-components";
import background from "../../assets/img/ed-259-Zm-CkDSKC1M-unsplash.jpg";
import LogoUtm from "../../assets/img/logo.png";
import { FaUser, FaLock } from 'react-icons/fa';
import instance from '../utils/Instance';
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch } from 'react-redux';
import allActions from '../redux/actions';
import { TriggerNotification } from "../general/notification/TriggerNotification";
import sweetAlert from '../general/alerts/sweetAlert';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export const Login = () => {

    const [objbutton, setButton] = useState(false);
    //temas
    const theme = {
        cursor: objbutton ? "" : "pointer",
        background: objbutton ? "#D4EFDF" : "#147935",
        color: objbutton ? "#147935" : "white",
        border: objbutton ? "2px solid green" : "none"
    };



    const [objUser, setUSer] = useState({
        correo: "",
        contrasena: ""
    });
    const [captchaValido, setCaptchaValido] = useState(null);
    const [modalResetPassword, setModalResetPassword] = useState(false);
    const [correoCambioClave, setCorreoCambioClave] = useState('');

    const [activeFormChangePassword, setActiveFormChangePassword] = useState(false);
    const [confirmationCode, setConfirmationCode] = useState('');
    const [formPassword, setFormPassword] = useState('');
    const [formConfirmPassword, setFormConfirmPassword] = useState('');
    const [userId, setUserId] = useState(0);
    const [showPassword, setShowPasswword] = useState(false);



    function handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        setUSer(prev => ({ ...prev, [name]: value }));
    }

    const recaptchaRef = useRef(null);

    const changeCaptcha = () => {
        if (recaptchaRef.current.getValue()) {
            setCaptchaValido(true);
        } else {
            setCaptchaValido(false);
        }
    }

    const dispatch = useDispatch();

    const showLoading = () => {
        dispatch(allActions.loadingActions.showLoading());
    }

    const hideLoading = () => {
        dispatch(allActions.loadingActions.hideLoading());
    }

    const openModalResetPassword = () => {
        setModalResetPassword(true);
    };

    const closeModalResetPassword = () => {
        setModalResetPassword(false);
        setCorreoCambioClave('');
        setActiveFormChangePassword(false);
        setConfirmationCode('');
        setCorreoCambioClave('');
        setFormConfirmPassword('');
    };

    const changeViewPassWord = () => {
        setShowPasswword(!showPassword)
    }

    function Login() {
        showLoading();
        setButton(true);
        if (captchaValido) {
            instance.post('/usuario/login', objUser)
                .then(resp => {
                    const data = resp.data.data;
                    console.log(resp.data);
                    if (resp.data.statusCode === 200 && Object.keys(data).length > 0) {
                        if (data.estado_cuenta) {
                            if(data.token){
                             localStorage.setItem('token', JSON.stringify(data.token));
                            window.location.href = "/";
                            }else{
                                sweetAlert({
                                    icon: 'warning',
                                    title: 'Informacion',
                                    message: 'Estimado Usuario, usted esta en un proceso de cambio de contraseña, si no ha sido usted por favor recupere su contraseña nuevamente '
                                });
                                setButton(false);
                                hideLoading();
                            }
                           
                            hideLoading();
                        } else {
                            sweetAlert({
                                icon: 'warning',
                                title: 'Informacion',
                                message: 'Cuenta no activada'
                            });
                            setButton(false);
                            hideLoading();
                        }
                    } else {
                        sweetAlert({
                            icon: 'warning',
                            title: 'Datos no encontrados',
                            message: 'El usuario o la contraseña, son incorrectos, por favor verifique'
                        });
                        setButton(false);
                        hideLoading();
                    }

                });
        } else {
            setButton(false);
            TriggerNotification(
                4000,
                'Información!',
                'Verifique el captcha para poner iniciar sesion!',
                'warning',
            );
            hideLoading();
        }

    }

    const sendEmailChangePassword = () => {
        showLoading();
        if (correoCambioClave !== '' && correoCambioClave.length > 5) {
            const data = {
                'correo': correoCambioClave.trim(),
            }
            const REQUEST_LINK = `usuario/request/change/password`;
            return instance.post(REQUEST_LINK, data)
                .then((res) => {
                    if (res.data.statusCode === 200) {
                        if (!res.data.data) {
                            hideLoading();
                            sweetAlert({
                                icon: 'warning',
                                title: 'Correo no encontrado',
                                message: 'No se ha encontrado una cuenta con este correo, intente nuevamente !',
                            });
                        } else {
                            sweetAlert({
                                icon: 'success',
                                title: 'Confirmacion',
                                message: 'Se ha enviado un correo con el código para poder cambiar su contraseña, por favor revise su bandeja de email.'
                            });
                            setActiveFormChangePassword(true);
                            setUserId(res.data.data);
                            hideLoading();
                        }
                    } else {
                        hideLoading();
                        sweetAlert({
                            icon: 'warning',
                            title: 'Alerta',
                            message: 'Hubo un problema al enviar el correo, por favor intente nuevamente !'
                        });
                    }
                })
                .catch((error) => {
                    hideLoading();
                });
        } else {
            hideLoading();
            sweetAlert({
                icon: 'warning',
                title: 'Correo invalido',
                message: 'Debe ingresar un correo valido, por favor verifique'
            });
        }

    }

    const changePassword = () => {
        showLoading();
        if (confirmationCode.length > 5) {
            if (formPassword === formConfirmPassword) {
                const data = {
                    'codigo': confirmationCode.toUpperCase(),
                    'contrasena': formPassword.trim(),
                    'userId': userId
                }
                const CHANGE_PASSWORD = `usuario/change/password`;
                return instance.post(CHANGE_PASSWORD, data)
                    .then((res) => {
                        if (res.data.statusCode === 200) {
                            sweetAlert({
                                icon: 'warning',
                                title: 'Información',
                                message: `Estimado usuario: ${res.data.data}`
                            });
                            setActiveFormChangePassword(false);
                            setUserId(0);
                            setConfirmationCode('');
                            setFormPassword('');
                            setFormConfirmPassword('');
                            setCorreoCambioClave('');
                            closeModalResetPassword();
                            hideLoading();
                        } else {
                            hideLoading();
                            sweetAlert({
                                icon: 'warning',
                                title: 'Alerta',
                                message: 'Hubo un problema al procesar la solicitud, por favor intente nuevamente'
                            });
                        }
                    })
                    .catch((error) => {
                        hideLoading();
                    });
            } else {
                hideLoading();
                sweetAlert({
                    icon: 'warning',
                    title: 'Información',
                    message: 'Las contraseñas ingresadas no coinciden,por favor verifique !'
                });
            }
        } else {
            hideLoading();
            sweetAlert({
                icon: 'warning',
                title: 'Información',
                message: 'Ingrese un código válido,intente nuevamente !'
            });
        }
    }

    return (
        <>
            <Container>
                <Dialog open={modalResetPassword} onClose={closeModalResetPassword} aria-labelledby="form-dialog-title" style={{ zIndex: 20 }}>
                    <DialogTitle id="form-dialog-title">Cambio de Contraseña</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {activeFormChangePassword ? 'Por favor digite el codigo enviado a su correo y a continuacion su nueva contraseña' : 'Por favor escriba el email con el que realizo el registro'}
                        </DialogContentText>
                        {!activeFormChangePassword &&
                            <TextField
                                color="success"
                                autoFocus
                                margin="dense"
                                id="correocambioclave"
                                label="Correo Electronico"
                                type="email"
                                fullWidth
                                value={correoCambioClave}
                                onChange={(e) => { setCorreoCambioClave(e.target.value) }}
                            />
                        }
                        {activeFormChangePassword &&
                            <>
                                <TextField
                                    color="success"
                                    autoFocus
                                    margin="dense"
                                    id="confirmationCode"
                                    label="Codigo de Confirmacion"
                                    type="text"
                                    fullWidth
                                    value={confirmationCode}
                                    onChange={(e) => { setConfirmationCode(e.target.value) }}
                                />
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Nueva Contraseña</InputLabel>
                                    <OutlinedInput
                                        id="formPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formPassword}
                                        onChange={(e) => { setFormPassword(e.target.value) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={changeViewPassWord}
                                                    //onMouseDown={changeViewPassWord}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>
                                <FormControl fullWidth margin="dense" variant="outlined">
                                    <InputLabel htmlFor="outlined-adornment-password">Repita Contraseña</InputLabel>
                                    <OutlinedInput
                                        id="formConfirmPassword"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formConfirmPassword}
                                        onChange={(e) => { setFormConfirmPassword(e.target.value) }}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={changeViewPassWord}
                                                    //onMouseDown={changeViewPassWord}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Password"
                                    />
                                </FormControl>

                            </>

                        }
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalResetPassword} color="error">
                            Cancelar
                        </Button>
                        <Button onClick={activeFormChangePassword ? changePassword : sendEmailChangePassword} color="success">{activeFormChangePassword ? 'Actualizar Contrasena' : 'Enviar Correo'}</Button>
                    </DialogActions>
                </Dialog>
                <DivLogin>
                    <LinkHome href="/"><Logo src={LogoUtm} /></LinkHome>
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

                        <div style={{ borderWidth: 2, borderColor: 'red', border: 1 }}>
                            <ReCAPTCHA
                                ref={recaptchaRef}
                                sitekey="6LfuxJYkAAAAAEqVGLL9XWFCimZxHOFdKrGsYpuQ"
                                onChange={changeCaptcha}
                            />
                        </div>

                        <ThemeProvider theme={theme}>
                            <Input type="button" value="Iniciar sesión" onClick={Login} disabled={objbutton}></Input>
                        </ThemeProvider>

                    </FormLogin>

                    <div><p>¿No tienes una cuenta? <Link href="/register">Regístrate gratis</Link></p></div>
                    <Link onClick={() => openModalResetPassword()}>¿Olvidaste tu contraseña?</Link>

                </DivLogin>

            </Container >
        </>
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
    top: 32%;
}

.LockIcon{
    top: 44%;
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
    top: 31%;
}

.LockIcon{
    top: 44%;
}
}

@media (max-width: 1280px) {
.UserIcon, .LockIcon{
    left: 21%;
}

.UserIcon{
    top: 30.5%;
}

.LockIcon{
    top: 43.5%;
}

}

@media (max-width: 1080px) {
    .UserIcon, .LockIcon{
    left: 18%;
}

.UserIcon{
    top: 37%;
}

.LockIcon{
    top: 47.5%;
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
