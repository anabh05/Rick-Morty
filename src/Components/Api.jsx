import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './api.css';

export default function Api() {
  const [characters, setCharacters] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1); // Para manejar el número total de páginas

  const paginacion = (pag) => {
    if (pag > 0 && pag <= totalPaginas) {
      setPagina(pag);
    }
  };

  const filtrado = (evento) => {
    getCharacters(pagina, evento.target.value);
  };

  const getCharacters = (pag, filter = '') => {
    axios.get(`https://rickandmortyapi.com/api/character/?page=${pag}&name=${filter}`)
      .then(res => {
        setCharacters(res.data.results);
        setTotalPaginas(res.data.info.pages); // Actualizar nº pág
      })
    
    // Vaciar personajes 
      .catch(err => {
        console.error(err);
        setCharacters([]); 
      });
  };

  useEffect(() => {
    getCharacters(pagina);
  }, [pagina]);

  return (
    <>
      <div className='main'>
        <div className='logo'>
          <img src='https://upload.wikimedia.org/wikipedia/fr/c/c8/Rick_and_Morty_logo.png' alt='Rick and Morty Logo' />
        </div>
        <div className='search'>
          <input type='text' onChange={(e) => filtrado(e)} className='form-data' />
          {/* <button onClick={}>Buscar</button> */}
        </div>
        <div className='characters'>
          {characters.map((character, index) => (
            <div className='character' key={index}>
              <img src={character.image} alt={character.name} />
              <div className='character-name'>
                <p>{character.name}</p>
              </div>
            </div>
          ))}
        </div>
        <div className='buttons'>
          <button onClick={() => paginacion(pagina - 1)}>Anterior</button>
          <span className='page'>{pagina}</span>
          <button onClick={() => paginacion(pagina + 1)}>Siguiente</button>
        </div>
      </div>
    </>
  );
}
