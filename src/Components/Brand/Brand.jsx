import React from 'react'
import {Helmet} from "react-helmet";
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchBrands = async () => {
  const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  return data;
};

const Brand = () => {
  const { data, error,  isLoading} = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrands,
  });
  if (isLoading) return  <div className='min-h-96 flex items-center justify-center my-24'>
  <i className="fas fa-spinner fa-spin fa-5x"></i>
</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="flex flex-wrap ">
      {data.data.map((brand) => (
<div class="mx-auto mt-11 w-44 cursor-pointer transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
  <img class=" w-full object-cover object-center"  key={brand._id} src={brand.image} alt="brand Image" />
  <div class="p-4">
     </div>
</div>
        ))}
    </div>
    </div>
  );
};

export default Brand;
