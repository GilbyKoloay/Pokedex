import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { notFoundDuck } from '../../../../assets/images';



/**
 * Component that will be shown if the pokemon does not exist.
 * Will route the user to home page.
 */
const NotFound = () => {
  const navigate = useNavigate();



  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2500);
  }, []);



  return (
    <div className='h-full flex items-center justify-center'>
      <div className='p-8 md:p-16 bg-white rounded-md flex flex-col items-center justify-center text-center gap-2 md:gap-8'>
        <img
          className='size-48 md:size-64'
          src={notFoundDuck}
          alt='not-found-duck'
        />
        <h1 className='font-bold'>Not Found</h1>
        <p>Redirecting you to the home page ...</p>
      </div>
    </div>
  );
};



export { NotFound };

