import type { Pokemon } from '../../../../types/pokemon';

import { toProperCase } from '../../../../utils/toProperCase';



type DescriptionT = {
  height: Pokemon['height'];
  weight: Pokemon['weight'];
  // gender: Pokemon['gender'];
  // category: Pokemon['category'];
  abilityList: Pokemon['abilityList'];
};



/**
 * Component that displays the description of a pokemon.
 */
const Description: React.FC<DescriptionT> = ({
  height,
  weight,
  // gender,
  // category,
  abilityList
}) => {
  return (
    <div className='bg-blue-500 p-4 grid grid-cols-2 gap-2 rounded-lg bg-opacity-80'>
      <div>
        <h3 className='text-white'>Height</h3>
        <p className='font-bold'>{height}</p>
      </div>

      <div>
        <h3 className='text-white'>Weight</h3>
        <p className='font-bold'>{weight}</p>
      </div>

      <div>
        <h3 className='text-white'>Abilities</h3>
        <div>
          {abilityList.map((ability, index) => (
            <p key={index} className='font-bold'>{toProperCase(ability.name)}</p>
          ))}
        </div>
      </div>
    </div>
  );
};



export { Description };

