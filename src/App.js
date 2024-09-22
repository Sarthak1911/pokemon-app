import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon?limit=50')
      .then(response => {
        const pokemonData = response.data.results;
        const fetchPokemonDetails = pokemonData.map(poke => axios.get(poke.url));
        Promise.all(fetchPokemonDetails).then(responses => {
          setPokemon(responses.map(res => res.data));
        });
      })
      .catch(error => console.log(error));
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemon.filter(poke =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-tertiary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Pokémon Search</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex ms-auto">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search Pokémon"
                aria-label="Search"
                value={searchTerm}
                onChange={handleSearch}
              />
            </form>
          </div>
        </div>
      </nav>


      {/* Pokémon Cards */}
      <div className="pokemon-container d-flex flex-wrap justify-content-center mt-4">
        {filteredPokemon.map((poke, index) => (
          <div key={index} className="pokemon-card border p-3 m-2 text-center" style={{ width: '150px' }}>
            <img
              src={poke.sprites.front_default}
              alt={poke.name}
              className="img-fluid"
            />
            <h5 className="mt-2">{poke.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
