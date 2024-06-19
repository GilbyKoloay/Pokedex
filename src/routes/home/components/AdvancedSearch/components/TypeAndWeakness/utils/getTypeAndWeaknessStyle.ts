import type { TypeAndWeaknessStyle } from '../types/typeAndWeaknessStyle';



/**
 * Styles that will be used on the 'type and weakness' item.
 * 
 * Color taken from https://www.pokemon.com/us/pokedex.
 */
const typeAndWeaknessStyleList: Record<string, TypeAndWeaknessStyle> = {
  bug: {
    background: 'linear-gradient(to bottom, #729F3F 50%, #729F3F 50%)',
    color: 'white'
  },
  black: {
    background: 'linear-gradient(to bottom, #707070 50%, #707070 50%)',
    color: 'white'
  },
  dragon: {
    background: 'linear-gradient(to bottom, #53A4CF 50%, #F16E57 50%)',
    color: 'white'
  },
  electric: {
    background: 'linear-gradient(to bottom, #EED535 50%, #EED535 50%)',
    color: 'black'
  },
  fairy: {
    background: 'linear-gradient(to bottom, #FDB9E9 50%, #FDB9E9 50%)',
    color: 'black'
  },
  fighting: {
    background: 'linear-gradient(to bottom, #D56723 50%, #D56723 50%)',
    color: 'white'
  },
  fire: {
    background: 'linear-gradient(to bottom, #FD7D24 50%, #FD7D24 50%)',
    color: 'white'
  },
  flying: {
    background: 'linear-gradient(to bottom, #3DC7EF 50%, #BDB9B8 50%)',
    color: 'black'
  },
  ghost: {
    background: 'linear-gradient(to bottom, #7B62A3 50%, #7B62A3 50%)',
    color: 'white'
  },
  grass: {
    background: 'linear-gradient(to bottom, #9BCC50 50%, #9BCC50 50%)',
    color: 'black'
  },
  ground: {
    background: 'linear-gradient(to bottom, #F7DE3F 50%, #AB9842 50%)',
    color: 'black'
  },
  ice: {
    background: 'linear-gradient(to bottom, #51C4E7 50%, #51C4E7 50%)',
    color: 'black'
  },
  normal: {
    background: 'linear-gradient(to bottom, #A4ACAF 50%, #A4ACAF 50%)',
    color: 'black'
  },
  poison: {
    background: 'linear-gradient(to bottom, #B97FC9 50%, #B97FC9 50%)',
    color: 'white'
  },
  psychic: {
    background: 'linear-gradient(to bottom, #F366B9 50%, #F366B9 50%)',
    color: 'white'
  },
  rock: {
    background: 'linear-gradient(to bottom, #A38C21 50%, #A38C21 50%)',
    color: 'white'
  },
  steel: {
    background: 'linear-gradient(to bottom, #9EB7B8 50%, #9EB7B8 50%)',
    color: 'black'
  },
  water: {
    background: 'linear-gradient(to bottom, #4592C4 50%, #4592C4 50%)',
    color: 'white'
  }
};



/**
 * Will return the styling object that can be applied in `style` attribute.
 * 
 * If `name` in param is not found in the style list, this function will return a default value of `background: '#FFFFFF', color: 'black'`.
 * 
 * @param name of pokemon type.
 * @returns object containing `background` and `color` that can be applied in `style` attribute.
 */
function getTypeAndWeaknessStyle(name: string): TypeAndWeaknessStyle {
  const lowerCasedName = name.toLowerCase();

  if (!typeAndWeaknessStyleList.hasOwnProperty(lowerCasedName)) return {
    background: '#FFFFFF',
    color: 'black'
  }

  return typeAndWeaknessStyleList[lowerCasedName];
}



export { getTypeAndWeaknessStyle };

