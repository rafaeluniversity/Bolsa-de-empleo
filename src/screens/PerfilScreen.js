import React, { useState, useEffect } from "react";
import TopNavbar from "../components/TopNavbar";
import Sidebar from "../components/Sidebar";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";

import instance from '../components/utils/Instance';
import { decodeJWT } from "../components/utils/Utils";
import sweetAlert from '../components/general/alerts/sweetAlert';
import { useDispatch } from 'react-redux';
import allActions from '../components/redux/actions';
import { useParams } from 'react-router-dom';
import useFormFields from "../components/hooks/custom/useFormFields";
import logoUTM from "../assets/img/logo_utm.png";
import routesEmpresa from "../components/routes/RoutesBarEmpresa";
import Select from "react-select";

export default function PerfilScreen(props) {
  const [sidebarMini, setSidebarMini] = React.useState(true);
  const [informationToken, setInformationToken] = useState({});
  const [dataSelect, setdataSelect] = useState({});
  const [refresh, setRefresh] = useState(false);
  const { formFields, createChangeHandler, createChangeState } = useFormFields({
    nombrecompleto: '',
    ct_tipoidentificacion: 0,
    numeroidentificacion: '',
    direccion: '',
    telefono: '',
    telefonocelular: '',
    ciudad_id: 0,
    fechanacimiento: '',
    ct_sexo: 0,
    correopersonal: '',
    discapacidad: false,
    extranjero: false,
    profesion: '',
    link_video: '',
    link_curriculum: '',
    link_foto: '',
    informacionadicional: ''
  });

  const { formFields: formFieldsEmpresa, createChangeHandler: createChangeHandlerEmpresa, createChangeState: createChangeStateEmpresa } = useFormFields({
    id: 0,
    razonsocial: '',
    direccion: '',
    ciudad_id: 0,
    telefono: '',
    correo: '',
    url: '',
    descripcion: '',
  });

  useEffect(() => {

    getDatosMaestros();

  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');

    setInformationToken(decodeJWT(token));
    getDataUsuario(decodeJWT(token));

  }, [refresh]);


  const dispatch = useDispatch();

  const showLoading = () => {
    dispatch(allActions.loadingActions.showLoading());
  }

  const hideLoading = () => {
    dispatch(allActions.loadingActions.hideLoading());
  }

  const getDatosMaestros = () => {
    showLoading();
    instance.get('usuario/perfil/dataselect')
      .then((resp) => {
        if (resp.data.statusCode === 200) {
          setdataSelect(resp.data.data);
          hideLoading();
        } else {
          hideLoading();
        }
      }).catch(error => {
        hideLoading();
      });
  }

  const getDataUsuario = (dataUser) => {
    showLoading();
    instance.get(`perfil/findall/data/${dataUser.usuarioId}`)
      .then((resp) => {
        if (resp.data.statusCode === 200) {
          hideLoading();
          const data = resp.data.data;
          console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
          console.log(data);
          createChangeState({
            ...formFields,
            nombrecompleto: data.nombrecompleto,
            ct_tipoidentificacion: data.ct_tipoidentificacion_id,
            numeroidentificacion: data.numeroidentificacion,
            correopersonal: data.correopersonal,
            direccion: data.direccion ?? '',
            ciudad_id: data.ciudad_id ?? 0,
            telefono: data.telefono ?? '',
            telefonocelular: data.telefonocelular ?? '',
            profesion: data.profesion,
            link_curriculum: data.link_curriculum,
            informacionadicional: data.informacionadicional ?? ''
          });

          if (data.empresa) {
            const { id, razon_social, direccion_empresa, ciudad_empresa_id, telefono_empresa, correo_empresa, url_web, descripcion } = data.empresa;
            createChangeStateEmpresa({
              id: id,
              razonsocial: razon_social ?? '',
              direccion: direccion_empresa ?? '',
              ciudad_id: ciudad_empresa_id ?? 0,
              telefono: telefono_empresa ?? '',
              correo: correo_empresa ?? '',
              url: url_web ?? '',
              descripcion: descripcion ?? '',
            });
          }

        } else {
          sweetAlert({
            icon: 'warning',
            title: 'Informacion',
            message: 'Hubo un problema al obtener la informacion del perfil.'
          });
          hideLoading();
        }
      }).catch(error => {
        hideLoading();
      });

  }


  const saveDataPerfil = () => {
    showLoading();

    const dataPersona = {
      ...formFields,
      persona_id: informationToken.personaId,
      user_id: informationToken.usuarioId,
      empresaId: informationToken.empresaId,
      empresa: formFieldsEmpresa
    }

    instance.post('/perfil/update', dataPersona)
      .then(resp => {
        if (resp.data.statusCode === 200) {
          sweetAlert({
            icon: 'success',
            title: 'Perfil Actualizado',
            message: 'El perfil se ha actualizado correctamente'
          });
          hideLoading();
          setRefresh(!refresh);
        } else {
          sweetAlert({
            icon: 'warning',
            title: 'Informacion',
            message: 'Hubo un problema al actualizar los datos del perfil.'
          });
          hideLoading();
        }
      }).catch(error => {
        const { response } = error;
        sweetAlert({
          icon: 'error',
          title: `${response.data.error.type}`,
          message: `${response.data.error.description}`
        });
        hideLoading();
      });;

  }

  const minimizeSidebar = () => {
    var message = "Sidebar mini ";
    if (document.body.classList.contains("sidebar-mini")) {
      setSidebarMini(false);
      message += "deactivated...";
    } else {
      setSidebarMini(true);
      message += "activated...";
    }
    document.body.classList.toggle("sidebar-mini");
    /*var options = {};
    options = {
      place: "tr",
      message: message,
      type: "info",
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    };
   notificationAlert.current.notificationAlert(options);*/
  };

  return (
    <div className="wrapper">
      <Sidebar {...props} routes={routesEmpresa} backgroundColor={'green'}  minimizeSidebar={minimizeSidebar} />
      <TopNavbar></TopNavbar>
      <div className="main-panel">
        <Row>
          <Col md="8">
            <Card>
              <CardHeader>
                <h5 className="title">Edit Profile</h5>
              </CardHeader>
              <CardBody>
                <Form>
                  {/* <Row>
                  <Col className="pr-1" md="5">
                      <FormGroup>
                        <label>Company (disabled)</label>
                        <Input
                          defaultValue="Creative Code Inc."
                          disabled
                          placeholder="Company"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="3">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          defaultValue="michael23"
                          placeholder="Username"
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label htmlFor="exampleInputEmail1">
                          Email address
                        </label>
                        <Input placeholder="Email" type="email" />
                      </FormGroup>
                    </Col>
  </Row> */}
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Nombres Completos</label>
                        <Input
                          value={formFields.nombrecompleto}
                          type="text"
                          name="nombrecompleto"
                          onChange={createChangeHandler('nombrecompleto')}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Numero identificacion</label>
                        <Input
                          name="numeroidentificacion"
                          value={formFields.numeroidentificacion}
                          onChange={createChangeHandler('numeroidentificacion')}
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Correo</label>
                        <Input
                          name="correopersonal"
                          value={formFields.correopersonal}
                          onChange={createChangeHandler('correopersonal')}
                          type="text"
                          disabled
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Direccion</label>
                        <Input
                          name="direccion"
                          value={formFields.direccion}
                          onChange={createChangeHandler('direccion')}
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Ciudad</label>
                        <Col md="12" sm="12" xs="12">
                          <Select
                            className="react-select primary"
                            classNamePrefix="react-select"
                            name="ciudad_id"
                            value={formFields.ciudad_id}
                            onChange={(value) => {
                              createChangeState({
                                ...formFields,
                                ciudad_id:value.value
                              })
                            }}
                            options={(dataSelect.ciudades ?? []).map((x, idx) => {
                              return {
                                value: x.id,
                                label:x.nombre,
                              };
                            })}
                            placeholder="Seleccione una ciudad"
                          />
                        </Col>
                        {/*<Col>
                          <Input
                            type="select"
                            name="ciudad_id"
                            id="selectCiudad"
                            className="select rounded"
                            value={formFields.ciudad_id}
                            onChange={createChangeHandler('ciudad_id')}
                          >
                            <option value={0} id="option1">--- seleccione ---</option>
                            {(dataSelect.ciudades ?? []).map((x, idx) => {
                              return (
                                <option value={x.id} id={x.nombre + idx}>{x.nombre}</option>
                              )
                            })}
                          </Input>
                          </Col>*/}
                      </FormGroup>
                    </Col>
                    <Col className="px-1" md="4">
                      <FormGroup>
                        <label>Telefono</label>
                        <Input
                          name="telefono"
                          value={formFields.telefono}
                          onChange={createChangeHandler('telefono')}
                          type="text"
                          maxLength={10}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="4">
                      <FormGroup>
                        <label>Celular</label>
                        <Input
                          name="telefonocelular"
                          value={formFields.telefonocelular}
                          onChange={createChangeHandler('telefonocelular')}
                          type="text"
                          maxLength={10}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="pr-1" md="4">
                      <FormGroup>
                        <label>Profesion</label>
                        <Input
                          value={formFields.profesion}
                          type="text"
                          name="profesion"
                          onChange={createChangeHandler('profesion')}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="pl-1" md="8">
                      <FormGroup>
                        <label>Link Curriculum</label>
                        <Input
                          name="link_curriculum"
                          value={formFields.link_curriculum}
                          onChange={createChangeHandler('link_curriculum')}
                          type="text"
                        />
                      </FormGroup>
                    </Col>

                  </Row>
                  <Row>
                    <Col md="12">
                      <FormGroup>
                        <label>Informacion sobre mi...</label>
                        <Input
                          cols="80"
                          placeholder="Cuentanos mas sobre ti..."
                          rows="3"
                          type="textarea"
                          name="informacionadicional"
                          value={formFields.informacionadicional}
                          onChange={createChangeHandler('informacionadicional')}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  {(informationToken?.tipousuario === 'EMP' || informationToken?.tipousuario === 'EMD') &&
                    <>

                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <h6>Informacion de mi Empresa</h6>
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Razon Social</label>
                            <Input
                              value={formFieldsEmpresa.razonsocial}
                              type="text"
                              name="razonsocial"
                              onChange={createChangeHandlerEmpresa('razonsocial')}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Correo Empresarial</label>
                            <Input
                              name="correo"
                              value={formFieldsEmpresa.correo}
                              onChange={createChangeHandlerEmpresa('correo')}
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label>Pagina Web</label>
                            <Input
                              name="url"
                              value={formFieldsEmpresa.url}
                              onChange={createChangeHandlerEmpresa('url')}
                              type="text"
                              maxLength={300}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label>Telefono Empresarial</label>
                            <Input
                              name="telefonoempresa"
                              value={formFieldsEmpresa.telefono}
                              onChange={createChangeHandlerEmpresa('telefono')}
                              type="text"
                              maxLength={10}
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label>Ciudad Empresa</label>
                            <Col>
                              <Input
                                type="select"
                                name="ciudadempresa_id"
                                id="selectCiudadEmpresa"
                                className="select rounded"
                                value={formFieldsEmpresa.ciudad_id}
                                onChange={createChangeHandlerEmpresa('ciudad_id')}
                              >
                                <option value={0} id="option1">--- seleccione ---</option>
                                {(dataSelect.ciudades ?? []).map((x, idx) => {
                                  return (
                                    <option value={x.id} id={x.nombre + idx}>{x.nombre}</option>
                                  )
                                })}
                              </Input>
                            </Col>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Direccion de la Empresa</label>
                            <Input
                              name="direccionempresa"
                              value={formFieldsEmpresa.direccion}
                              onChange={createChangeHandlerEmpresa('direccion')}
                              type="text"
                              maxLength={300}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Descripcion de la Empresa</label>
                            <Input
                              cols="80"
                              placeholder="Escriba una breve descripcion de su empresa..."
                              rows="3"
                              type="textarea"
                              name="url"
                              value={formFieldsEmpresa.descripcion}
                              onChange={createChangeHandlerEmpresa('descripcion')}
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                    </>

                  }


                </Form>
              </CardBody>

              <Row>
                <Col sm="8">
                </Col>
                <Col md="4">
                  <Button
                    color="success"
                    className="btn-round"
                    onClick={() => saveDataPerfil()}
                  >
                    Guardar Datos
                  </Button>

                </Col>

              </Row>

            </Card>
          </Col>
          <Col md="4">
            <Card className="card-user">
              <div style={{ backgroundColor: 'green', height: 200, position: 'relative', overflow: 'hidden' }}>

              </div>
              <CardBody>
                <div className="author">
                  <a onClick={(e) => e.preventDefault()}>
                    <img
                      alt="..."
                      className="avatar border-gray"
                      src={logoUTM}
                    />
                    <h5 className="title" style={{ color: 'green' }}>{(informationToken?.tipousuario === 'EMP' || informationToken?.tipousuario === 'EMD') ? formFieldsEmpresa.razonsocial : formFields.nombrecompleto}</h5>
                  </a>
                  <p className="description">{(informationToken?.tipousuario === 'EMP' || informationToken?.tipousuario === 'EMD') ? formFieldsEmpresa.correo : formFields.correopersonal}</p>
                </div>
                <p className="description text-center">
                  "{(informationToken?.tipousuario === 'EMP' || informationToken?.tipousuario === 'EMD') ? formFieldsEmpresa.descripcion : formFields.informacionadicional}"
                </p>
              </CardBody>
              <hr />
              {/*<div className="button-container">
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-facebook-f" />
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-twitter" />
                </Button>
                <Button
                  className="btn-neutral btn-icon btn-round"
                  color="default"
                  href="#pablo"
                  onClick={(e) => e.preventDefault()}
                  size="lg"
                >
                  <i className="fab fa-google-plus-g" />
                </Button>
                </div>*/}

            </Card>
          </Col>

        </Row>

      </div>
    </div>
  )
}