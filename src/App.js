import React,  { useState, useEffect } from 'react';
import axios from 'axios';
import Buscador from './componentes/Buscador';
import ListaImagenes from './componentes/ListaImagenes';


function App() {

  const [resultadobusqueda, guardarResultadoBusqueda] = useState ('');
  const [fotos, guardarFotos] = useState ([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    if(resultadobusqueda === '') return;

    const consultarAPI = async () => {
      const cantidadFotos = '30'
      const key = '13857228-ed2ef7d1c753dcea0903ad315'
      const url = `https://pixabay.com/api/?key=${key}&q=${resultadobusqueda}&per_page=${cantidadFotos}&page=${paginaActual}`
      const resultado = await axios(url);

      guardarFotos(resultado.data.hits);

      //Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(resultado.data.totalHits / cantidadFotos)
      guardarTotalPaginas(calcularTotalPaginas)

      //Mover la pantalla hacia la pagina superior
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior:'smooth', block:'start'});
    }

    consultarAPI();
  }, [resultadobusqueda, paginaActual])

  const paginaAnterior = () => {

    let nuevaPaginaActual = paginaActual - 1
    guardarPaginaActual(nuevaPaginaActual)

  }

  const paginaSiguiente = () => {

    let nuevaPaginaActual = paginaActual + 1
    guardarPaginaActual(nuevaPaginaActual)

  }

  return (
    <div className="app container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>

        <Buscador
          guardarResultadoBusqueda={guardarResultadoBusqueda} />
      </div>

      <div className="row justify-content-center">
        <ListaImagenes 
          fotos={fotos}
        />

        { (paginaActual === 1) ? null : (<button onClick={paginaAnterior} type="button" className="btn btn-info mr-1">Anterior &laquo;</button>)}
        { (paginaActual === totalPaginas) ? null : (<button onClick={paginaSiguiente} type="button" className="btn btn-info">Siguiente &raquo;</button>)}

      </div>
    </div>
  );
}

export default App;
