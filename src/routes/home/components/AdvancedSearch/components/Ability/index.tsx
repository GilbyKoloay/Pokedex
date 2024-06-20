import { useAppContext } from '../../../../../../contexts/AppContext';
import { Select } from '../../../../../../components/select';



type AbilityT = {
  selectedAbility: string;
  setSelectedAbility: React.Dispatch<React.SetStateAction<string>>;
  isFormLoading: boolean;
};



/**
 * Component that shows the filter of ability inside 'AdvancedSearch' component.
 */
const Ability: React.FC<AbilityT> = ({
  selectedAbility,
  setSelectedAbility,
  isFormLoading
}) => {
  const { pokemonAbilityNameList } = useAppContext();



  return (
    <div className='flex flex-col gap-2 md:gap-4'>
      <h1>Ability</h1>
      {!pokemonAbilityNameList ? (
        <div>Loading ...</div>
      ) : (
        <Select
          value={selectedAbility}
          onChange={value => setSelectedAbility(value as string)}
          options={[
            { value: 'All', label: 'All' },
            ...pokemonAbilityNameList.map(abilityName => ({
              value: abilityName,
              label: abilityName
            }))
          ]}
          disabled={isFormLoading}
        />
      )}
    </div>
  );
};



export { Ability };

