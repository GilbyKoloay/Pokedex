import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

import { useAppContext } from '../../../../contexts/AppContext';
import { getPokemonOverviewData } from '../../../../utils/getPokemonOverviewData';



/**
 * Component that provides text input to search a pokemon using its name or number.
 */
const Search = () => {
  const { setPokemonList, setIsPokemonListAdditionHalted } = useAppContext();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);



  /**
   * Handle the form when it's submitted.
   * 
   * Will fetch the searched pokemon and hold the automation pokemon list addition.
   */
  async function handleFormOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsFormLoading(true);
      setPokemonList(null);

      const pokemon = await getPokemonOverviewData(searchQuery);
      
      setIsPokemonListAdditionHalted(true);

      if (!pokemon) setPokemonList([]);
      else setPokemonList([pokemon]);

      window.location.hash = '#home-list';
    } catch (err) {
      console.error('Unable to get pokemon using its name or number: ', err);
    } finally {
      setIsFormLoading(false);
    }
  }



  return (
    <div className='mt-4 bg-neutral-800 -mx-4 p-4 md:p-8 text-white flex flex-col md:flex-row gap-4'>
      {/* search */}
      <div className='flex-1 flex flex-col gap-2'>
        <h1>Name or Number</h1>
        <form className='flex gap-4' onSubmit={handleFormOnSubmit}>
          <input
            className='min-w-0 text-black flex-1 p-2 border-2 border-neutral-500 rounded-md focus:-outline-offset-2'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            disabled={isFormLoading}
          />
          <button
            className='bg-orange-600 rounded-md p-4 flex justify-center items-center hover:bg-orange-800 transition duration-150'
            type='submit'
            disabled={isFormLoading}
          >
            {isFormLoading ? (
              <ArrowPathIcon className='size-5 animate-spin' />
            ) : (
              <MagnifyingGlassIcon className='size-5' />
            )}
          </button>
        </form>
        <p className='text-center md:text-start'>Use the Advanced Search to explore Pokémon by type, weakness, ability, and more!</p>
      </div>

      {/* info */}
      <div className='flex-1 flex items-center'>
        <p className='bg-green-600 p-2 md:p-4 rounded-md flex-1 text-center md:text-start'>Search for a Pokémon by name or using its National Pokédex number.</p>
      </div>
    </div>
  );
};



export { Search };

