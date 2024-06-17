import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './api.css';

export default function Api() {

    const [characters, setCharacters] = useState([])
    const [pagina, setPagina] = useState(1)


    const paginacion = (pag) => {

        setPagina(pag) //( pagina-1 ) (pagina + 1) Modificar variable estado pagina
        getCharacters(pag) //para indicar la pagina  los personajes por página

    }

    const filtrado = (evento) => {
        getCharacters(pagina, evento.target.value)
    }

    const getCharacters = (pag,filter) => {

        axios.get(`https://rickandmortyapi.com/api/character/?page=${pag}&name=${filter}`)
        .then(res => setCharacters(res.data.results))

    }
    

    useEffect(() => {
        getCharacters(pagina,"") // Como se carga la 1ª petición
        

    }, []);
    


    return (
        <>
            <input type='text' onChange={(e) => filtrado(e)} className='form-data'></input>
            {/* <button onClick={}>Buscar</button> */}
    <div className='characters'>
    {characters.map((character, index) => (
            
        <div className='character' key={index}>
            <img src={character.image}></img>
            <p>{character.name}</p>
        </div>))}
          
            </div>
            
            <button onClick={() => { paginacion(pagina - 1) }}>Anterior</button>
            <span>{pagina}</span>
            <button onClick={() => { paginacion(pagina + 1) }}>Siguiente</button>
    </>


  )
}
