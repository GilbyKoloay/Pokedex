import { useAppContext } from '../../../../../../contexts/AppContext';



type NumberRangeT = {
  minRange: number;
  setMinRange: React.Dispatch<React.SetStateAction<number>>;
  maxRange: number;
  setMaxRange: React.Dispatch<React.SetStateAction<number>>;
}



/**
 * Component that shows the filter of number range inside 'AdvancedSearch' component.
 */
const NumberRange: React.FC<NumberRangeT> = ({ minRange, setMinRange, maxRange, setMaxRange }) => {
  const { pokemonCount } = useAppContext();



  return (
    <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
      <h1>Number Range</h1>
      <div className='flex gap-4'>
        <input className='text-black p-2 min-w-0 max-w-16 rounded-sm focus:-outline-offset-2'
        value={minRange}
        onChange={e => setMinRange(isNaN(parseInt(e.target.value)) ? minRange : parseInt(e.target.value))}
        type='number'
        min={1}
        max={maxRange}
      />
        <div>-</div>
        <input className='text-black p-2 min-w-0 max-w-16 rounded-sm focus:-outline-offset-2'
        value={maxRange}
        onChange={e => setMaxRange(isNaN(parseInt(e.target.value)) ? minRange : parseInt(e.target.value))}
        type='number'
        min={minRange}
        max={pokemonCount}
      />
      </div>
    </div>
  );
};



export { NumberRange };

