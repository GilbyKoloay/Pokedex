/** @type {import('tailwindcss').Config} */



/**
 * Colors that will be used in the 'type & weakness'
 */
const twColors = {
  'bug': '#729F3F',
  'dragon-1': '#53A4CF',
  'dragon-2': '#F16E57',
  'fairy': '#FDB9E9',
  'fire': '#FD7D24',
  'ghost': '#7B62A3',
  'ground-1': '#F7DE3F',
  'ground-2': '#AB9842',
  'normal': '#A4ACAF',
  'psychic': '#F366B9',
  'steel': '#9EB7B8',
  'dark': '#707070',
  'electric': '#EED535',
  'fighting': '#D56723',
  'flying-1': '#3DC7EF',
  'flying-2': '#BDB9B8',
  'grass': '#9BCC50',
  'ice': '#51C4E7',
  'poison': '#B97FC9',
  'rock': '#A38C21',
  'water': '#4592C4'
};



module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        tw: twColors
      }
    },
  },
  plugins: [],
}
