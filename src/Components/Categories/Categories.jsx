import React from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchCategories = async () => {
  const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  return data;
};

const Categories = () => {
  
  const { data, error, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  });

  if (isLoading)
    return (
      <div className='min-h-96 flex  items-center justify-center my-24'>
        <i className="fas fa-spinner fa-spin fa-5x"></i>
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Helmet>
        <title>Categories</title>
      </Helmet>
      <div className="flex flex-wrap mt-1">
        {data?.data.map((category) => (
          <div
            key={category._id} 
            className="mx-auto mt-3 flex bg-gray-100 flex-col justify-between w-64 cursor-pointer transform overflow-hidden rounded-lg duration-300 hover:scale-105 hover:shadow-lg"
          >
            <img
              className="w-full  object-cover object-center"
              src={category.image}
              alt={category.name}
            />
            <div className="p-4">
              <h3 className="text-center font-semibold  text-gray-900 dark:text-white">
                {category.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
