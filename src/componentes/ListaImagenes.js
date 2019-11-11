import React from 'react'
import Imagen from './Imagen'


function ListaImagenes({fotos}) {
    return (
        <div className="col-12 p-5 row">
            {fotos.map(foto => (
                <Imagen
                    key={foto.id}
                    foto={foto} 
                />
    ))}
        </div>
    )
}

export default ListaImagenes
