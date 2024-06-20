import type { Pokemon } from '../../../../types/pokemon';

import { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/solid';



type VersionT = {

};



/**
 * Component that displays the description of a pokemon.
 */
const Version: React.FC<VersionT> = ({  }) => {
  const [selectedVersion, setSelectedVersion] = useState<number>(0);



  return (
    <div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et accusamus rem incidunt excepturi aliquid esse molestiae ducimus iusto, neque quis dicta deserunt eligendi at repellat amet ipsam cum quo sint ratione nisi?</p>

      <div className='mt-2 md:mt-4 flex items-center gap-2'>
        <label>Versions: </label>
        <InformationCircleIcon className='size-8 text-blue-600' />
      </div>
    </div>
  );
};



export { Version };

