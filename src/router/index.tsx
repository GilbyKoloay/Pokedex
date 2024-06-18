import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { Name } from '../routes/[name]';
import { Index } from '../routes/index';



const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Index />} />
        <Route path='/:name' element={<Name />} />
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
};



export { Router };
