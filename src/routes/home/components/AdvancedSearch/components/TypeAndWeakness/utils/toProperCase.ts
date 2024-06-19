/**
 * Will convert any string into proper string.
 * 
 * @param string that will be converted to proper string.
 * @returns proper string.
 */
function toProperCase(string: string) {
  return string.toLowerCase().replace(/(?:^|\s)\w/g, match => {
    return match.toUpperCase();
  });
}



export { toProperCase };

