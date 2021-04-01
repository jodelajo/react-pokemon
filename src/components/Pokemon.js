import React, {useState, useEffect} from 'react';
import axios from "axios";

function Pokemon({ name}){
    const [pokemon, setPokemon] = useState([]);
    const [pokemonAbilities, setPokemonAbilities] = useState([])
    const [mooves, setMooves] = useState([])

    useEffect(() =>{
    async function fetchSinglePokemon(){
        try{
            const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
            // console.log(result.data)
            setPokemon(result.data)
            setPokemonAbilities(result.data.abilities)
            setMooves(result.data.moves)
            // console.log(result.data.abilities)
        } catch (e) {
            console.error(e)
        }

    }

fetchSinglePokemon();
    },([]))

    return (
        <div className="pokemon-card">
            <h2>{pokemon.name}</h2>
            <img src={pokemon.sprites?.front_default} className="pokemon-image"/>
            <p>Gewicht: {pokemon.weight}</p>
            <p>Aantal Moves: {mooves.length}</p>
            <h3> Lijst Abilities:</h3>

            <ul>
                {pokemonAbilities.map((pokemonAbility) =>{
                    return <li key={pokemonAbility.ability.name}>{pokemonAbility.ability.name}</li>
                })}
            </ul>


        </div>
    );
}
export default Pokemon;