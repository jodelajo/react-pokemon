import React, {useState, useEffect} from 'react';
import './App.css';
import Pokemon from "./components/Pokemon";
import logo from "../src/assets/Pik.png"

import axios from "axios";


function App() {
    const [pokemons, setPokemons] = useState([]);
    const [clickForward, toggleClickForward] = useState(false)
    const [clickBackward, toggleClickBackward] = useState(false)
    const [error, setError] = useState('')
    const [url, setUrl] = useState('')



    // console.log(clickForward)
    function handleClickForward (url){
        if (toggleClickForward) {

        }

    }

    useEffect(() => {
        async function fetchData() {

            setError('')
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
                console.log(result.data.results);
                // console.log(result.data)
                setPokemons(result.data.results);
                toggleClickForward(!clickForward);
                // console.log(result.data.next)
                let url = result.data
                // console.log(url)

            } catch (e) {
                setError("Er is iets misgegaan met het ophalen van de data.")
                console.error(e)
            }
        }

        fetchData();
    }, []);

    return (
        <>
            <div className="header">
    <img src={logo} alt="logo" className="logo"/>
            </div>
            <div className="button">
            <button type="button" className="single-button" >Previous</button>
            <button type="button" className="single-button" onClick={handleClickForward}>Next</button>
            </div>

            <div className="pokemon-container">
                {error && <p>{error}</p>}

                    {pokemons && pokemons.map((pokemon) => {
                        return <Pokemon name={pokemon.name}/>

                    })}

            </div>

            {/*<Pokemon name="ditto"/>*/}
            {/*<Pokemon name="pikachu"/>*/}

        </>
    );
}

export default App;
