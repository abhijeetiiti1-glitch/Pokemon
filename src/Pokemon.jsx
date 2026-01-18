import React, { useEffect, useState } from 'react';
import PokemonCards from './PokemonCards';

const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=150";

  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const detailPokemonData = data.results.map(async (curPokemon) => {
        const res = await fetch(curPokemon.url);
        return await res.json();
      });

      const detailedResponse = await Promise.all(detailPokemonData);
      setPokemon(detailedResponse);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching Pokémon data:", error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <section className="container">
      <h1>Pokédex</h1>

      <ul className="cards">
        {pokemon.map((curPokemon) => (
          <PokemonCards
            key={curPokemon.id}
            pokemonData={curPokemon}
          />
        ))}
      </ul>
    </section>
  );
};

export default Pokemon;
