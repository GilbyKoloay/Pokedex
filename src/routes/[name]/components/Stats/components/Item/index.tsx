type ItemT = {
  value: number;
  label: string;
  borderColor: string;
  bgColor: string;
};



const Item: React.FC<ItemT> = ({ value, label, borderColor, bgColor }) => {
  return (
    <div className='flex-1 flex flex-col items-center'>
      <div className={`border-4 rounded-full ${borderColor} ${bgColor} text-center size-10 flex items-center justify-center`}>
        <p>{value}</p>
      </div>
      <p className='text-sm md:text-base text-center font-bold line-clamp-2'>{label}</p>
    </div>
  );
};



export { Item };

