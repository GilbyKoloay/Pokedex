import type { Pokemon } from '../../../../types/pokemon';
import type { PokemonHeight } from '../../../../types/pokemonHeight';
import type { PokemonWeight } from '../../../../types/pokemonWeight';
import type { TypeAndWeakness as TypeAndWeaknessT } from './types/typeAndWeakness';

import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/solid';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { useAppContext } from '../../../../contexts/AppContext';
import { getPokemonOverviewData } from '../../../../utils/getPokemonOverviewData';
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
  const { pokemonTypeNameList, pokemonCount, setPokemonList, setIsPokemonListAdditionHalted } = useAppContext();

  const [isAdvancedSearchShown, setIsAdvancedSearchShown] = useState<boolean>(false);
  const [typeAndWeakness, setTypeAndWeakness] = useState<TypeAndWeaknessT[]>([]);
  const [selectedNumRangeMin, setSelectedNumRangeMin] = useState<number>(0);
  const [selectedNumRangeMax, setSelectedNumRangeMax] = useState<number>(0);
  const [selectedAbility, setSelectedAbility] = useState<string>('All');
  const [selectedHeights, setSelectedHeights] = useState<PokemonHeight[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<PokemonWeight[]>([]);
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);



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
   * Will fetch all pokemon data with `limit` and `offset` taken from number range,
   * filter them,
   * replace them in `pokemonList` value inside app context,
   * and then halt the auto addition of pokemon list.
   */
  async function handleFormOnSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      setIsFormLoading(true);
      setPokemonList(null);

      const fetchedPokemonList = await getPokemonList();
      const filteredPokemonList = filterPokemonList(fetchedPokemonList);
      
      setPokemonList(filteredPokemonList);
      setIsPokemonListAdditionHalted(true);

      window.location.hash = '#home-list';
    } catch (err) {
      console.error('Unable to filter pokemon list: ', err);
    } finally {
      setIsFormLoading(false);
    }
  }

  /**
   * Will get the pokemon list.
   * 
   * Will get the name first, then get all the overview data.
   */
  async function getPokemonList(): Promise<Pokemon[]> {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon?limit=${(selectedNumRangeMax-selectedNumRangeMin)+1}&offset=${selectedNumRangeMin-1}`);
      
      const fetchedPokemonNameList: Pokemon['name'][] = data.results.map((result: any) => result.name);

      const fetchedPokemonList = await Promise.all(fetchedPokemonNameList.map(async (name) => {
        const pokemon = await getPokemonOverviewData(name);

        if (!pokemon) return null;

        return pokemon;
      }));

      const filteredPokemonList = fetchedPokemonList.filter(pokemon => pokemon !== null) as Pokemon[];

      return filteredPokemonList;
    } catch (err) {
      console.error('Unable to get pokemon list: ', err);
      return [];
    }
  }

  /**
   * Will filter the pokemon list based on the applied filter states.
   */
  function filterPokemonList(list: Pokemon[]): Pokemon[] {
    const filteredTypeAndWeakness = filterTypeAndWeakness(list);
    const filteredAbility = filterAbility(filteredTypeAndWeakness);
    const filteredHeight = filterHeight(filteredAbility);
    const filteredWeight = filterWeight(filteredHeight);
    
    return filteredWeight;
  }

  /**
   * Filter pokemon list based on its type and weakness.
   */
  function filterTypeAndWeakness(list: Pokemon[]): Pokemon[] {
    const filteredList = list.filter(item =>
      item.typeList.some(type => {
        const typeWeakness = typeAndWeakness.find(t => t.name.toLowerCase() === type.toLowerCase());
        return typeWeakness ? typeWeakness.typeToggle : false;
      })
    );

    // const filteredList = list.filter(item =>
    //   item.typeList.some(type =>
    //     typeAndWeakness.some(t => t.name.toLowerCase() === type.toLowerCase() && t.typeToggle)
    //   )
    // );

    return filteredList;
  }

  /**
   * Filter pokemon list based on its ability.
   */
  function filterAbility(list: Pokemon[]): Pokemon[] {

    if (selectedAbility === 'All') return list;

    const filteredList = list.filter(item =>
      item.abilityList.some(ability =>
        ability.name.toLowerCase() === selectedAbility.toLowerCase()
      )
    );

    return filteredList;
  }

  /**
   * Filter pokemon list based on its height.
   */
  function filterHeight(list: Pokemon[]): Pokemon[] {
    if (
      selectedHeights.length === 0 ||
      selectedHeights.length === 3
    ) return list;

    const shortHeightList = selectedHeights.includes('short') ? list.filter(item => item.height <= 20) : [];
    const mediumHeightList = selectedHeights.includes('medium') ? list.filter(item => (item.height > 20) && (item.height <= 25)) : [];
    const tallHeightList = selectedHeights.includes('tall') ? list.filter(item => item.height > 25) : [];

    return [...shortHeightList, ...mediumHeightList, ...tallHeightList];
  }

  /**
   * Filter pokemon list based on its weight.
   */
  function filterWeight(list: Pokemon[]): Pokemon[] {
    if (
      selectedWeights.length === 0 ||
      selectedWeights.length === 3
    ) return list;

    const lightHeightList = selectedWeights.includes('light') ? list.filter(item => item.weight <= 100) : [];
    const mediumHeightList = selectedWeights.includes('medium') ? list.filter(item => (item.weight > 100) && (item.weight <= 1000)) : [];
    const heavyHeightList = selectedWeights.includes('heavy') ? list.filter(item => item.weight > 1000) : [];

    return [...lightHeightList, ...mediumHeightList, ...heavyHeightList];
  }

  /**
   * Handle the form when it's resetted.
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
            <TypeAndWeakness
              typeAndWeaknessList={typeAndWeakness}
              setTypeAndWeakness={setTypeAndWeakness}
              isFormLoading={isFormLoading}
            />
            <NumberRange
              selectedNumRangeMin={selectedNumRangeMin} setSelectedNumRangeMin={setSelectedNumRangeMin}
              selectedNumRangeMax={selectedNumRangeMax} setSelectedNumRangeMax={setSelectedNumRangeMax}
              isFormLoading={isFormLoading}
            />
          </div>
          <div className='flex-1 flex flex-col justify-between gap-8'>
            <div className='flex flex-col gap-8'>
              <Ability
                selectedAbility={selectedAbility}
                setSelectedAbility={setSelectedAbility}
                isFormLoading={isFormLoading}
              />
              <Height
                selectedOptions={selectedHeights}
                setSelectedOptions={setSelectedHeights}
                isFormLoading={isFormLoading}
              />
              <Weight
                selectedOptions={selectedWeights}
                setSelectedOptions={setSelectedWeights}
                isFormLoading={isFormLoading}
              />
            </div>
            <FormAction isFormLoading={isFormLoading} />
          </div>
        </div>
      </div>

      {/* visibility toggle button */}
      <div className='flex justify-center relative'>
        <button
          className='bg-neutral-600 py-1 px-16 -top-6 absolute rounded-bl-full rounded-br-full flex items-center gap-2'
          onClick={() => setIsAdvancedSearchShown(!isAdvancedSearchShown)}
          type='button'
          disabled={isFormLoading}
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

