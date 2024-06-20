import type { PokemonWeight } from '../../../../../../types/pokemonWeight';

import {
  weightHeavyActive,
  weightHeavyInactive,
  weightLightActive,
  weightLightInactive,
  weightMediumActive,
  weightMediumInactive
} from '../../../../../../assets/images';



type Option = {
  name: PokemonWeight;
  inactiveImgSrc: string;
  activeImgSrc: string;
  imgAlt: string;
};

type WeightT = {
  selectedOptions: PokemonWeight[],
  setSelectedOptions: React.Dispatch<React.SetStateAction<PokemonWeight[]>>;
  isFormLoading: boolean;
};



const options: Option[] = [
  { name: 'light', inactiveImgSrc: weightLightInactive, activeImgSrc: weightLightActive, imgAlt: 'light weight' },
  { name: 'medium', inactiveImgSrc: weightMediumInactive, activeImgSrc: weightMediumActive, imgAlt: 'medium weight' },
  { name: 'heavy', inactiveImgSrc: weightHeavyInactive, activeImgSrc: weightHeavyActive, imgAlt: 'heavy weight' }
];



/**
 * Component that shows the filter of weight of pokemon inside 'AdvancedSearch' component.
 */
const Weight: React.FC<WeightT> = ({
  selectedOptions,
  setSelectedOptions,
  isFormLoading
}) => {
  /**
   * Handles the logic when pressing an option.
   * 
   * If option exists in the array, it'll be removed.
   * If option does not exist, it'll be added.
   */
  function handleOptionOnClick(optionName: PokemonWeight) {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter(option => option !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  }



  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <h1>Weight</h1>
      <div className='flex gap-4 justify-between sm:justify-start lg:justify-between'>
        {options.map((option, index) => (
          <button
            key={index}
            type='button'
            onClick={() => handleOptionOnClick(option.name)}
            disabled={isFormLoading}
          >
            <img
              className='border-2 border-neutral-400 rounded-2xl'
              src={selectedOptions.includes(option.name) ? option.activeImgSrc : option.inactiveImgSrc}
              alt={option.imgAlt}
            />
          </button>
        ))}
      </div>
    </div>
  );
};



export { Weight };

