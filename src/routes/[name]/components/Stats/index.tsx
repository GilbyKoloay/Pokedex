import type { Pokemon } from '../../../../types/pokemon';

import { Item } from './components/Item';



type StatsT = {
  stats: Pokemon['stats'];
};



/**
 * Component that displays the statstics of a pokemon.
 */
const Stats: React.FC<StatsT> = ({ stats }) => {
  return (
    <div className='bg-neutral-400 py-1 md:py-2 px-2 md:px-4 rounded-md'>
      <h3>Stats</h3>

      <div className='mt-2 md:mt-4 flex justify-between gap-2 md:gap-4'>
        <Item
          value={stats.hp}
          label='HP'
          borderColor='border-red-500'
          bgColor='bg-red-200'
        />
        <Item
          value={stats.attack}
          label='Attack'
          borderColor='border-yellow-500'
          bgColor='bg-yellow-200'
        />
        <Item
          value={stats.defense}
          label='Defense'
          borderColor='border-green-500'
          bgColor='bg-green-200'
        />
        <Item
          value={stats.attack}
          label='Special Attack'
          borderColor='border-cyan-500'
          bgColor='bg-cyan-200'
        />
        <Item
          value={stats.defense}
          label='Special Defense'
          borderColor='border-blue-500'
          bgColor='bg-blue-200'
        />
        <Item
          value={stats.defense}
          label='Speed'
          borderColor='border-purple-500'
          bgColor='bg-purple-200'
        />
      </div>
    </div>
  );
};



export { Stats };

