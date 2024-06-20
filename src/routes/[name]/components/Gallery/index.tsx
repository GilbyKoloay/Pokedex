import type { Pokemon } from '../../../../types/pokemon';

import { useState } from 'react';



type GalleryT = {
  imageList: Pokemon['imageList'];
  imageAlt: Pokemon['name'];
};



/**
 * Component that displays the image gallery of a pokemon.
 */
const Gallery: React.FC<GalleryT> = ({ imageList, imageAlt }) => {
  const [selectedImage, setSelectedImage] = useState<string>(imageList[0]);



  return (
    <div className='flex flex-col items-center gap-2'>
      <img
        className='p-2 md:p-4 bg-neutral-500 bg-opacity-20 rounded-md size-64 md:size-96'
        src={selectedImage}
        alt={`selected-${imageAlt}`}
      />

      <div className='flex gap-2'>
        {imageList.slice(0, 4).map((image, index) => (
          <button
            key={index}
            className='bg-neutral-500 hover:bg-neutral-500 rounded-md bg-opacity-20 hover:bg-opacity-40'
            onClick={() => setSelectedImage(image)}
          >
            <img
              className='p-1 md:p-2 size-16 md:size-24'
              src={image}
              alt={`${imageAlt}-gallery-${index+1}`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};



export { Gallery };

