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
  <h4 className="stats-title">Base Stats</h4>

  <div className="stats">
    {pokemonData?.stats?.map((stat) => (
      <div className="stat-row" key={stat.stat.name}>
        <span className="stat-name">
          {stat.stat.name.replace("-", " ")}
        </span>

        <div className="stat-bar">
          <div
            className={`stat-fill ${stat.stat.name}`}
            style={{ width: `${Math.min(stat.base_stat, 100)}%` }}
          ></div>
        </div>

        <span className="stat-value">{stat.base_stat}</span>
      </div>
    ))}
  </div>
</div>


      </div>
    </li>
  );
};

export default PokemonCards;
