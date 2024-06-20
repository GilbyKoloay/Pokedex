import type { TypeAndWeakness as TypeAndWeaknessPropT } from '../../types/typeAndWeakness';

import { getTypeAndWeaknessStyle } from '../../../../../../utils/getTypeAndWeaknessStyle';



type TypeAndWeaknessT = {
  typeAndWeaknessList: TypeAndWeaknessPropT[];
  setTypeAndWeakness: React.Dispatch<React.SetStateAction<TypeAndWeaknessPropT[]>>;
  isFormLoading: boolean;
};



/**
 * Component that shows the filter of type and weakness of pokemon inside 'AdvancedSearch' component.
 */
const TypeAndWeakness: React.FC<TypeAndWeaknessT> = ({
  typeAndWeaknessList,
  setTypeAndWeakness,
  isFormLoading
}) => {
  /**
   * Will change the state of 'type and weakness' item inside 'type and weakness list'.
   * 
   * @param toggleType insert 't' for type. insert 'w' for weakness.
   * @param name name of 'type and weakness'.
   */
  function handleTypeOrWeaknessOnPress(toggleType: 't' | 'w', name: TypeAndWeaknessPropT['name']) {
    setTypeAndWeakness(typeAndWeaknessList.map(typeAndWeakness => {
      if (typeAndWeakness.name !== name) return typeAndWeakness;

      if (toggleType === 't') return {...typeAndWeakness, typeToggle: !typeAndWeakness.typeToggle};
      return {...typeAndWeakness, weaknessToggle: !typeAndWeakness.weaknessToggle};
    }));
  }



  return (
    <div>
      <div className='flex flex-col xl:flex-row xl:justify-between xl:items-center gap-2'>
        {/* <h1>Type & Weakness</h1> */}
        <h1>Type</h1>
        <div className='flex gap-2 xl:gap-4'>
          <span>T = Type</span>
          {/* <span>W = Weakness</span> */}
        </div>
      </div>
      
      <div className='mt-2 md:mt-4'>
        {!typeAndWeaknessList ? (
          <div>Loading ...</div>
        ) : (
          <div className='grid grid-cols-2 gap-y-2 gap-x-8'>
            {typeAndWeaknessList.map((typeAndWeakness, index) => (
              <div key={index} className='flex items-center gap-2 md:gap-4'>
                <div className='flex-1 text-center rounded-md border-2 border-neutral-400 min-w-16 max-w-32' style={getTypeAndWeaknessStyle(typeAndWeakness.name)}>{typeAndWeakness.name}</div>
                <button
                  className={`${typeAndWeakness.typeToggle ? 'bg-blue-400' : 'bg-neutral-100'} rounded-full size-8 text-black font-bold`}
                  onClick={() => handleTypeOrWeaknessOnPress('t', typeAndWeakness.name)}
                  type='button'
                  disabled={isFormLoading}
                >
                  T
                </button>
                {/* <button
                  className={`${typeAndWeakness.weaknessToggle ? 'bg-blue-400' : 'bg-neutral-100'} rounded-full size-8 text-black font-bold`}
                  onClick={() => handleTypeOrWeaknessOnPress('w', typeAndWeakness.name)}
                  type='button'
                  disabled={isFormLoading}
                >
                  W
                </button> */}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



export { TypeAndWeakness };

