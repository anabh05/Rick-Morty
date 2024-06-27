import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './api.css';

export default function Api() {

    const [characters, setCharacters] = useState([])
    const [pagina, setPagina] = useState(1)


    const paginacion = (pag) => {

        setPagina(pag) //( pagina-1 ) (pagina + 1) Modificar variable estado pagina
        getCharacters(pag) //para indicar la pagina los personajes por página

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
    
    <div className='main'>
                
    <div className='logo'>
        <img src='https://upload.wikimedia.org/wikipedia/fr/c/c8/Rick_and_Morty_logo.png'></img>
    </div>
                
    <div className='search'>
        <input type='text' onChange={(e) => filtrado(e)} className='form-data'></input>
        {/* <button onClick={}>Buscar</button> */}
    </div>

    <div className='characters'>
    {characters.map((character, index) => (
            
        <div className='character' key={index}>
            <img src={character.image}></img>
            <div className='character-name'>
                <p>{character.name}</p>
            </div>
        </div>))}
          
            </div>
        
    <div className='buttons'>
            <button onClick={() => { paginacion(pagina - 1) }}>Anterior</button>
            <span className='page'>{pagina}</span>
                <button onClick={() => { paginacion(pagina + 1) }}>Siguiente</button>
    </div>
                
    </div>
    </>


  )
}
