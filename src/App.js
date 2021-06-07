import React, {useEffect, useState} from 'react';
import axios from "axios";
import "./app.css";

const Componente = () => {
    useEffect(() => {
        buscarAnimes();
    }, []);

    const [animes, setAnimes] = useState([]);

    const buscarAnimes = async () => {
        let listAnimes = [];
        for (let i = 1; i < 30; i++) {
            try {
                const response = await axios.get(`https://kitsu.io/api/edge` + i);
                listAnimes.push(response.data);
            } catch (e) {
                console.log("Anime " + i + " não encontrado!! ", e.response);
            }
        }
        setAnimes(listAnimes);
    }

    return (
        <div>
            <h1 className="titulo-pagina">Lista Animes</h1>
            {animes.length === 0
                ?
                <p className="texto-carregando">Carregando...</p>
                :
                <div className="box">
                    {animes.map(anime => (
                        <div className="anime-card">
                            <div className="anime-card-box-description">
                                <p className="anime-title">{anime.title}</p>
                                <ul className="anime-ul-info">
                                    <li>Episodios: {anime.episodes ? anime.episodes : "Em andamento"}</li>
                                    <li>Duração: {anime.duration}</li>
                                    <li>Nota: {anime.score}</li>
                                </ul>
                            </div>
                            <div className="anime-card-box-img">
                                <img className="anime-img" src={anime.image_url} alt={anime.title}/>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default Componente;
