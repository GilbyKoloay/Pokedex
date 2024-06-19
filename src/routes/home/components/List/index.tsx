import axios from 'axios';
import { useEffect } from 'react';

import { useAppContext } from '../../../../contexts/AppContext';



/**
 * Component that list the all or filtered pokemons infinitely.
 */
const List = () => {
  const { pokemonList, setPokemonList, pokemonListFetchURL, setPokemonListFetchURL } = useAppContext();



  useEffect(() => {
    addPokemonList();
    setTimeout(addPokemonList, 2500);
    setTimeout(addPokemonList, 2500);
  }, []);



  /**
   * Adds more pokemon to pokemon list and updates the pokemon list fetch URL.
   */
  async function addPokemonList() {
    try {
      const { data } = await axios.get(pokemonListFetchURL.next);
      const list = data.results;
      const next = data.next;
      const previous = data.previous;

      setPokemonList([...pokemonList, ...list]);
      setPokemonListFetchURL({ next, previous });

      console.log([...pokemonList, ...list]);
    } catch (err) {
      console.log('Unable to add pokemon in list: ', err);
    }
  }



  return (
    <div>
      List
    </div>
  );
};



export { List };

