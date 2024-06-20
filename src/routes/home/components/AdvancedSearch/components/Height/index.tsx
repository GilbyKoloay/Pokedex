import type { PokemonHeight } from '../../../../../../types/pokemonHeight';

import {
  heightMediumActive,
  heightMediumInactive,
  heightShortActive,
  heightShortInactive,
  heightTallActive,
  heightTallInactive
} from '../../../../../../assets/images';



type Option = {
  name: PokemonHeight;
  inactiveImgSrc: string;
  activeImgSrc: string;
  imgAlt: string;
};

type HeightT = {
  selectedOptions: PokemonHeight[],
  setSelectedOptions: React.Dispatch<React.SetStateAction<PokemonHeight[]>>;
  isFormLoading: boolean;
};



const options: Option[] = [
  { name: 'short', inactiveImgSrc: heightShortInactive, activeImgSrc: heightShortActive, imgAlt: 'short height' },
  { name: 'medium', inactiveImgSrc: heightMediumInactive, activeImgSrc: heightMediumActive, imgAlt: 'medium height' },
  { name: 'tall', inactiveImgSrc: heightTallInactive, activeImgSrc: heightTallActive, imgAlt: 'tall height' }
];



/**
 * Component that shows the filter of height of pokemon inside 'AdvancedSearch' component.
 */
const Height: React.FC<HeightT> = ({
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
  function handleOptionOnClick(optionName: PokemonHeight) {
    if (selectedOptions.includes(optionName)) {
      setSelectedOptions(selectedOptions.filter(option => option !== optionName));
    } else {
      setSelectedOptions([...selectedOptions, optionName]);
    }
  }



  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <h1>Height</h1>
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



export { Height };

