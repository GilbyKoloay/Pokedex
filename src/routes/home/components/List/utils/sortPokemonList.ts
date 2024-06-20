import type { Pokemon } from '../../../../../types/pokemon';
import type { PokemonListSortOption } from '../../../../../types/pokemonListSortOption';



/**
 * Sort the pokemon list according to the selected filter in 'Filter' component.
 */
function sortPokemonList(list: Pokemon[], sortOption: PokemonListSortOption): Pokemon[] {
  const sortedList = [...list];
  
  if (sortOption === 'Lowest Number (First)') {
    sortedList.sort((a, b) => a.nationalNumber - b.nationalNumber);
  } else if (sortOption === 'Highest Number (First)') {
    sortedList.sort((a, b) => b.nationalNumber - a.nationalNumber);
  } else if (sortOption === 'A-Z') {
    sortedList.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'Z-A') {
    sortedList.sort((a, b) => b.name.localeCompare(a.name));
  }

  return sortedList;
}



export { sortPokemonList };

