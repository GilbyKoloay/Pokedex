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
    <div className='bg-neutral-400 p-4 rounded-md'>
      <h3>Stats</h3>

      <div className='mt-2 grid grid-cols-3 lg:grid-cols-6 gap-2'>
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

