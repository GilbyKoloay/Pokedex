import type { Pokemon } from '../../../../types/pokemon';

import { convertNationalNumberToHashTagString } from '../../../../utils/convertNationalNumberToHashTagString';
import { toProperCase } from '../../../../utils/toProperCase';



type HeaderT = {
  name: Pokemon['name'];
  nationalNumber: Pokemon['nationalNumber'];
};



/**
 * Component that shows the title of the page and provides navigation to the previous/next pokemon.
 */
const Header: React.FC<HeaderT> = ({ name, nationalNumber }) => {
  return (
    <header>
      <div className='flex gap-2 justify-center'>
        <h1 className='font-bold'>{toProperCase(name)}</h1>
        <h1 className='font-bold text-neutral-400'>{convertNationalNumberToHashTagString(nationalNumber)}</h1>
      </div>
    </header>
  );
};



export { Header };

