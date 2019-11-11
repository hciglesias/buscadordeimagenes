import React, { useState } from 'react'
import Error from './Error';

function Buscador({guardarResultadoBusqueda}) {

    const [busqueda, guardarBusqueda] = useState('');
    const [error, guardarError] = useState(false);

    const buscarImagen = e => {
        e.preventDefault()

        // Validar
        if(busqueda === '') {
            guardarError(true)
            return;
        }


        // Enviar el termino al componente principal 
        guardarError(false)
        guardarResultadoBusqueda(busqueda);
    }

    return (
        <form
            onSubmit={buscarImagen}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: Futbol o Cafe"
                        onChange={e => guardarBusqueda(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input
                        type="submit"
                        className="btn btn-lg btn-danger btn-block"
                        value="Buscar"
                    />
                </div> 
            </div>
            { (error) ? <Error mensaje="Agrega un termino de busqueda" /> : null }
        </form>
    )
}

export default Buscador
