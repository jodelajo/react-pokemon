import React, {useState, useEffect} from 'react';
import axios from "axios";

function Pokemon({name, currentUrl}) {
    const [pokemon, setPokemon] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [mooves, setMooves] = useState([])

    useEffect(() => {
        async function fetchSinglePokemon() {
            try {
                const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
                setPokemon(result.data)
                setPokemonAbilities(result.data.abilities)
                setMooves(result.data.moves)
            } catch (e) {
                console.error(e)
            }
        }
        fetchSinglePokemon();
    }, [currentUrl])

    return (
        <div className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites?.front_default} className="pokemon-image"/>
            <p className="single-element">Gewicht: {pokemon.weight}</p>
            <p className="single-element">Aantal Moves: {mooves.length}</p>
            <h3 className="single-element"> Lijst Abilities:</h3>
            <ul>
                {pokemonAbilities.map((pokemonAbility) => {
                    return <li key={pokemonAbility.ability.name}>{pokemonAbility.ability.name}</li>
                })}
            </ul>
        </div>
    );
}

export default Pokemon;