import { Search } from './components/Search';
import { AdvancedSearch } from './components/AdvancedSearch';
import { Filter } from './components/Filter';
import { List } from './components/List';



/**
 * Homepage. Displays the pokemon search query, filters, and all pokemon list.
 */
const Home = () => {
  return (
    <main id='home'>
      <h1 className='text-xl md:text-2xl lg:text-3xl xl:text-4xl'>Pokédex</h1>
      <Search />
      <AdvancedSearch />
      <Filter />
      <List />
    </main>
  );
};



export { Home };

