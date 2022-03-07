import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { IProduct } from './product.types';

export const productApi = createApi({
  reducerPath: 'api/products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
  endpoints: (build) => ({
    getProducts: build.query<IProduct[], number>({
      query: (limit = 5) => `dress?_limit=${limit}`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;
