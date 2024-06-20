import type { Pokemon } from '../../types/pokemon';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../contexts/AppContext';
import { getPokemonOverviewData } from '../../utils/getPokemonOverviewData';
import { NotFound } from './components/NotFound';



/**
 * Page that displays detailed information about a pokemon.
 * 
 * Will fetch pokemon's information based on the pokemon's `name` inside URL param.
 * 
 * Will route to `/` if the searched pokemon is not found.
 */
const Name = () => {
  const { nameOrNationalNumber } = useParams();

  const { pokemonList } = useAppContext();

  const [isPokemonDoesNotExist, setIsPokemonDoesNotExist] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);



  useEffect(() => {
    getPokemon();
  }, []);



  /**
   * Will get the pokemon data that will be displayed.
   * 
   * First retrieves the name or national number from `name` url param.
   * Then search if it already exist in `pokemonList` stored in app context.
   * 
   * If exist, we will only fetch the detailed data.
   * 
   * If not exist, we will fetch the data from API.
   * 
   * If data not exist in API (means the pokemon does not exist), we will route user to home page.
   */
  async function getPokemon() {
    const pokemonInList = checkPokemonInPokemonList();
    if (pokemonInList) {
      getPokemonDetailedData(pokemonInList);
      return;
    }

    const fetchedPokemonData = await getPokemonOverviewData(nameOrNationalNumber ?? '');
    if (!fetchedPokemonData) {
      setIsPokemonDoesNotExist(true);
      return;
    }

    getPokemonDetailedData(fetchedPokemonData);
  }

  /**
   * Will check if pokemon already exist in `pokemonList` inside app context.
   */
  function checkPokemonInPokemonList(): Pokemon | null {
    const pokemonInList = pokemonList?.find(pokemon => (
      pokemon.name.toLowerCase() === nameOrNationalNumber?.toLowerCase() ||
      pokemon.nationalNumber.toString() === nameOrNationalNumber)
    );

    if (!pokemonInList) return null;
    
    return pokemonInList;
  }

  /**
   * Get pokemon detailed data and update the `pokemon` state.
   */
  async function getPokemonDetailedData(thisPokemon: Pokemon) {
    try {
      const updatedPokemon = thisPokemon;

      setPokemon(updatedPokemon);
    } catch (err) {
      console.error('Unable to get pokemon detailed data: ', err);
    }
  }



  return (
    <main id='name'>
      {(!isPokemonDoesNotExist && !pokemon) ? (
        <div>Loading ...</div>
      ) : isPokemonDoesNotExist ? (
        <NotFound />
      ) : (
        <div>hello world</div>
      )}
    </main>
  );
};



export { Name };

