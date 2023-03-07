import Swal from 'sweetalert2';

export default function sweetAlert(props) {
    const { title, icon, message, confirmButtonColor, confirmButtonText } = props; 
    return (
        Swal.fire({
            icon: icon,
            title: title,
            text: message,
            confirmButtonText: confirmButtonText ?? 'Aceptar',
            confirmButtonColor: '#147935',
        })
    )

}