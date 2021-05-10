import React, {useState, useEffect} from 'react';
import './App.css';
import Pokemon from "./components/Pokemon";
import logo from "../src/assets/Pik.png"
import axios from "axios";

function App() {
    const [pokemons, setPokemons] = useState([]);
    const [error, setError] = useState('')
    const [currentUrl, setCurrentUrl] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
    const [nextUrl, setNextUrl] = useState(null)
    const [previousUrl, setPreviousUrl] = useState(null)
    const basicUrl = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20`


    function handleClickNext() {
        setCurrentUrl(nextUrl)
        console.log(nextUrl)
    }

    function handleClickPrevious() {
        setCurrentUrl(previousUrl)
    }

    function imgClick(){
        setCurrentUrl(basicUrl)
    }


    useEffect(() => {
        async function fetchData() {
            setError('')
            try {
                const result = await axios.get(currentUrl);
                setPokemons(result.data.results);
                setCurrentUrl(currentUrl)
                setNextUrl(result.data.next)
                setPreviousUrl(result.data.previous)
            } catch (e) {
                setError("Er is iets misgegaan met het ophalen van de data.")
                console.error(e)
            }
        }
        fetchData();
    }, [currentUrl]);
    return (
        <>
            <div className="header">
                <img src={logo} alt="logo" className="logo" onClick={imgClick} />
            </div>
            <div className="button">
                <button type="button"
                        className="single-button"
                        onClick={handleClickPrevious}
                        disabled={previousUrl === null}
                >Previous
                </button>
                <button
                    type="button"
                    className="single-button"
                    onClick={handleClickNext}
                    disabled={nextUrl === null}
                >Next
                </button>
            </div>
            <div className="pokemon-container">
                {error && <p>{error}</p>}
                {pokemons && pokemons.map((pokemon) => {
                    return <Pokemon name={pokemon.name} currentUrl={nextUrl}/>
                })}
            </div>
        </>
    );
}

export default App;
