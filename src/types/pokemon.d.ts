type Gender = 'Male' | 'female';

type Pokemon = {
  name: string;
  nationalNumber: number;
  abilityList: {
    name: string;
    url: string;
    description: string;
  }[];
  height: number;
  weight: number;
  imageList: string[];
  stats: {
    hp: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
    speed: number;
  };
  typeList: string[];

  // is temporarily unused (couldn't find where to find the value in the API)
  // versionList?: {
  //   description: string;
  // }[];
  // genderList?: Gender[];
  // category?: string;
  // weaknessList?: string[];
  // evolutionList?: Pokemon[];

  isDetailedInfoFetched: boolean; // app will use this variable to decide whether it should fetch detailed info about this pokemon or not.
};



export { Pokemon };

