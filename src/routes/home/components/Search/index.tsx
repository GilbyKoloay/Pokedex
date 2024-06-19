import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';



/**
 * Component that provides text input to search a pokemon using its name or number.
 */
const Search = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');



  return (
    <div className='mt-4 bg-neutral-800 -mx-4 p-4 md:p-6 lg:p-8 xl:p-10 text-white flex flex-col lg:flex-row gap-4 md:gap-6 lg:gap-8 xl:gap-10'>
      {/* search */}
      <div className='flex-1 flex flex-col gap-2'>
        <label htmlFor='search-query' className='font-title text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Name or Number</label>
        <div className='md:text-lg lg:text-xl xl:text-2xl flex gap-4'>
          <input
            id='search-query'
            className='min-w-0 text-black flex-1 p-2 border-2 border-neutral-500 rounded-md focus:-outline-offset-2'
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <button className='bg-orange-600 rounded-md p-4 flex justify-center items-center hover:bg-orange-800 transition duration-150'>
            <MagnifyingGlassIcon className='size-5' />
          </button>
        </div>
        <p className='text-xs md:text-sm lg:text-base xl:text-lg text-center lg:text-start'>Use the Advanced Search to explore Pokémon by type, weakness, ability, and more!</p>
      </div>

      {/* info */}
      <div className='flex-1 flex items-center'>
        <p className='bg-green-600 p-2 lg:p-4 rounded-md flex-1 text-lg md:text-xl lg:text-2xl xl:text-3xl text-center lg:text-start'>Search for a Pokémon by name or using its National Pokédex number.</p>
      </div>
    </div>
  );
};



export { Search };

