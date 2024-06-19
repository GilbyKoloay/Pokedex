import { useAppContext } from '../../../../../../contexts/AppContext';



type AbilityT = {
  selectedAbility: string;
  setSelectedAbility: React.Dispatch<React.SetStateAction<string>>;
};



/**
 * Component that shows the filter of ability inside 'AdvancedSearch' component.
 */
const Ability: React.FC<AbilityT> = ({ selectedAbility, setSelectedAbility }) => {
  const { pokemonAbilityNameList } = useAppContext();



  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <h1>Ability</h1>
      {!pokemonAbilityNameList ? (
        <div>Loading ...</div>
      ) : (
        <select
          className='bg-neutral-800 py-1 md:py-2 px-2 md:px-4 rounded-md hover:cursor-pointer'
          value={selectedAbility}
          onChange={e => setSelectedAbility(e.target.value)}
        >
          <option value='All'>All</option>
          {pokemonAbilityNameList.map((abilityName, index) => (
            <option key={index} value={abilityName}>{abilityName}</option>
          ))}
        </select>
      )}
    </div>
  );
};



export { Ability };

