import { AppContextProvider } from './contexts/AppContext';
import { Router } from './router';



const App = () => {
  return (
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  );
};



export { App };

