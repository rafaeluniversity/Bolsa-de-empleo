
import EmpleosPublicados from "../../screens/EmpleosPublicados";

var dashRoutesEmpresa = [
  {
    path: "/listaEmpleos",
    name: "Empleos Publicados",
    icon: "design_app",
    component: <EmpleosPublicados />,
    layout: "/empresa",
  },
];

export default dashRoutesEmpresa;
