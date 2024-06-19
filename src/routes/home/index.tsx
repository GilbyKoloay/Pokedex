import { AdvancedSearch } from './components/AdvancedSearch';
import { Filter } from './components/Filter';
import { List } from './components/List';
import { Search } from './components/Search';



/**
 * Homepage. Displays the pokemon search query, filters, and all pokemon list.
 */
const Home = () => {
  return (
    <main id='home'>
      <h1>Pokédex</h1>
      <Search />
      <AdvancedSearch />
      <Filter />
      <List />
    </main>
  );
};



export { Home };

