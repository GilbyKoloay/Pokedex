import type { PokemonTypeNameList } from '../types/pokemonTypeNameList';

import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';



type AppContextT = {
  pokemonTypeNameList: PokemonTypeNameList,
  setPokemonTypeNameList: (pokemonTypeNameList: PokemonTypeNameList) => void;
  pokemonCount: number;
  setPokemonCount: (pokemonCount: number) => void;
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
  const [pokemonTypeNameList, setPokemonTypeNameList] = useState<PokemonTypeNameList>(null);
  const [pokemonCount, setPokemonCount] = useState<number>(0);



  useEffect(() => {
    getPokemonTypeList();
    getPokemonCount();
  }, []);



  /**
   * Get all pokemon type name.
   * 
   * Will fetch the total of pokemon type and save the `count`, then will re-fetch but applying `count` as the limit, then save all pokemon type name in the state.
   */
  async function getPokemonTypeList() {
    try {
      const countRes = await axios.get(`${process.env.REACT_APP_API_URL}/type`);
      const count = countRes.data.count;

      const res = await axios.get(`${process.env.REACT_APP_API_URL}/type?limit=${count}`);
      const typeNameList = res.data.results.map((type: any) => type.name);
      
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



  return (
    <AppContext.Provider value={{
      pokemonTypeNameList, setPokemonTypeNameList,
      pokemonCount, setPokemonCount
      }}>
      {children}
    </AppContext.Provider>
  );
};



export { AppContextProvider, useAppContext };

