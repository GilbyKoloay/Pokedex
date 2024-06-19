import { Filter as FilterT } from './types/filter';

import { useState } from 'react';

import { Select } from '../../../../components/select';



const options: FilterT[] = [
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
  const [selectedFilter, setSelectedFilter] = useState<FilterT>('Lowest Number (First)');



  return (
    <div className='mt-8 flex flex-col md:flex-row gap-2 md:gap-4 md:justify-end'>
      <h2 className='font-bold'>Sort By</h2>

      <Select
        value={selectedFilter}
        onChange={value => setSelectedFilter(value as FilterT)}
        options={options.map(option => ({ value: option, label: option}))}
      />
    </div>
  );
};



export { Filter };

