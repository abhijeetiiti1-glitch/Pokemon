/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import PokemonCards from './PokemonCards';
import GradientText from './GradientText'
const Pokemon = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearchTerm] = useState("");
  const [visible, setVisible] = useState(8);

  const API = "https://pokeapi.co/api/v2/pokemon?limit=1100";

  const fetchPokemon = async () => {
    try {
      const response = await fetch(API);
      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (curPokemon) => {
          const res = await fetch(curPokemon.url);
          return await res.json();
        })
      );

      setPokemon(detailedPokemon);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchPokemon();
  }, []);

  const searchData = pokemon.filter((item) => {
    const searchValue = search.toLowerCase().trim();

    return (
      item.name.toLowerCase().includes(searchValue) ||
      item.id.toString() === searchValue ||
      `#${item.id}` === searchValue
    );
  });

  const visiblePokemon = searchData.slice(0, visible);

  if (loading) return <h2 className="status">Loading Pokédex...</h2>;
  if (error) return <h2 className="status">Error: {error.message}</h2>;

  return (
    <section className="container">
      <h1 className="title font-bold">  
<GradientText
  colors={["#cf1b1b", "#da8907", "#40ffaa", "#fffc40", "#ff7340"]}
  animationSpeed={3}
  showBorder={false}
  className="custom-class"
>
 Pokédex
</GradientText></h1>

      <div className="pokemon-search">
        <input
          type="text"
          placeholder="Search Pokémon..."
          value={search}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisible(12);
             `#${item.id}` 
          }}
        />
      </div>
      <ul className="cards">
        {visiblePokemon.map((curPokemon) => (
          <PokemonCards
            key={curPokemon.id}
            pokemonData={curPokemon}
          />
        ))}
      </ul>

 
      {visible < searchData.length && (
        <div className="load-more">
          <button onClick={() => setVisible(prev => prev + 16)}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default Pokemon;
