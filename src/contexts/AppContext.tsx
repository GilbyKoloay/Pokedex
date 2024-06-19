import type { PokemonTypeList } from '../types/pokemoneTypeList';

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';



type AppContextT = {
  pokemonTypeList: PokemonTypeList,
  setPokemonTypeList: (pokemonTypeList: PokemonTypeList) => void;
};

type AppContextProviderT = {
  children: React.ReactNode
};



const AppContext = createContext<AppContextT | undefined>(undefined);

const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) throw new Error('`useAppcontext` must be used within an `AppProvider`.');

  return context;
}

const AppContextProvider: React.FC<AppContextProviderT> = ({ children }) => {
  const [pokemonTypeList, setPokemonTypeList] = useState<PokemonTypeList>(null);



  /**
   * Get all type of pokemon.
   * 
   * Will fetch the total of type first, then will fetch all types of pokemon limited by the total of type that was fetched before.
   */
  async function getPokemonTypeList() {
    try {
      const countRes = await axios.get(`${process.env.REACT_APP_API_URL}/type`);
      const count = countRes.data.count;

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/type?limit=${count}`);
      const typeList = res.data.results.map((type: any) => type.name);
      
      setPokemonTypeList(typeList);
    } catch (err) {
      console.error('Unable to get pokemon type list: ', err);
    }
  }



  useEffect(() => {
    getPokemonTypeList();
  }, []);



  return (
    <AppContext.Provider value={{ pokemonTypeList, setPokemonTypeList }}>
      {children}
    </AppContext.Provider>
  );
};



export { AppContextProvider, useAppContext };

