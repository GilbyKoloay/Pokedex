import type { Pokemon } from '../../types/pokemon';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAppContext } from '../../contexts/AppContext';
import { convertNationalNumberToHashTagString } from '../../utils/convertNationalNumberToHashTagString';
import { getPokemonOverviewData } from '../../utils/getPokemonOverviewData';
import { toProperCase } from '../../utils/toProperCase';
import { Description } from './components/Description';
import { Evolution } from './components/Evolution';
import { Gallery } from './components/Gallery';
import { Header } from './components/Header';
import { NotFound } from './components/NotFound';
import { Stats } from './components/Stats';
import { TypeAndWeaknessContainer } from './components/TypeAndWeaknessContainer';
import { Version } from './components/Version';



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
    <main id='name' className='pb-16'>
      {(!isPokemonDoesNotExist && !pokemon) ? (
        <div>Loading ...</div>
      ) : isPokemonDoesNotExist ? (
        <NotFound />
      ) : (pokemon) && (
        <div className='flex flex-col gap-4 md:gap-8 p-2 md:p-4'>
          <Header name={pokemon.name} nationalNumber={pokemon.nationalNumber} />
          <div className='flex flex-col md:flex-row gap-4 md:gap-8'>
            <div className='flex-1 flex flex-col gap-4 md:gap-8'>
              <Gallery imageList={pokemon.imageList} imageAlt={pokemon.name} />
              <Stats stats={pokemon.stats} />
            </div>
            <div className='flex-1 flex flex-col gap-4 md:gap-8'>
              {/* <Version /> */}
              <Description
                height={pokemon.height}
                weight={pokemon.weight}
                abilityList={pokemon.abilityList}
              />
              <TypeAndWeaknessContainer title='Types' typeList={pokemon.typeList} />
              {/* <TypeAndWeaknessContainer title='Weaknesses' typeList={} /> */}
            </div>
          </div>
          {/* <Evolution /> */}
        </div>
      )}
    </main>
  );
};



export { Name };

