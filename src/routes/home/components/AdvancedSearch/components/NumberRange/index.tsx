import { useEffect } from 'react';
import { useAppContext } from '../../../../../../contexts/AppContext';



type NumberRangeT = {
  selectedNumRangeMin: number;
  setSelectedNumRangeMin: React.Dispatch<React.SetStateAction<number>>;
  selectedNumRangeMax: number;
  setSelectedNumRangeMax: React.Dispatch<React.SetStateAction<number>>;
  isFormLoading: boolean;
}



/**
 * Component that shows the filter of number range inside 'AdvancedSearch' component.
 */
const NumberRange: React.FC<NumberRangeT> = ({
  selectedNumRangeMin,
  setSelectedNumRangeMin,
  selectedNumRangeMax,
  setSelectedNumRangeMax,
  isFormLoading
}) => {
  const { pokemonCount } = useAppContext();



  useEffect(() => {
    if (pokemonCount > 0) {
      setSelectedNumRangeMin(1);
      setSelectedNumRangeMax(pokemonCount);
    }
  }, [pokemonCount]);



  return (
    <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
      <h1>Number Range</h1>

      {!pokemonCount ? (
        <div>Loading ...</div>
      ) : (
        <div className='flex gap-4'>
          <input className='text-black p-2 min-w-0 max-w-24 rounded-sm focus:-outline-offset-2'
            value={selectedNumRangeMin}
            onChange={e => setSelectedNumRangeMin(isNaN(parseInt(e.target.value)) ? selectedNumRangeMin : parseInt(e.target.value))}
            type='number'
            min={0}
            max={selectedNumRangeMax}
            disabled={isFormLoading}
          />
          <div>-</div>
          <input className='text-black p-2 min-w-0 max-w-24 rounded-sm focus:-outline-offset-2'
            value={selectedNumRangeMax}
            onChange={e => setSelectedNumRangeMax(isNaN(parseInt(e.target.value)) ? selectedNumRangeMin : parseInt(e.target.value))}
            type='number'
            min={selectedNumRangeMin}
            max={pokemonCount}
            disabled={isFormLoading}
          />
        </div>
      )}
    </div>
  );
};



export { NumberRange };

