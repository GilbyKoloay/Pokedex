import type { PokemonListSortOption } from '../../../../types/pokemonListSortOption';


import { Select } from '../../../../components/select';
import { useAppContext } from '../../../../contexts/AppContext';



const options: PokemonListSortOption[] = [
  'Lowest Number (First)',
  'Highest Number (First)',
  'A-Z',
  'Z-A'
];



/**
 * Component that provides basic filter (using sort) and show the filtered pokemons in the list.
 * 
 * Also provides an option to show random pokemons.
 */
const Filter = () => {
  const { pokemonListSortOption, setPokemonListSortOption } = useAppContext();


  
  return (
    <div className='mt-8 flex flex-col md:flex-row gap-2 md:gap-4 md:justify-end'>
      <h2 className='font-bold'>Sort By</h2>

      <Select
        value={pokemonListSortOption}
        onChange={value => setPokemonListSortOption(value as PokemonListSortOption)}
        options={options.map(option => ({ value: option, label: option}))}
      />
    </div>
  );
};



export { Filter };

