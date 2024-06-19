import type { TypeAndWeakness as TypeAndWeaknessT } from './types/typeAndWeakness';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';

import { useAppContext } from '../../../../contexts/AppContext';
import { Ability } from './components/Ability';
import { FormAction } from './components/FormAction';
import { Height } from './components/Height';
import { NumberRange } from './components/NumberRange';
import { TypeAndWeakness } from './components/TypeAndWeakness';
import { Weight } from './components/Weight';



/**
 * Component that provides advanced search and show the filtered pokemons in the list.
 */
const AdvancedSearch = () => {
  const { pokemonTypeList } = useAppContext();

  const [isAdvancedSearchShown, setIsAdvancedSearchShown] = useState<boolean>(true);
  const [typeAndWeakness, setTypeAndWeakness] = useState<TypeAndWeaknessT[]>([]);
  const [numberRangeMin, setNumberRangeMin] = useState<number>(1);
  const [numberRangeMax, setNumberRangeMax] = useState<number>(1025);
  const [ability, setAbility] = useState<string>('All');
  const [height, setHeight] = useState<string | null>(null);
  const [weight, setWeight] = useState<string | null>(null);



  useEffect(() => {
    setTypeDefaultValue();
  }, [pokemonTypeList]);



  /**
   * Will set the 'type and weakness' filter state if pokemon type list is fetched from API.
   */
  async function setTypeDefaultValue() {
    if (!pokemonTypeList) return;

    setTypeAndWeakness(pokemonTypeList.map(type => ({
      name: type,
      typeToggle: false,
      weaknessToggle: false
    })));
  }



  return (
    <div className='bg-neutral-600 -mx-4 text-white pt-2'>
      {/* advanced search filters */}
      <div className={isAdvancedSearchShown ? 'h-auto' : 'h-4'}>
        <div className={`${isAdvancedSearchShown ? 'block' : 'hidden'} p-4 md:p-6 lg:p-8 xl:p-10`}>
          <div>
            <TypeAndWeakness typeAndWeaknessList={typeAndWeakness} setTypeAndWeakness={setTypeAndWeakness} />
            <NumberRange />
          </div>
          <div>
            <Ability />
            <Height />
            <Weight />
          </div>
          <FormAction />
        </div>
      </div>

      {/* visibility toggle button */}
      <div className='flex justify-center relative'>
        <button className='bg-neutral-600 py-1 px-16 -top-6 absolute rounded-bl-full rounded-br-full flex items-center gap-2' onClick={() => setIsAdvancedSearchShown(!isAdvancedSearchShown)}>
          <span>Show Advanced Search</span>
          <div className='bg-neutral-100 rounded-full p-1 justify-center items-center'>
            {isAdvancedSearchShown ? <ChevronUpIcon className='size-4 text-black' /> : <ChevronDownIcon className='size-4 text-black' />}
          </div>
        </button>
      </div>
    </div>
  );
};



export { AdvancedSearch };

