import type { Pokemon } from '../../../../types/pokemon';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { useAppContext } from '../../../../contexts/AppContext';
import { getPokemonOverviewData } from '../../../../utils/getPokemonOverviewData';
import { getTypeAndWeaknessStyle } from '../../../../utils/getTypeAndWeaknessStyle';
import { toProperCase } from '../../../../utils/toProperCase';
import { convertNationalNumberToHashTagString } from '../../../../utils/convertNationalNumberToHashTagString';
import { sortPokemonList } from './utils/sortPokemonList';



/**
 * Component that list the all or filtered pokemons infinitely.
 */
const List = () => {
  const navigate = useNavigate();
  const loader = useRef<HTMLDivElement>(null);

  const {
    pokemonList,
    setPokemonList,
    pokemonListNextFetchURL,
    setPokemonListNextFetchURL,
    pokemonListSortOption,
    isPokemonListAdditionHalted
  } = useAppContext();

  const [isAddingPokemonList, setIsAddingPokemonList] = useState<boolean>(false);



  useEffect(() => {
    addPokemonList();
  }, []);

  useEffect(() => {
    const sortedPokemonList = sortPokemonList(pokemonList ?? [], pokemonListSortOption);
    setPokemonList(sortedPokemonList);
  }, [pokemonListSortOption]);

  /**
   * This useEffect will add more pokemon to the pokemon list if the user has scrolled to the bottom of the page.
   */
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !isAddingPokemonList) addPokemonList(); 
    }, {
      threshold: 1.0
    });

    if (loader.current) observer.observe(loader.current);

    return () => {
      if (loader.current) observer.unobserve(loader.current);
    }
  }, [isAddingPokemonList]);



  /**
   * Adds more pokemon to pokemon list and updates the pokemon list fetch URL.
   * 
   * Will fetch the pokemon names first, then using the fetched names, it'll fetch the overview data.
   */
  async function addPokemonList() {
    try {
      setIsAddingPokemonList(true);

      const newPokemonNameList: Pokemon['name'][] = await getPokemonNameList();
      const newPokemonList: Pokemon[] = await getPokemonListOverviewData(newPokemonNameList);
      const sortedPokemonList = sortPokemonList([...pokemonList ?? [], ...newPokemonList], pokemonListSortOption);

      setPokemonList(sortedPokemonList);
    } catch (err) {
      console.error('Unable to add new pokemon in list: ', err);
    } finally {
      setIsAddingPokemonList(false);
    }
  }

  /**
   * Will get the pokemon name list.
   * 
   * Will also updates the `next` and `previous` API URL of pokemon name lists.
   */
  async function getPokemonNameList(): Promise<Pokemon['name'][]> {
    try {
      if (!pokemonListNextFetchURL) throw new Error('`pokemonListNextFetchURL.next` does not have a URL string.');

      const { data } = await axios.get(pokemonListNextFetchURL);
      
      const next = data.next;
      const nameList: Pokemon['name'][] = data.results.map((item: any) => item.name);

      setPokemonListNextFetchURL(next);
      return nameList;
    } catch (err) {
      console.error('Unable to get pokemon names: ', err);
      return [];
    }
  }

  /**
   * Will get the pokemon list overview data based on the pokemon name.
   * 
   * Will fetch the pokemon list first, then filter for any null values, then update the pokemon list.
   */
  async function getPokemonListOverviewData(nameList: Pokemon['name'][]): Promise<Pokemon[]> {
    try {
      const fetchedPokemonList = await Promise.all(nameList.map(async (name) => {
        const pokemon = await getPokemonOverviewData(name);

        if (!pokemon) return null;

        return pokemon;
      }));

      const filteredPokemonList = fetchedPokemonList.filter(pokemon => pokemon !== null) as Pokemon[];

      return filteredPokemonList;
    } catch (err) {
      console.error('Unable to get pokemon list overview data: ', err);
      return [];
    }
  }



  return (
    <div id='home-list' className='mt-8 mb-16 px-8 md:px-16'>
      {!pokemonList ? (
        <div>Loading ...</div>
      ) : (pokemonList.length === 0) ? (
        <div>Empty</div>
      ) : (
        <>
          <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-8 md:gap-y-16'>
            {pokemonList.map((pokemon) => (
              <Link
                key={pokemon.nationalNumber}
                className='flex flex-col duration-100 hover:scale-105 hover:cursor-pointer'
                to={`/${pokemon.name}`}
              >
                <img
                  className='flex-1 p-4 md:p-8 bg-neutral-500 bg-opacity-25 w-full rounded-md text'
                  src={pokemon.imageList[0]}
                  alt={pokemon.name}
                />
                
                <div className='px-2 md:px-4'>
                  <p className='text-left text-neutral-800 text-sm md:text-base'>{convertNationalNumberToHashTagString(pokemon.nationalNumber)}</p>
                  <p className='text-left font-bold text-xl md:text-2xl'>{toProperCase(pokemon.name)}</p>
                  <div className='grid grid-cols-2 gap-1'>
                    {pokemon.typeList.map((type, index) => (
                      <div
                        key={index}
                        className='text-xs md:text-sm text-center rounded'
                        style={getTypeAndWeaknessStyle(type)}
                      >
                        {toProperCase(type)}
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {isAddingPokemonList && <div className='my-16 text-center'>Loading more pokemons ...</div>}
          
          {/* this element serves as a 'detector'. when the app sees this element, it'll fetch more pokemon data to be added into the list. */}
          {/* if the addition is halted, this element will be hidden so app won't detect this element and auto add pokemon list. */}
          {!isPokemonListAdditionHalted && <div ref={loader} />}
        </>
      )}
    </div>
  );
};



export { List };

