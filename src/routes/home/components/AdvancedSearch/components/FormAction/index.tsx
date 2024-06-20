import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';




type FormActionT = {
  isFormLoading: boolean;
};


/**
 * Component that controls the 'AdvancedSearch' component form.
 * 
 * Provides two buttons that will reset the form or submit the form.
 */
const FormAction: React.FC<FormActionT> = ({ isFormLoading }) => {
  return (
    <div className='font-bold flex gap-2 lg:justify-end'>
      <button
        className='flex-1 lg:flex-grow-0 flex justify-center items-center py-2 px-4 rounded-md bg-neutral-800 hover:bg-neutral-900'
        type='reset'
        disabled={isFormLoading}
      >
        <h3>Reset</h3>
      </button>

      <button
        className='flex-1 lg:flex-grow-0 flex justify-center items-center py-2 px-4 gap-1 rounded-md bg-orange-600 hover:bg-orange-800'
        type='submit'
        disabled={isFormLoading}
      >
        <MagnifyingGlassIcon className='size-8' />
        <h3>{isFormLoading ? 'Submitting ...' : 'Submit'}</h3>
      </button>
    </div>
  );
};



export { FormAction };

