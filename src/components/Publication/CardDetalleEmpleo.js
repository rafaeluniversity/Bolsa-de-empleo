import React from 'react'

export const CardDetalleEmpleo = () => {
    return (
        
        <div className='card'>
            <div className='card-title'>
                <img src='https://pbs.twimg.com/profile_images/1002122442637238273/zRcDtN3r_400x400.jpg'/>
                <h3>Analista financiero</h3>
            </div>
            <hr />
            <div>
                <span className='etiqueta-trabajo'>Trabajo</span>
                <div className='card-text'>
                    <h3>Lugar de trabajo</h3>
                    <p>Portoviejo</p>
                </div>
                <div className='card-text'>
                    <h3>Tipo de contrato</h3>
                    <p>Contrato indefinido</p>
                </div>
                <div className='card-text'>
                    <h3>Jornada laboral</h3>
                    <p>Jornada completa</p>
                </div>
                <div className='card-text'>
                    <h3>N° de vacantes</h3>
                    <p>1</p>
                </div>
                
                
            </div>
            <a href='#' className='btn-postular-ahora'>Postular Ahora</a>
        </div>
    )
}
