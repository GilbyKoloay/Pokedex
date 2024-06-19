import type { PokemonHeight } from '../../../../types/pokemonHeight';
import type { PokemonWeight } from '../../../../types/pokemonWeight';
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
  const { pokemonTypeNameList, pokemonCount } = useAppContext();

  const [isAdvancedSearchShown, setIsAdvancedSearchShown] = useState<boolean>(false);
  const [typeAndWeakness, setTypeAndWeakness] = useState<TypeAndWeaknessT[]>([]);
  const [selectedNumRangeMin, setSelectedNumRangeMin] = useState<number>(0);
  const [selectedNumRangeMax, setSelectedNumRangeMax] = useState<number>(0);
  const [selectedAbility, setSelectedAbility] = useState<string>('All');
  const [selectedHeights, setSelectedHeights] = useState<PokemonHeight[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<PokemonWeight[]>([]);



  useEffect(() => {
    setTypeAndWeaknessDefaultValue();
  }, [pokemonTypeNameList]);



  /**
   * Will set the 'type and weakness' filter default state if pokemon type name list is fetched from API.
   */
  function setTypeAndWeaknessDefaultValue() {
    if (!pokemonTypeNameList) return;

    setTypeAndWeakness(pokemonTypeNameList.map((name: string) => ({
      name,
      typeToggle: false,
      weaknessToggle: false
    })));
  }

  /**
   * Handle the form when it's submitted.
   * 
   * Will fetch the pokemon list based on filter states.
   */
  async function handleFormOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  /**
   * Handle the form when it's submitted.
   * 
   * Will reset the filter states to their default value.
   */
  async function handleFormOnReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setTypeAndWeaknessDefaultValue();
    if (pokemonCount) {
      setSelectedNumRangeMin(1);
      setSelectedNumRangeMax(pokemonCount);
    } else {
      setSelectedNumRangeMin(0);
      setSelectedNumRangeMax(0);
    }
    setSelectedAbility('All');
    setSelectedHeights([]);
    setSelectedWeights([]);
  }



  return (
    <form 
      className='bg-neutral-600 -mx-4 text-white pt-2'
      onSubmit={handleFormOnSubmit}
      onReset={handleFormOnReset}
    >
      {/* advanced search filters */}
      <div className={isAdvancedSearchShown ? 'h-auto' : 'h-4'}>
        <div className={`${isAdvancedSearchShown ? 'block' : 'hidden'} mb-4 py-4 px-8 md:py-8 md:px-16 flex flex-col lg:flex-row gap-8 lg:gap-16`}>
          <div className='flex-1 flex flex-col gap-8'>
            <TypeAndWeakness typeAndWeaknessList={typeAndWeakness} setTypeAndWeakness={setTypeAndWeakness} />
            <NumberRange
              selectedNumRangeMin={selectedNumRangeMin} setSelectedNumRangeMin={setSelectedNumRangeMin}
              selectedNumRangeMax={selectedNumRangeMax} setSelectedNumRangeMax={setSelectedNumRangeMax}
            />
          </div>
          <div className='flex-1 flex flex-col justify-between gap-8'>
            <div className='flex flex-col gap-8'>
              <Ability selectedAbility={selectedAbility} setSelectedAbility={setSelectedAbility} />
              <Height selectedOptions={selectedHeights} setSelectedOptions={setSelectedHeights} />
              <Weight selectedOptions={selectedWeights} setSelectedOptions={setSelectedWeights} />
            </div>
            <FormAction />
          </div>
        </div>
      </div>

      {/* visibility toggle button */}
      <div className='flex justify-center relative'>
        <button
          className='bg-neutral-600 py-1 px-16 -top-6 absolute rounded-bl-full rounded-br-full flex items-center gap-2'
          onClick={() => setIsAdvancedSearchShown(!isAdvancedSearchShown)}
          type='button'
        >
          <span>Show Advanced Search</span>
          <div className='bg-neutral-100 rounded-full p-1 justify-center items-center'>
            {isAdvancedSearchShown ? <ChevronUpIcon className='size-4 text-black' /> : <ChevronDownIcon className='size-4 text-black' />}
          </div>
        </button>
      </div>
    </form>
  );
};



export { AdvancedSearch };

