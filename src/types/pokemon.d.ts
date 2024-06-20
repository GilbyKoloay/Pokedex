type Gender = 'Male' | 'female';

type Pokemon = {
  name: string;

  // overview data
  nationalNumber: number;
  typeList: string[];
  imageList: string[];

  // detailed data
  versionList?: {
    description: string;
  }[];
  height?: string;
  weight?: string;
  genderList?: Gender[];
  category?: string;
  abilityList?: {
    name: string;
    description: string;
  }[];
  weaknessList?: string[];
  stats?: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  evolutionList?: Pokemon[];
};



export { Pokemon };

