import type { Pokemon } from '../types/pokemon';
import type { PokemonAbilityNameList } from '../types/pokemonAbilityNameList';
import type { PokemonTypeNameList } from '../types/pokemonTypeNameList';
import type { PokemonListSortOption } from '../types/pokemonListSortOption';

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { toProperCase } from '../utils/toProperCase';



type AppContextT = {
  /**
   * List of pokemon types.
   * 
   * Used for advanced search, in type and weakness section.
   */
  pokemonTypeNameList: PokemonTypeNameList,
  setPokemonTypeNameList: (pokemonTypeNameList: PokemonTypeNameList) => void;

  /**
   * Total of pokemon.
   * 
   * Used for advanced search, in number range section.
   */
  pokemonCount: number;
  setPokemonCount: (pokemonCount: number) => void;

  /**
   * List of ability names.
   * 
   * Used for advanced search, in ability section.
   */
  pokemonAbilityNameList: PokemonAbilityNameList,
  setPokemonAbilityNameList: (pokemonAbilityNameList: PokemonAbilityNameList) => void;

  /**
   * List of pokemon that will be shown in list section.
   */
  pokemonList: Pokemon[] | null;
  setPokemonList: (pokemonList: Pokemon[] | null) => void;

  /**
   * URL that will be used to fetch another pokemons.
   * 
   * When user has scrolled to the bottom of the page in list section, app will use this link to add another pokemon list.
   */
  pokemonListNextFetchURL: string;
  setPokemonListNextFetchURL: (pokemonListNextFetchURL: string) => void;

  /**
   * App will use this to sort the pokemon list in list section.
   */
  pokemonListSortOption: PokemonListSortOption;
  setPokemonListSortOption: (pokemonListNextFetchURL: PokemonListSortOption) => void;

  /**
   * Will hold the addition of pokemon into the `pokemonList`.
   * 
   * This is necessary so that when user searched for pokemon using its name or national number, the app won't add another pokemon into the list automatically.
   */
  isPokemonListAdditionHalted: boolean;
  setIsPokemonListAdditionHalted: (isPokemonListAdditionHalted: boolean) => void;
};

type AppContextProviderT = {
  children: React.ReactNode
};



/**
 * The total number of pokemon that will be added to pokemon list each time the user scroll to the end of the page in home route.
 */
const pokemonListNextFetchURLCount = 16;

const AppContext = createContext<AppContextT | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('`useAppcontext` must be used within an `AppProvider`.');

  return context;
}

const AppContextProvider: React.FC<AppContextProviderT> = ({ children }) => {
  const [pokemonTypeNameList, setPokemonTypeNameList] = useState<PokemonTypeNameList>(null);
  const [pokemonCount, setPokemonCount] = useState<number>(0);
  const [pokemonAbilityNameList, setPokemonAbilityNameList] = useState<PokemonAbilityNameList>(null);
  const [pokemonList, setPokemonList] = useState<Pokemon[] | null>(null);
  const [pokemonListNextFetchURL, setPokemonListNextFetchURL] = useState<string>(`${process.env.REACT_APP_API_URL}/pokemon?offset=0&limit=${pokemonListNextFetchURLCount}`);
  const [pokemonListSortOption, setPokemonListSortOption] = useState<PokemonListSortOption>('Lowest Number (First)');
  const [isPokemonListAdditionHalted, setIsPokemonListAdditionHalted] = useState<boolean>(false);



  useEffect(() => {
    getPokemonTypeNameList();
    getPokemonCount();
    getPokemonAbilityNameList();
  }, []);



  /**
   * Get all pokemon type name.
   * 
   * Will fetch the total of pokemon type and save the `count`, then will re-fetch but applying `count` as the limit, then save all pokemon type name in the state.
   */
  async function getPokemonTypeNameList() {
    try {
      const countRes = await axios.get(`${process.env.REACT_APP_API_URL}/type`);
      const count = countRes.data.count;

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/type?limit=${count}`);
      const typeNameList = res.data.results
        .map((type: any) => toProperCase(type.name))
        .sort();
      
      setPokemonTypeNameList(typeNameList);
    } catch (err) {
      console.error('Unable to get pokemon type name list: ', err);
    }
  }

  /**
   * Get pokemon count.
   * 
   * Will fetch the total of pokemon and save the `count` in the state.
   */
  async function getPokemonCount() {
    try {
      const countRes = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon`);
      const count = countRes.data.count;
      
      setPokemonCount(count);
    } catch (err) {
      console.error('Unable to get pokemon count: ', err);
    }
  }

  /**
   * Get all pokemon ability name.
   * 
   * Will fetch the total of pokemon ability and save the `count`, then will re-fetch but applying `count` as the limit, then save all pokemon ability name in the state.
   */
  async function getPokemonAbilityNameList() {
    try {
      const countRes = await axios.get(`${process.env.REACT_APP_API_URL}/ability`);
      const count = countRes.data.count;

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/ability?limit=${count}`);
      const abilityNameList = res.data.results
        .map((ability: any) => toProperCase(ability.name))
        .sort();
      
      setPokemonAbilityNameList(abilityNameList);
    } catch (err) {
      console.error('Unable to get pokemon ability name list: ', err);
    }
  }



  return (
    <AppContext.Provider value={{
      pokemonTypeNameList, setPokemonTypeNameList,
      pokemonCount, setPokemonCount,
      pokemonAbilityNameList, setPokemonAbilityNameList,
      pokemonList, setPokemonList,
      pokemonListNextFetchURL, setPokemonListNextFetchURL,
      pokemonListSortOption, setPokemonListSortOption,
      isPokemonListAdditionHalted, setIsPokemonListAdditionHalted
    }}>
      {children}
    </AppContext.Provider>
  );
};



export { AppContextProvider, useAppContext };

