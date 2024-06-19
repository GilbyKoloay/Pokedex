import type { TypeAndWeakness as TypeAndWeaknessPropT } from '../../types/typeAndWeakness';

import { getTypeAndWeaknessStyle } from './utils/getTypeAndWeaknessStyle';
import { toProperCase } from './utils/toProperCase';



type TypeAndWeaknessT = {
  typeAndWeaknessList: TypeAndWeaknessPropT[];
  setTypeAndWeakness: React.Dispatch<React.SetStateAction<TypeAndWeaknessPropT[]>>;
};



const TypeAndWeakness: React.FC<TypeAndWeaknessT> = ({ typeAndWeaknessList, setTypeAndWeakness }) => {
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
      <div className='flex flex-col lg:flex-row lg:justify-between lg:items-center gap-2'>
        <div className='font-title text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Type & Weakness</div>
        <div className='text-xs md:text-sm lg:text-base xl:text-lg flex gap-2 lg:gap-4'>
          <span>T = Type</span>
          <span>W = Weakness</span>
        </div>
      </div>
      
      <div className='mt-2 md:mt-4 lg:mt-6 xl:mt-8'>
        {!typeAndWeaknessList ? (
          <div className='text-lg md:text-xl lg:text-2xl xl:text-3xl'>Loading ...</div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-8'>
            {typeAndWeaknessList.map((typeAndWeakness, index) => (
              <div key={index} className='flex items-center gap-2 lg:gap-4'>
                <div className='flex-1 md:text-lg lg:text-xl xl:text-2xl text-center rounded-md border-2 border-neutral-400 max-w-auto sm:max-w-32' style={getTypeAndWeaknessStyle(typeAndWeakness.name)}>{toProperCase(typeAndWeakness.name)}</div>
                <button className={`${typeAndWeakness.typeToggle ? 'bg-blue-400' : 'bg-neutral-100'} rounded-full size-8 text-black font-bold`} onClick={() => handleTypeOrWeaknessOnPress('t', typeAndWeakness.name)}>T</button>
                <button className={`${typeAndWeakness.weaknessToggle ? 'bg-blue-400' : 'bg-neutral-100'} rounded-full size-8 text-black font-bold`} onClick={() => handleTypeOrWeaknessOnPress('w', typeAndWeakness.name)}>W</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};



export { TypeAndWeakness };

