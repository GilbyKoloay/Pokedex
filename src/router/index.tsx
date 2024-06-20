import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Name } from '../routes/[name]';
import { Home } from '../routes/home';


/**
 * Router component for handling navigation using React Router.
 */
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:nameOrNationalNumber' element={<Name />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};



export { Router };

