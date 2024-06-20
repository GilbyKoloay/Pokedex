import type { Pokemon } from '../types/pokemon';

import axios from 'axios';



/**
 * Will get the 'overview' data of a pokemon.
 * 
 * Overview data means data that is used to displaying/filtering pokemon. Detailed data will be taken when user route to [name] page (example /pikachu).
 */
async function getPokemonOverviewData(nationalNumberOrId: Pokemon['nationalNumber'] | Pokemon['name']): Promise<Pokemon | null> {
  try {
    const pokemonAPIData = await getPokemonData(nationalNumberOrId);

    const pokemon: Pokemon = {
      ...pokemonAPIData
    };
    
    return pokemon;
  } catch (err) {
    console.error('Unable to get pokemon data: ', err);
    return null;
  }
}



/**
 * Get the pokemon data from '/pokemon' endpoint.
 */
async function getPokemonData(nationalNumberOrId: Pokemon['nationalNumber'] | Pokemon['name']): Promise<Pokemon> {
  try {
    const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/pokemon/${nationalNumberOrId}`);

    if (!data) throw new Error();

    const pokemon: Pokemon = {
      nationalNumber: data.id,
      name: data.name,
      abilityList: data.abilities.map((ability: any) => ({
        name: ability.ability.name,
        url: ability.ability.url,
        description: null
      })) ?? [],
      height: data.height ?? null,
      weight: data.weight ?? null,
      imageList: [
        data.sprites.other.dream_world.front_default,
        data.sprites.other.home.front_default,
        data.sprites.other.home.front_female,
        data.sprites.other.home.front_shiny,
        data.sprites.other.home.front_shiny_female,
        data.sprites.other['official-artwork'].front_default,
        data.sprites.other['official-artwork'].front_shiny
      ].filter(image => image) ?? [],
      stats: {
        hp: data.stats.find((stat: any) => stat.stat.name === 'hp').base_stat,
        attack: data.stats.find((stat: any) => stat.stat.name === 'attack').base_stat,
        defense: data.stats.find((stat: any) => stat.stat.name === 'defense').base_stat,
        specialAttack: data.stats.find((stat: any) => stat.stat.name === 'special-attack').base_stat,
        specialDefense: data.stats.find((stat: any) => stat.stat.name === 'special-defense').base_stat,
        speed: data.stats.find((stat: any) => stat.stat.name === 'speed').base_stat
      },
      typeList: data.types.map((type: any) => type.type.name) ?? [],
      isDetailedInfoFetched: false
    };

    return pokemon;
  } catch (err) {
    console.error('Unable to get pokemon API data: ', err);
    throw err;
  }
}



export { getPokemonOverviewData };

