import Sidebar from "../components/Sidebar";
import TopNavbar from "../components/TopNavbar";
import dashRoutesEmpresa from "../components/routes/RoutesBarEmpresa";

export default function EmpleosPublicados(props) {
    return (
        <div className="wrapper">
            <Sidebar {...props} routes={dashRoutesEmpresa} backgroundColor={'green'} />
            <TopNavbar></TopNavbar>
            <div className="main-panel">

            </div>
        </div>
    )
}