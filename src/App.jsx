import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { MagnifyingGlass } from '@phosphor-icons/react';

function App() {
  const [pokemons, setPokemons] = useState({});
  const [busca, setBusca] = useState('');
  
  // Função para buscar Pokémon por ID
  const getPokemons = (id) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        const pokemon = response.data;
        setPokemons((prevPokemon) => ({ ...prevPokemon, [id]: pokemon }));
      });
  };

  // Função para buscar todos os Pokémon até o ID 1015
  const arrayPokemons = () => Array(150).fill().map((_, index) => getPokemons(index + 1));

  // Filtro de busca para Pokémon
  const buscarPokemons = Object.values(pokemons).filter(
    (pokemon) => 
      pokemon.name.toLowerCase().includes(busca.toLowerCase()) || 
      pokemon.id === parseInt(busca)
  );

  useEffect(() => {
    arrayPokemons();
  }, []);

  return (
    <div className="container">
      <h1 className="titulo">Pokedex</h1>

      <div className="busca-container">
      <MagnifyingGlass size={32} />
        <input 
          className="busca"
          type="search"
          placeholder="Pesquisar pokemons..."
          value={busca}
          onChange={({ target }) => setBusca(target.value)}
        />
      </div>
      <ul className="pokemons">
        {
          buscarPokemons.map(({ id, name, types = [] }) => (
            <li key={id} className={`card ${types[0].type.name}`}>
              <img 
                className="card-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`} 
                alt={name} 
              />
              <h2>{id}. {name}</h2>
              <p className="type">
                {types.map(item => item.type.name).join(" / ")}
              </p>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
