import { Pokemon } from '../types/pokemon';



/**
 * Will convert the pokemon's national number to hashtag string.
 * 
 * @param nationalNumber pokemon's national number.
 * @returns hashtag string of pokemon's national number.
 */
function convertNationalNumberToHashTagString(nationalNumber: Pokemon['nationalNumber']): string {
  const fourDigitNumberInString = ('000' + nationalNumber).slice(-4);
  
  return `#${fourDigitNumberInString}`;
}



export { convertNationalNumberToHashTagString };

