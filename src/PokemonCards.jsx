import React from 'react';

const PokemonCards = ({ pokemonData }) => {
  return (
    <li className="pokemon-card">
      <h3>{pokemonData.name}</h3>
      <figure>
        <img
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name}
          className=''
        />
      </figure>
    </li>
  );
};

export default PokemonCards;
