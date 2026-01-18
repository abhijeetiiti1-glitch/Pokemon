import React from 'react';

const PokemonCards = ({ pokemonData }) => {
  const mainType = pokemonData?.types?.[0]?.type?.name;

  return (
    <li className={"pokemon-card" + (mainType ? ` ${mainType}` : '')  }>
      <div className="card-inner">

        <div className="card-front">
          <figure>
            <img
              src={pokemonData?.sprites?.front_default}
              alt={pokemonData?.name}
              className="pokemon-image"
            />
          </figure>

          <h3 className="pokemon-name">{pokemonData?.name}</h3>

          <div className="pokemon-info pokemon-hightlight">
            <p>
              {pokemonData?.types
                ?.map((type) => type.type.name)
                .join(', ')}
            </p>
          </div>

          <span className="pokemon-id">#{pokemonData?.id}</span>
        </div>

        <div className="card-back">
          <h4 className=''>Stats</h4>
          <p>
            {pokemonData?.stats
              ?.map((stat) => `${stat.stat.name}: ${stat.base_stat}`)
              .join(', ')}
          </p>
        </div>

      </div>
    </li>
  );
};

export default PokemonCards;
