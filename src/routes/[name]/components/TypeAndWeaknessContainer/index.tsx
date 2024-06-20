import type { Pokemon } from '../../../../types/pokemon';

import { getTypeAndWeaknessStyle } from '../../../../utils/getTypeAndWeaknessStyle';
import { toProperCase } from '../../../../utils/toProperCase';



type TypeAndWeaknessContainerT = {
  title: string;
  typeList: Pokemon['typeList'];
};



/**
 * Component that displays the type/weaknesses of a pokemon.
 */
const TypeAndWeaknessContainer: React.FC<TypeAndWeaknessContainerT> = ({ title, typeList }) => {
  return (
    <div>
      <h2>{title}</h2>

      <div className='mt-2 md:mt-4 grid grid-cols-3 gap-2'>
        {typeList.map((type, index) => (
          <div
            key={index}
            className='text-sm md:text-base py-1 px-2 text-center rounded-md'
            style={getTypeAndWeaknessStyle(type)}
          >
            {toProperCase(type)}
          </div>
        ))}
      </div>
    </div>
  );
};



export { TypeAndWeaknessContainer };

